import fs from 'node:fs/promises';
import path from 'node:path';

import nlp from 'compromise';
import * as R from 'ramda';
import { removeStopwords } from 'stopword';

import { createBitmap } from './utils/bitmap.js';

import type { IndexMap } from './types/common';
import type { Bitmap } from './utils/bitmap';

/**
 * Get the document ID from the filename.
 * @param filename
 * @returns
 */
const getDocID = (filename: string): number =>
  Number(filename.replace(/d(\d+)\.txt$/, '$1'));

/**
 * Normalize the text (remove unnecessary spaces, etc.)
 * @param content The text to normalize.
 * @returns
 */
const normalize = (content: string): string =>
  content
    // Remove unnecessary spaces before punctuations
    .replace(/\s+([,.%:;])\s+/g, '$1 ')
    // Remove unnecessary spaces after some punctuations
    .replace(/\s+(\$)\s+/g, ' $1')
    // Remove unnecessary spaces before and after certain punctuations
    .replace(/\s+(')/g, '$1')
    .replace(/\s(')\s+/g, '$1 ')
    // Remove the unnecessary spaces before the last '.' in the text
    .replace(/\s+\.$/g, '.');

/**
 * Lemmatize a term (verb -> infinitive, noun -> singular).
 * @param term The term to lemmatize.
 * @returns
 */
const lemmatize = (term: string): string => {
  const t = nlp(term);
  if (t.has('#Verb')) {
    return t.verbs().toInfinitive().out('text');
  }
  if (t.has('#Noun')) {
    return t.nouns().toSingular().out('text');
  }
  return term;
};

/**
 * Save the index to a file.
 * @param indexMap The index map.
 * @returns
 *
 * @example
 * ```typescript
 * await saveIndex(new Map([
 *   ['john', [1, 3]],
 *   ['james', [2, 3, 4]],
 *   ['mary', [2, 5]],
 * ])).toFile('index.txt');
 * ```
 */
const saveIndex = (indexMap: IndexMap) => ({
  toFile: async (indexFilePath: string) => {
    await fs.writeFile(
      indexFilePath,
      R.sortBy(R.prop(0), Array.from(indexMap.entries()))
        .map(
          ([word, occurrence]) =>
            `${word}\t${occurrence.length}\t${occurrence.join(' ')}`,
        )
        .join('\n'),
      'utf-8',
    );
  },
});

/**
 * Get lemmatized words from a text.
 */
export const getLemmatizedWords = (
  text: string,
  {
    includeStopwords = false,
  }: {
    includeStopwords?: boolean;
  } = {},
): string[] => {
  const doc = nlp(normalize(text));

  // Lemmatization
  const result = doc
    .terms()
    .not('#Value')
    .json()
    .map((t: { terms: Array<{ normal: string }> }) => t.terms[0].normal)
    .map(lemmatize)
    .filter((w: string) => /\w/.test(w));

  return includeStopwords ? result : removeStopwords(result);
};

/**
 * Generate the index from the data directory and save it to a file.
 * @param dataDir The data directory.
 * @param pathname The path to the index file.
 * @returns The index map.
 */
export const generateIndex = async (
  dataDir: string,
  pathname: string,
  { includeStopwords = false }: { includeStopwords?: boolean } = {},
): Promise<IndexMap> => {
  const maxDocID = (await fs.readdir(dataDir)).reduce(
    (maxDocID, filename) => Math.max(maxDocID, getDocID(filename)),
    0,
  );

  const wordOccurs = new Map<string, Bitmap>();

  for (const filename of await fs.readdir(dataDir)) {
    const docID = getDocID(filename);
    const content = await fs.readFile(path.join(dataDir, filename), 'utf-8');

    const words = getLemmatizedWords(content, { includeStopwords });

    for (const word of words) {
      if (!wordOccurs.has(word)) {
        wordOccurs.set(word, createBitmap(maxDocID));
      }
      (wordOccurs.get(word) as Bitmap).set(docID);
    }
  }

  // Transform to a map of word -> [docIDs]
  const indexMap = new Map(
    Array.from(wordOccurs.entries()).map(([word, bitmap]) => [
      word,
      R.range(0, maxDocID + 1).filter((docID) => bitmap.isSet(docID)),
    ]),
  );

  // Write to file
  await saveIndex(indexMap).toFile(pathname);

  return indexMap;
};

/**
 * Read the index from a file.
 * @param pathname The path to the index file.
 * @returns The index map.
 */
export const readIndex = async (pathname: string): Promise<IndexMap> =>
  (await fs.readFile(pathname, 'utf-8'))
    .split('\n')
    .map((line) => line.split('\t'))
    .map(([word, , docIDs]) => [word, docIDs.split(' ').map(Number)] as const)
    .reduce((acc, [word, docIDs]) => {
      acc.set(word, docIDs);
      return acc;
    }, new Map());
