import * as R from 'ramda';

import { createBitmap } from './utils/bitmap.js';
import { createSparseDataFrame } from './utils/dataframe.js';

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
