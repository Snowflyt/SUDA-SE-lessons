import nlp from 'compromise';
import * as R from 'ramda';

import { lemmatize } from './indexer.js';
import { createBitmap } from './utils/bitmap.js';
import { SparseDataFrame, createSparseDataFrame } from './utils/dataframe.js';

import type { SimplifiedIndexMap } from './types/common';

/**
 * Get all document IDs from the document ID map.
 * @param indexMap The document ID map, where the key is the term
 * and the value is a map where the key is the document ID
 * and the value is the list of indexes (start by 0) of the term in the sentence.
 * @returns
 */
const getAllDocIDs = (indexMap: SimplifiedIndexMap): number[] => {
  // Get the maximum document ID.
  // `Math.max` is not used as it can cause Maximum call stack size exceeded
  // when the number of sentences is too large.
  const elements = [...indexMap.values()]
    .map((m) => [...m.keys()])
    .flat()
    .map(Number);
  let maxElement = 0;
  for (const element of elements) {
    if (element > maxElement) {
      maxElement = element;
    }
  }

  const bitmap = createBitmap(maxElement);

  for (const docIDs of [...indexMap.values()].map((m) => [...m.keys()])) {
    for (const docID of docIDs.map(Number)) {
      bitmap.set(docID);
    }
  }

  return R.range(0, maxElement + 1).filter((docID) => bitmap.isSet(docID));
};

/**
 * Generate a TF-IDF vector matrix from the document ID map.
 * @param indexMap The document ID map, where the key is the term
 * and the value is a map where the key is the document ID
 * and the value is the list of indexes (start by 0) of the term in the sentence.
 * @returns
 */
export const generateTFIDFVectorMatrix = (indexMap: SimplifiedIndexMap) => {
  const docIDs = getAllDocIDs(indexMap);
  const words = [...indexMap.keys()];

  const df = createSparseDataFrame<number>({
    shape: [words.length, docIDs.length],
    columnNames: docIDs.map(String),
    rowNames: words,
  });

  const docTotal = docIDs.length;
  for (const docID of docIDs) {
    for (const word of words) {
      const docID2wordCount = indexMap.get(word)!;
      const wordCount = docID2wordCount.get(docID);

      if (!wordCount) continue;

      const tf = 1 + Math.log(wordCount) / Math.log(10);

      const docCount = docID2wordCount.size;
      const idf = Math.log(docTotal / docCount) / Math.log(10);

      df.col[docID.toString()]!.at[word] = tf * idf;
    }

    if (docID % 300 === 0) {
      console.log(`TF-IDF Generated ${docID} / ${docTotal}`);
    }
  }

  return df;
};

export const calculateSimilaritiesOf = (document: string) => ({
  on: (
    indexMap: SimplifiedIndexMap,
    df: SparseDataFrame<number>,
  ): Array<[number, number]> => {
    const words = (
      nlp(document)
        .terms()
        .not('#Value')
        .json()
        .map(
          (t: { terms: Array<{ normal: string }> }) => t.terms[0].normal,
        ) as string[]
    )
      .filter((w) => /^[a-z]+$/.test(w))
      .map(lemmatize);
    const wordMap = new Map<string, number>();
    for (const word of words) {
      if (!wordMap.has(word)) wordMap.set(word, 0);
      wordMap.set(word, wordMap.get(word)! + 1);
    }

    const searchVec = df.rowNames.reduce((acc, word, index) => {
      const wordCount = wordMap.get(word);

      if (!wordCount) return acc;

      const tf = 1 + Math.log(wordCount) / Math.log(10);

      const docCount = indexMap.get(word)!.size;
      const idf = Math.log(df.columnNames.length / docCount) / Math.log(10);

      acc[index] = tf * idf;
      return acc;
    }, {} as Record<number, number>);

    const searchVecLen = Math.sqrt(
      Object.values(searchVec).reduce((acc, value) => acc + value ** 2, 0),
    );

    return df.columnNames
      .map((docID) => {
        const vec = df.col[docID]!;

        const vecLen = Math.sqrt(
          vec.accumulate((acc, value) => acc + value ** 2, 0),
        );

        const dotProd = Object.entries(searchVec).reduce(
          (acc, [index, value]) => acc + value * (vec.iat[Number(index)] ?? 0),
          0,
        );

        return [Number(docID), dotProd / (searchVecLen * vecLen)] as [
          number,
          number,
        ];
      })
      .filter(([, similarity]) => similarity > 0)
      .sort((a, b) => b[1] - a[1]);
  },
});
