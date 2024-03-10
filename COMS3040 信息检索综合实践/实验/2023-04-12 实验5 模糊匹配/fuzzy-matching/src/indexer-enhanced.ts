import fs from 'node:fs/promises';

import * as R from 'ramda';

import type { EnhancedIndexMap } from './types/common';

/**
 * Save the index to a file.
 * @param indexMap The index map.
 * @returns
 *
 * @example
 * ```typescript
 * await saveIndex(new Map([
 *   ['中', { 1: [0, 14], 3: [15, 23] }],
 *   ['国', { 2: [1, 7], 3: [6, 9], 4: [15, 18] }],
 * ])).toFile('index.txt');
 * ```
 */
const saveEnhancedIndex = (indexMap: EnhancedIndexMap) => ({
  toFile: async (indexFilePath: string) => {
    await fs.writeFile(
      indexFilePath,
      R.sortBy(R.prop(0), Array.from(indexMap.entries()))
        .map(
          ([word, occurrence]) =>
            `${word}\t${Object.keys(occurrence).length}\t${Object.entries(
              occurrence,
            )
              .flatMap(
                ([sentenceID, positions]) => `${sentenceID}:${positions}`,
              )
              .join(' ')}`,
        )
        .join('\n'),
      'utf-8',
    );
  },
});

/**
 * Generate the index from corpus file and save it to another file.
 * @param corpusPathname The path to the corpus file.
 * @param indexPathname The path to the index file.
 * @returns The index map.
 */
export const generateEnhancedIndexByCharacter = async (
  corpusPathname: string,
  indexPathname: string,
): Promise<EnhancedIndexMap> => {
  const lines = (await fs.readFile(corpusPathname, 'utf-8')).split('\n');

  const indexMap = new Map<string, Record<number, number[]>>();

  for (const [index, line] of lines.entries()) {
    const sentenceID = index + 1;
    const characters = line
      .split('')
      // Keep only Chinese words
      .filter((word) => /^[\u4e00-\u9fa5]+$/u.test(word));

    for (const [position, character] of characters.entries()) {
      if (!indexMap.has(character)) indexMap.set(character, {});
      if (!(indexMap.get(character) as Record<number, number[]>)[sentenceID])
        (indexMap.get(character) as Record<number, number[]>)[sentenceID] = [];
      (indexMap.get(character) as Record<number, number[]>)[sentenceID].push(
        position,
      );
    }
  }

  // Write to file
  await saveEnhancedIndex(indexMap).toFile(indexPathname);

  return indexMap;
};

/**
 * Read the index from a file.
 * @param pathname The path to the index file.
 * @returns The index map.
 */
export const readEnhancedIndex = async (
  pathname: string,
): Promise<EnhancedIndexMap> =>
  (await fs.readFile(pathname, 'utf-8'))
    .split('\n')
    .map((line) => line.split('\t'))
    .map(
      ([word, , sentenceIDAndPositions]) =>
        [
          word,
          Object.fromEntries(
            sentenceIDAndPositions.split(' ').map((sentenceIDAndPosition) => {
              const [sentenceID, positions] = sentenceIDAndPosition.split(
                ':',
                2,
              );
              return [sentenceID, positions.split(',').map(Number)];
            }),
          ),
        ] as const,
    )
    .reduce((acc, [word, sentenceIDAndPositions]) => {
      acc.set(word, sentenceIDAndPositions);
      return acc;
    }, new Map());
