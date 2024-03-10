import fs from 'node:fs/promises';

import nlp from 'compromise';
import * as R from 'ramda';

import type { IndexMap, SimplifiedIndexMap } from './types/common';
import type { Object as O } from 'ts-toolbelt';

/**
 * Lemmatize a term (verb -> infinitive, noun -> singular).
 * @param term The term to lemmatize.
 * @returns The lemmatized term.
 */
export const lemmatize = (term: string): string => {
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
 *   ['james', { 1: [0, 14], 3: [15, 33] }],
 *   ['john', { 2: [1, 17], 3: [36, 49], 4: [15, 28] }],
 * ])).toFile('index.txt');
 * ```
 */
export const saveIndex = (indexMap: IndexMap) => ({
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
 * The options for generating the index.
 *
 * @see {@link generateIndex}
 */
export interface GenerateIndexOptions {
  logging?: boolean;
  lemmatize?: boolean;
}

/**
 * Generate the index from corpus.
 * @param corpus The corpus.
 * @returns The index map.
 */
export const generateIndex = async (
  documents: string[],
  { lemmatize: doesLemmatize = true }: GenerateIndexOptions = {},
): Promise<IndexMap> => {
  const indexMap = new Map<string, Record<number, number[]>>();

  for (const [index, document] of documents.entries()) {
    const docID = index + 1;

    const words = (
      nlp(document)
        .terms()
        .not('#Value')
        .json()
        .map(
          (t: { terms: Array<{ normal: string }> }) => t.terms[0].normal,
        ) as string[]
    )
      .map(doesLemmatize ? lemmatize : R.identity)
      .filter((w) => /^[a-z-]+$/.test(w));

    for (const [position, word] of words.entries()) {
      if (!indexMap.has(word)) indexMap.set(word, {});
      if (!indexMap.get(word)![docID]) indexMap.get(word)![docID] = [];
      indexMap.get(word)![docID].push(position);
    }
  }

  return indexMap;
};

/**
 * Transform the index map to a simplified index map.
 * @param indexMap The index map.
 * @returns The simplified index map.
 */
export const transformIndexMap = (indexMap: IndexMap): SimplifiedIndexMap =>
  new Map(
    [...indexMap.entries()].map(([word, value]) => [
      word,
      Object.entries(value).reduce((acc, [sentenceID, positions]) => {
        acc.set(Number.parseInt(sentenceID), positions.length);
        return acc;
      }, new Map<number, number>()),
    ]),
  );

/**
 * The options for loading the index.
 *
 * @see {@link loadIndex}
 */
export interface LoadIndexOptions {
  simplified?: boolean;
}

/**
 * Load the index from a file.
 *
 * If `simplified` is `true`, the index map will be transformed to a simplified
 * index map by {@link transformIndexMap}.
 * @param pathname The path to the index file.
 * @param options The options.
 * @returns The index map.
 */
export async function loadIndex(
  pathname: string,
  options?: O.Assign<
    Omit<LoadIndexOptions, 'simplified'>,
    [{ simplified?: false }]
  >,
): Promise<IndexMap>;
export async function loadIndex(
  pathname: string,
  options: O.Assign<
    Omit<LoadIndexOptions, 'simplified'>,
    [{ simplified: true }]
  >,
): Promise<SimplifiedIndexMap>;
export async function loadIndex(
  pathname: string,
  { simplified = false }: LoadIndexOptions = {},
): Promise<IndexMap | SimplifiedIndexMap> {
  const content = await fs.readFile(pathname, 'utf-8');
  const lines = content.split('\n');

  const indexMap = lines
    .map((line) => line.split('\t'))
    .map(
      ([word, , docIDAndPositions]) =>
        [
          word,
          Object.fromEntries(
            docIDAndPositions.split(' ').map((docIDAndPositions) => {
              const [docID, positions] = docIDAndPositions.split(':', 2);
              return [docID, positions.split(',').map(Number)];
            }),
          ),
        ] as const,
    )
    .reduce((acc, [word, docIDAndPositions]) => {
      acc.set(word, docIDAndPositions);
      return acc;
    }, new Map());

  return simplified ? transformIndexMap(indexMap) : indexMap;
}
