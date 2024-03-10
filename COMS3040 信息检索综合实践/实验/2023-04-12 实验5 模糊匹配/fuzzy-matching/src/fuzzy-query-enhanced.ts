import * as R from 'ramda';

import { ASTNode, lexer, parser } from './parser.js';
import { createBitmap } from './utils/bitmap.js';

import type { EnhancedIndexMap } from './types/common';

/**
 * Get all sentence IDs from the sentence ID map.
 * @param indexMap The sentence ID map, where the key is the term and the value is the list of sentence IDs.
 * @returns
 */
const getAllSentenceIDs = (indexMap: EnhancedIndexMap): number[] => {
  const maxElement = Math.max(
    ...[...indexMap.values()].map(Object.keys).flat().map(Number),
  );
  const bitmap = createBitmap(maxElement);

  for (const sentenceIDs of [...indexMap.values()].map(Object.keys)) {
    for (const sentenceID of sentenceIDs.map(Number)) {
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
const calculateScore = (sentenceID: number, term: string) => ({
  on: (indexMap: EnhancedIndexMap): FuzzyQueryResult => {
    const PENALTY = 0.5;

    const characters = term.split('');

    let matchScore = 0;
    let lastPositions: number[] = [];

    for (const character of characters) {
      const positionsMap = indexMap.get(character);

      if (!positionsMap || !positionsMap[sentenceID]) {
        // Character not found in the sentence
        // Penalize the score
        if (matchScore > 0) matchScore -= PENALTY;
      } else {
        const positions = positionsMap[sentenceID];
        let maxDistanceScore = 0;

        for (const position of positions) {
          if (lastPositions.length === 0) maxDistanceScore = 1;
          for (const lastPosition of lastPositions) {
            const distance = Math.abs(position - lastPosition);
            // Use the inverse of the distance as the score
            const distanceScore = 1 / distance;

            if (distanceScore > maxDistanceScore)
              maxDistanceScore = distanceScore;
          }
        }

        matchScore += maxDistanceScore;
        lastPositions = positions;
      }
    }

    const toScore = (count: number, total: number) => (count / total) * 100;
    const score = toScore(matchScore, characters.length);

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

const evaluateAstEnhancedFuzzyByCharacter = (
  ast: ASTNode,
  indexMap: EnhancedIndexMap,
  allSentenceIDs: number[] = getAllSentenceIDs(indexMap),
): FuzzyQueryResult[] => {
  switch (ast.type) {
    case 'Term': {
      const term = ast.value;

      return allSentenceIDs.map((sentenceID) =>
        calculateScore(sentenceID, term).on(indexMap),
      );
    }

    case 'And': {
      const left = evaluateAstEnhancedFuzzyByCharacter(
        ast.left,
        indexMap,
        allSentenceIDs,
      );
      const right = evaluateAstEnhancedFuzzyByCharacter(
        ast.right,
        indexMap,
        allSentenceIDs,
      );

      return mergeScores(left, right, MergeScoreStrategy.AND);
    }

    case 'Or': {
      const left = evaluateAstEnhancedFuzzyByCharacter(
        ast.left,
        indexMap,
        allSentenceIDs,
      );
      const right = evaluateAstEnhancedFuzzyByCharacter(
        ast.right,
        indexMap,
        allSentenceIDs,
      );

      return mergeScores(left, right, MergeScoreStrategy.OR);
    }

    case 'Not': {
      const operand = evaluateAstEnhancedFuzzyByCharacter(
        ast.operand,
        indexMap,
        allSentenceIDs,
      );

      return reverseScores(operand);
    }
  }
};

/**
 * Options for fuzzy query.
 */
export interface EnhancedFuzzyQueryByCharacterOptions {
  limit?: number;
  threshold?: number;
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
export const enhancedFuzzyQueryByCharacter = (
  input: string,
  { limit, threshold = 60 }: EnhancedFuzzyQueryByCharacterOptions = {},
) => ({
  on: (indexMap: EnhancedIndexMap): FuzzyQueryResult[] =>
    evaluateAstEnhancedFuzzyByCharacter(parser(lexer(input)), indexMap)
      .filter(({ scores }) => scores.total >= threshold)
      .sort((a, b) => b.scores.total - a.scores.total)
      .slice(0, limit),
});
