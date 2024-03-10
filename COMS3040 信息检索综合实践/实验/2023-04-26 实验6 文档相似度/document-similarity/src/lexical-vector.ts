import fs from 'node:fs';
import path from 'node:path';

import * as R from 'ramda';

import { getLemmatizedWords } from './indexer.js';
import { DATA_DIR } from './main.js';
import { createBitmap } from './utils/bitmap.js';
import { createDataFrame } from './utils/dataframe.js';

import type { IndexMap } from './types/common';

/**
 * Get all document IDs from the document ID map.
 * @param indexMap The document ID map, where the key is the term and the value is the list of document IDs.
 * @returns
 */
const getAllDocIDs = (indexMap: IndexMap): number[] => {
  const maxElement = Math.max(...[...indexMap.values()].flat());
  const bitmap = createBitmap(maxElement);

  for (const docIDs of indexMap.values()) {
    for (const docID of docIDs) {
      bitmap.set(docID);
    }
  }

  return R.range(0, maxElement + 1).filter((sentenceID) =>
    bitmap.isSet(sentenceID),
  );
};

/**
 * Convert the document ID map to a data frame.
 * @param indexMap The document ID map, where the key is the term and the value is the list of document IDs.
 * @returns
 */
const indexMap2dataFrame = (indexMap: IndexMap) => {
  const allDocIDs = getAllDocIDs(indexMap);

  const matrix: number[][] = new Array(indexMap.size)
    .fill(0)
    .map(() => new Array(allDocIDs.length).fill(0));

  return createDataFrame(matrix, {
    columns: allDocIDs.map(String),
    rows: [...indexMap.keys()],
  });
};

export const generateBinaryLexicalVectorMatrix = (indexMap: IndexMap) => {
  const df = indexMap2dataFrame(indexMap);

  for (const [word, docIDs] of indexMap) {
    for (const docID of docIDs) {
      df.set(word, String(docID), 1);
    }
  }

  return df;
};

export const generateLogarithmicWordFrequencyVectorMatrix = (
  indexMap: IndexMap,
  { includeStopwords = false }: { includeStopwords?: boolean } = {},
) => {
  const df = indexMap2dataFrame(indexMap);

  for (const docID of df.columns) {
    const filename = `d${docID}.txt`;
    const content = fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8');
    const words = getLemmatizedWords(content, { includeStopwords });

    for (const word of df.rows) {
      const wordCount = words.filter((w) => w === word).length;
      df.set(
        word,
        docID,
        wordCount === 0 ? 0 : 1 + Math.log(wordCount) / Math.log(10),
      );
    }
  }

  return df;
};

export const generateTFIDFVectorMatrix = (indexMap: IndexMap) => {
  const df = generateLogarithmicWordFrequencyVectorMatrix(indexMap, {
    includeStopwords: true,
  });

  for (const word of df.rows) {
    const docCount = indexMap.get(word)?.length ?? 0;
    const idf = Math.log(df.columns.length / docCount) / Math.log(10);

    for (const docID of df.columns) {
      const tf = df.get(word, docID);
      df.set(word, docID, tf * idf);
    }
  }

  return df;
};

export const calculateCosineSimilarity = (
  vector1: number[],
  vector2: number[],
) => {
  const len1 = Math.sqrt(vector1.reduce((sum, v) => sum + v ** 2, 0));
  const len2 = Math.sqrt(vector2.reduce((sum, v) => sum + v ** 2, 0));
  const dotProduct = vector1.reduce((sum, v1, i) => sum + v1 * vector2[i], 0);
  return dotProduct / (len1 * len2);
};
