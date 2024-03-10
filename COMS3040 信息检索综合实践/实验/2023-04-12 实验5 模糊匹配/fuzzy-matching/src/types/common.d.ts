/**
 * The sentence ID map, where the key is the term and the value is the list of sentence IDs.
 */
export type IndexMap = Map<string, number[]>;

/**
 * An enhanced version of index map, where the key is still the term,
 * but the value is a map where the key is the sentence ID
 * and the value is the list of indexes (start by 0) of the term in the sentence.
 *
 * @example
 * ```typescript
 * const indexMap: EnhancedIndexMap = new Map([
 *   ['中', {
 *     1: [0, 12], // The term '中' appears twice in the sentence with ID 1, at index 0 and 12.
 *   }],
 * ]);
 * ```
 */
export type EnhancedIndexMap = Map<string, Record<number, number[]>>;
