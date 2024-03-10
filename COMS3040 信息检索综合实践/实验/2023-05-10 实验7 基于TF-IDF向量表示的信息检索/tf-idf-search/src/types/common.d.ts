/**
 * The sentence ID map, where the key is the term,
 * and the value is a map where the key is the sentence ID
 * and the value is the list of indexes (start by 0) of the term in the sentence.
 *
 * @example
 * ```typescript
 * const indexMap = new Map([
 *   ['john', {
 *     1: [0, 12], // The word 'john' appears twice in the sentence with ID 1, at index 0 and 12.
 *   }],
 * ]);
 * ```
 */
export type IndexMap = Map<string, Record<number, number[]>>;

/**
 * The simplified sentence ID map, where the key is the term,
 * and the value is a map where the key is the sentence ID
 * and the value is the number of times the term appears in the sentence.
 *
 * @example
 * ```typescript
 * const indexMap = new Map([
 *   ['john', {
 *     1: 2, // The word 'john' appears twice in the sentence with ID 1.
 *   }],
 * ]);
 * ```
 */
export type SimplifiedIndexMap = Map<string, Map<number, number>>;
