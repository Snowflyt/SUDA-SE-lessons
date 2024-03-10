import { generateIndex, readIndex } from './indexer.js';
import {
  calculateCosineSimilarity,
  generateBinaryLexicalVectorMatrix,
  generateLogarithmicWordFrequencyVectorMatrix,
  generateTFIDFVectorMatrix,
} from './lexical-vector.js';
import { createDataFrame } from './utils/dataframe.js';
import { fileExists } from './utils/file.js';
import { logged } from './utils/log.js';

import type { DataFrame } from './utils/dataframe';

export const DATA_DIR = './data';
export const INDEX_PATHNAME = './dict.index';
export const INDEX_PATHNAME_WITH_STOPWORDS = './dict.index.with-stopwords';

const BINARY_MATRIX_PATHNAME = './output/binary.csv';
const LOGTF_MATRIX_PATHNAME = './output/logtf.csv';
const TFIDF_MATRIX_PATHNAME = './output/tfidf.csv';
const BINARY_SIMILARITY_MATRIX_PATHNAME = './output/binary-similarity.csv';
const LOGTF_SIMILARITY_MATRIX_PATHNAME = './output/logtf-similarity.csv';
const TFIDF_SIMILARITY_MATRIX_PATHNAME = './output/tfidf-similarity.csv';

const loggedReadIndex = logged('Index read', readIndex);
const loggedGenerateIndex = logged('Index generated', generateIndex);

const calculateCosineSimilarityMatrix = (df: DataFrame<number>) => {
  const matrix = new Array(df.columns.length).fill(
    new Array(df.columns.length).fill(0),
  );

  const result = createDataFrame(matrix, {
    columns: df.columns,
    rows: df.columns,
  });

  for (const docID1 of df.columns) {
    for (const docID2 of df.columns) {
      result.set(
        docID1,
        docID2,
        calculateCosineSimilarity(df.getColumn(docID1), df.getColumn(docID2)),
      );
    }
  }

  return result as DataFrame<number>;
};

const displayBestMatches = (df: DataFrame<number>) => {
  const bestMatches = new Map<string, string>();
  for (const docID of df.rows) {
    const bestMatch = df
      .getColumn(docID)
      .map((value, index) => [value, index])
      .sort(([value1], [value2]) => value2 - value1)[1][1];
    bestMatches.set(docID, df.columns[bestMatch]);
  }

  for (const [docID, bestMatch] of bestMatches) {
    console.log(`Best match for ${docID} is ${bestMatch}`);
  }
};

const main = async () => {
  const indexMap = (await fileExists(INDEX_PATHNAME))
    ? await loggedReadIndex(INDEX_PATHNAME)
    : await loggedGenerateIndex(DATA_DIR, INDEX_PATHNAME);

  const indexMapWithStopwords = (await fileExists(
    INDEX_PATHNAME_WITH_STOPWORDS,
  ))
    ? await loggedReadIndex(INDEX_PATHNAME_WITH_STOPWORDS)
    : await loggedGenerateIndex(DATA_DIR, INDEX_PATHNAME_WITH_STOPWORDS, {
        includeStopwords: true,
      });

  /* Generate matrices */
  const binaryMatrix = generateBinaryLexicalVectorMatrix(indexMap);
  if (!(await fileExists(BINARY_MATRIX_PATHNAME)))
    await binaryMatrix.saveToFile(BINARY_MATRIX_PATHNAME);
  console.log('Binary Matrix (without stopwords):');
  console.log(binaryMatrix.toString({ limit: 10 }));
  console.log();

  const logtfMatrix = generateLogarithmicWordFrequencyVectorMatrix(indexMap);
  if (!(await fileExists(LOGTF_MATRIX_PATHNAME)))
    await logtfMatrix.saveToFile(LOGTF_MATRIX_PATHNAME);
  console.log('LogTF Matrix (without stopwords):');
  console.log(logtfMatrix.toString({ limit: 10 }));
  console.log();

  const tfidfMatrix = generateTFIDFVectorMatrix(indexMapWithStopwords);
  if (!(await fileExists(TFIDF_MATRIX_PATHNAME)))
    await tfidfMatrix.saveToFile(TFIDF_MATRIX_PATHNAME);
  console.log('TF-IDF Matrix (with stopwords):');
  console.log(tfidfMatrix.toString({ limit: 10 }));
  console.log();

  /* Calculate cosine similarity */
  const binaryCosineSimilarity = calculateCosineSimilarityMatrix(binaryMatrix);
  if (!(await fileExists(BINARY_SIMILARITY_MATRIX_PATHNAME)))
    await binaryCosineSimilarity.saveToFile(BINARY_SIMILARITY_MATRIX_PATHNAME);
  console.log('Binary Cosine Similarity Matrix:');
  console.log(binaryCosineSimilarity.toString());
  displayBestMatches(binaryCosineSimilarity);
  console.log();

  const logtfCosineSimilarity = calculateCosineSimilarityMatrix(logtfMatrix);
  if (!(await fileExists(LOGTF_SIMILARITY_MATRIX_PATHNAME)))
    await logtfCosineSimilarity.saveToFile(LOGTF_SIMILARITY_MATRIX_PATHNAME);
  console.log('LogTF Cosine Similarity Matrix:');
  console.log(logtfCosineSimilarity.toString());
  displayBestMatches(logtfCosineSimilarity);
  console.log();

  const tfidfCosineSimilarity = calculateCosineSimilarityMatrix(tfidfMatrix);
  if (!(await fileExists(TFIDF_SIMILARITY_MATRIX_PATHNAME)))
    await tfidfCosineSimilarity.saveToFile(TFIDF_SIMILARITY_MATRIX_PATHNAME);
  console.log('TF-IDF Cosine Similarity Matrix:');
  console.log(tfidfCosineSimilarity.toString());
  displayBestMatches(tfidfCosineSimilarity);
  console.log();
};

await main();
