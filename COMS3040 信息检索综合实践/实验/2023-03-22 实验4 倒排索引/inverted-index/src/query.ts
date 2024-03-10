import * as R from 'ramda';

import { ASTNode, lexer, parser } from './parser.js';
import { createBitmap } from './utils/bitmap.js';
import { difference, intersection, union } from './utils/set.js';

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

  return R.range(0, maxElement).filter((docID) => bitmap.isSet(docID));
};

/**
 * Evaluate the AST and return the document IDs that match the query.
 * @param ast The AST.
 * @param indexMap The document ID map, where the key is the term and the value is the list of document IDs.
 * @returns
 */
const evaluateAst = (
  ast: ASTNode,
  indexMap: IndexMap,
  allDocIDs: number[] = getAllDocIDs(indexMap),
): number[] => {
  switch (ast.type) {
    case 'Term': {
      const term = ast.value;
      return indexMap.get(term) ?? [];
    }
    case 'And': {
      const left = evaluateAst(ast.left, indexMap, allDocIDs);
      const right = evaluateAst(ast.right, indexMap, allDocIDs);
      return intersection(left, right);
    }
    case 'Or': {
      const left = evaluateAst(ast.left, indexMap, allDocIDs);
      const right = evaluateAst(ast.right, indexMap, allDocIDs);
      return union(left, right);
    }
    case 'Not': {
      const operand = evaluateAst(ast.operand, indexMap, allDocIDs);
      return difference(allDocIDs, operand);
    }
  }
};

/**
 * Get the document IDs that match the query.
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
 * @param input The query string. All terms are case-insensitive.
 * @param docIDMap The document ID map, where the key is the term and the value is the list of document IDs.
 * @returns
 *
 * @example
 * ```typescript
 * query('john and (james or not mary)').on(
 *   new Map([
 *     ['john', [1, 3]],
 *     ['james', [2, 3, 4]],
 *     ['mary', [2, 5]],
 *   ]),
 * ); // => [1, 3]
 * ```
 */
export const query = (input: string) => ({
  on: (docIDMap: IndexMap): number[] =>
    evaluateAst(parser(lexer(input)), docIDMap),
});
