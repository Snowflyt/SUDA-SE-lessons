import * as fuzz from 'fuzzball';
import * as R from 'ramda';

import { ASTNode, lexer, parser } from './parser.js';
import { createBitmap } from './utils/bitmap.js';

import type { IndexMap } from './types/common';

/**
 * Get all sentence IDs from the sentence ID map.
 * @param indexMap The sentence ID map, where the key is the term and the value is the list of sentence IDs.
 * @returns
 */
const getAllSentenceIDs = (indexMap: IndexMap): number[] => {
  const maxElement = Math.max(...[...indexMap.values()].flat());
  const bitmap = createBitmap(maxElement);

  for (const sentenceIDs of indexMap.values()) {
    for (const sentenceID of sentenceIDs) {
      bitmap.set(sentenceID);
    }
  }

  return R.range(0, maxElement + 1).filter((sentenceID) =>
    bitmap.isSet(sentenceID),
  );
};

/**
 * The result of a fuzzy query.
 */
interface FuzzyQueryResult {
  sentenceID: number;
  scores: {
    total: number;
    [term: string]: number;
  };
}

/**
 * Calculate the score of a sentence with a specific term by the number of characters that match the term.
 * @param sentenceID
 * @param term
 * @returns
 */
const calculateScoreByCharacter = (sentenceID: number, term: string) => ({
  on: (indexMap: IndexMap): FuzzyQueryResult => {
    const characters = term.split('');

    const toScore = (count: number, total: number) => (count / total) * 100;

    const isContained = (character: string) =>
      indexMap.get(character)?.includes(sentenceID) ?? false;

    const score = toScore(
      characters.filter(isContained).length,
      characters.length,
    );

    return {
      sentenceID,
      scores: {
        total: score,
        [term]: score,
      },
    };
  },
});

type FuzzyTerm = [string, [number, number[]]];

const generateFuzzyTerms = (term: string) => ({
  on: (indexMap: IndexMap): FuzzyTerm[] =>
    fuzz
      .extract(term, [...indexMap.keys()])
      .map(([term, score]) => [term, [score, indexMap.get(term) ?? []]]),
});

/**
 * Calculate the score of a sentence with a specific term by the fuzzy score.
 * @param sentenceID
 * @param term
 * @returns
 */
const calculateScoreByFuzzy = (sentenceID: number, term: string) => ({
  on: (fuzzyTerms: FuzzyTerm[]): FuzzyQueryResult => {
    const score =
      fuzzyTerms.find(([, [, sentenceIDs]]) =>
        sentenceIDs.includes(sentenceID),
      )?.[1][0] ?? 0;

    return {
      sentenceID,
      scores: {
        total: score,
        [term]: score,
      },
    };
  },
});

/**
 * The strategy to merge the scores of two fuzzy query results.
 */
enum MergeScoreStrategy {
  AND,
  OR,
}

/**
 * Merge the scores of two fuzzy query results.
 * @param left The left fuzzy query result.
 * @param right The right fuzzy query result.
 * @param strategy The strategy to merge the scores.
 * @returns
 */
const mergeScores = (
  left: FuzzyQueryResult[],
  right: FuzzyQueryResult[],
  strategy: MergeScoreStrategy,
): FuzzyQueryResult[] => {
  const mergeScore = (
    left: FuzzyQueryResult,
    right: FuzzyQueryResult,
    strategy: MergeScoreStrategy,
  ) => ({
    sentenceID: left.sentenceID,
    scores: {
      ...left.scores,
      ...right.scores,
      total:
        strategy === MergeScoreStrategy.AND
          ? (left.scores.total + right.scores.total) / 2
          : Math.max(left.scores.total, right.scores.total),
    },
  });

  return left.map((leftResult) => {
    const rightResult = right.find(
      (r) => r.sentenceID === leftResult.sentenceID,
    );

    if (rightResult === undefined) return leftResult;

    return mergeScore(leftResult, rightResult, strategy);
  });
};

/**
 * Reverse the scores of the fuzzy query results.
 * @param results The fuzzy query results.
 * @returns
 */
const reverseScores = (results: FuzzyQueryResult[]): FuzzyQueryResult[] => {
  const reverseScore = (result: FuzzyQueryResult) => ({
    ...result,
    scores: {
      ...result.scores,
      total: 100 - result.scores.total,
    },
  });

  return results.map(reverseScore);
};

const evaluateAstFuzzy = (
  ast: ASTNode,
  indexMap: IndexMap,
  byCharacter: boolean,
  allSentenceIDs: number[] = getAllSentenceIDs(indexMap),
): FuzzyQueryResult[] => {
  switch (ast.type) {
    case 'Term': {
      const term = ast.value;

      if (byCharacter)
        return allSentenceIDs.map((sentenceID) =>
          calculateScoreByCharacter(sentenceID, term).on(indexMap),
        );

      const fuzzyTerms = generateFuzzyTerms(term).on(indexMap);
      return allSentenceIDs.map((sentenceID) =>
        calculateScoreByFuzzy(sentenceID, term).on(fuzzyTerms),
      );
    }

    case 'And': {
      const left = evaluateAstFuzzy(
        ast.left,
        indexMap,
        byCharacter,
        allSentenceIDs,
      );
      const right = evaluateAstFuzzy(
        ast.right,
        indexMap,
        byCharacter,
        allSentenceIDs,
      );

      return mergeScores(left, right, MergeScoreStrategy.AND);
    }

    case 'Or': {
      const left = evaluateAstFuzzy(
        ast.left,
        indexMap,
        byCharacter,
        allSentenceIDs,
      );
      const right = evaluateAstFuzzy(
        ast.right,
        indexMap,
        byCharacter,
        allSentenceIDs,
      );

      return mergeScores(left, right, MergeScoreStrategy.OR);
    }

    case 'Not': {
      const operand = evaluateAstFuzzy(
        ast.operand,
        indexMap,
        byCharacter,
        allSentenceIDs,
      );

      return reverseScores(operand);
    }
  }
};

/**
 * Options for fuzzy query.
 */
export interface FuzzyQueryOptions {
  limit?: number;
  threshold?: number;
  mode?: 'character' | 'term';
}

/**
 * Get the sentence IDs that match the fuzzy query.
 *
 * QUERY ::= TERM | QUERY AND QUERY | QUERY OR QUERY | NOT QUERY
 *
 * TERM ::= \w+
 *
 * AND ::= 'and'
 *
 * OR ::= 'or'
 *
 * NOT ::= 'not'
 *
 * @param input The query string.
 * @returns
 */
export const fuzzyQuery = (
  input: string,
  { limit, mode = 'term', threshold = 60 }: FuzzyQueryOptions = {},
) => ({
  on: (sentenceIDMap: IndexMap): FuzzyQueryResult[] =>
    evaluateAstFuzzy(parser(lexer(input)), sentenceIDMap, mode === 'character')
      .filter(({ scores }) => scores.total >= threshold)
      .sort((a, b) => b.scores.total - a.scores.total)
      .slice(0, limit),
});
