import fs from 'node:fs/promises';

import {
  generateIndex,
  lemmatize,
  loadIndex,
  saveIndex,
  transformIndexMap,
} from './indexer.js';
import { generateTFIDFVectorMatrix } from './lexical-vector.js';
import { loadSparseDataFrame } from './utils/dataframe.js';
import { fileExists } from './utils/file.js';
import { logged } from './utils/log.js';

import type { SparseDataFrame } from './utils/dataframe.js';

const CORPUS_PATHNAME = './data/en(utf8).txt';
const INDEX_PATHNAME = './dict.index';
const TFIDF_MATRIX_PATHNAME = './output/tfidf-matrix.csv';

const loggedReadCorpus = logged({
  message: 'Corpus read',
  fn: fs.readFile,
});
const loggedLoadIndex = logged({
  message: 'Index loaded',
  fn: loadIndex,
});
const loggedGenerateIndex = logged({
  message: 'Index generated',
  fn: generateIndex,
});
const loggedSaveIndex = logged({
  message: 'Index saved',
  fn: saveIndex,
  depth: 1,
});
const loggedTransformIndexMap = logged({
  message: 'Index map transformed',
  fn: transformIndexMap,
});
const loggedLoadTFIDFVectorMatrix = logged({
  message: 'TF-IDF matrix loaded',
  fn: loadSparseDataFrame<number>,
});
const loggedGenerateTFIDFVectorMatrix = logged({
  message: 'TF-IDF vector matrix generated',
  fn: generateTFIDFVectorMatrix,
});
const loggedSaveTFIDFVectorMatrix = logged({
  message: 'TF-IDF vector matrix saved',
  fn: (df: SparseDataFrame<number>) => ({
    toFile: (async (pathname) =>
      await df.saveToFile(pathname)) as (typeof df)['saveToFile'],
  }),
  depth: 1,
});
const loggedReadDocuments = logged({
  message: 'Documents read',
  fn: async (pathname: string) => {
    const content = await fs.readFile(pathname, 'utf-8');
    return content.split('\n');
  },
});

const main = async () => {
  const indexMap = (await fileExists(INDEX_PATHNAME))
    ? await loggedLoadIndex(INDEX_PATHNAME, { simplified: true })
    : await (async () => {
        const corpus = await loggedReadCorpus(CORPUS_PATHNAME, 'utf-8');
        const documents = corpus.split('\n');
        const indexMap = await loggedGenerateIndex(documents);
        await loggedSaveIndex(indexMap).toFile(INDEX_PATHNAME);
        return loggedTransformIndexMap(indexMap);
      })();

  const df = (await fileExists(TFIDF_MATRIX_PATHNAME))
    ? await loggedLoadTFIDFVectorMatrix(TFIDF_MATRIX_PATHNAME)
    : await (async () => {
        const df = loggedGenerateTFIDFVectorMatrix(indexMap);
        await loggedSaveTFIDFVectorMatrix(df).toFile(TFIDF_MATRIX_PATHNAME);
        return df;
      })();

  console.log('\nTF-IDF vector matrix:');
  df.showHead();
  console.log();

  const calculateSimilarities = (document: string): Array<[number, number]> => {
    const words = document
      .split(' ')
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

    return df.columnNames.map((docID) => {
      const vec = df.col[docID]!;

      const vecLen = Math.sqrt(
        vec.accumulate((acc, value) => acc + value ** 2, 0),
      );

      const dotProd = Object.entries(searchVec).reduce(
        (acc, [index, value]) => acc + value * (vec.iat[Number(index)] ?? 0),
        0,
      );

      return [Number(docID), dotProd / (searchVecLen * vecLen)];
    });
  };

  const documents = await loggedReadDocuments(CORPUS_PATHNAME);

  process.stdout.write('\nEnter a sentence to search: ');
  process.stdin.on('data', async (data) => {
    const similarities = logged({
      message: ({ __callStack: [[, [input]]] }) => `Queried "${input}"`,
      fn: calculateSimilarities,
    })(data.toString().trim());
    const similaritiesToShow = similarities
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    similaritiesToShow.forEach(([docID, score], index) => {
      console.log(
        `${index + 1}. Similarity: ${score}\n` +
          `   Document ID: ${docID}\n` +
          `   Document: ${documents[docID - 1]}`,
      );
    });

    process.stdout.write('\nEnter a sentence to search: ');
  });
};

await main();
