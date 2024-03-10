import fs from 'node:fs/promises';

import * as jieba from '@node-rs/jieba';
import * as R from 'ramda';

import { createBitmap } from './utils/bitmap.js';

import type { IndexMap } from './types/common';
import type { Bitmap } from './utils/bitmap';

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
 * The strategy to generate the index.
 * @default IndexStrategy.BY_WORD
 */
export enum IndexStrategy {
  BY_WORD,
  BY_CHARACTER,
}

/**
 * Generate the index from corpus file and save it to another file.
 * @param corpusPathname The path to the corpus file.
 * @param targetPathname The path to the corpus file that is already segmented.
 * @param indexPathname The path to the index file.
 * @param indexStrategy The index strategy.
 * @returns The index map.
 */
export const generateIndex = async (
  corpusPathname: string,
  targetPathname: string,
  indexPathname: string,
  indexStrategy: IndexStrategy = IndexStrategy.BY_WORD,
): Promise<IndexMap> => {
  const lines = (await fs.readFile(corpusPathname, 'utf-8')).split('\n');

  const wordOccurs = new Map<string, Bitmap>();
  let targetFileContent = '';

  for (const [index, line] of lines.entries()) {
    const sentenceID = index + 1;
    const words =
      indexStrategy === IndexStrategy.BY_CHARACTER
        ? line.split('')
        : jieba.cut(line);

    targetFileContent += `${words.join(' ')}\n`;

    // Keep only Chinese words
    for (const word of words.filter((word) =>
      /^[\u4e00-\u9fa5]+$/u.test(word),
    )) {
      if (!wordOccurs.has(word)) {
        wordOccurs.set(word, createBitmap(lines.length));
      }
      (wordOccurs.get(word) as Bitmap).set(sentenceID);
    }
  }

  // Transform to a map of word -> [sentenceIDs]
  const indexMap = new Map(
    Array.from(wordOccurs.entries()).map(([word, bitmap]) => [
      word,
      R.range(0, lines.length + 1).filter((sentenceID) =>
        bitmap.isSet(sentenceID),
      ),
    ]),
  );

  // Write to target file
  targetFileContent = targetFileContent.slice(0, -1); // Remove the last newline
  await fs.writeFile(targetPathname, targetFileContent, 'utf-8');

  // Write to file
  await saveIndex(indexMap).toFile(indexPathname);

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
    .map(
      ([word, , sentenceIDs]) =>
        [word, sentenceIDs.split(' ').map(Number)] as const,
    )
    .reduce((acc, [word, sentenceIDs]) => {
      acc.set(word, sentenceIDs);
      return acc;
    }, new Map());
