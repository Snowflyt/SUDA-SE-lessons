import * as R from 'ramda';

import { createBitmap } from './bitmap.js';

/**
 * Get the union of two arrays.
 * @param arr1
 * @param arr2
 * @returns
 */
export const union = (arr1: number[], arr2: number[]): number[] => {
  const maxElement = Math.max(...arr1, ...arr2);
  const bitmap = createBitmap(maxElement);

  for (const id of arr1) {
    bitmap.set(id);
  }

  for (const id of arr2) {
    bitmap.set(id);
  }

  return R.range(0, maxElement + 1).filter((id) => bitmap.isSet(id));
};

/**
 * Get the intersection of two arrays.
 * @param arr1
 * @param arr2
 * @returns
 */
export const intersection = (arr1: number[], arr2: number[]): number[] => {
  const maxElement = Math.max(...arr1, ...arr2);
  const bitmap = createBitmap(maxElement);

  for (const id of arr1) {
    bitmap.set(id);
  }

  return arr2.filter((id) => bitmap.isSet(id));
};

/**
 * Get the difference of two arrays.
 * @param arr1
 * @param arr2
 * @returns
 */
export const difference = (arr1: number[], arr2: number[]): number[] => {
  const maxElement = Math.max(...arr1, ...arr2);
  const bitmap = createBitmap(maxElement);

  for (const id of arr1) {
    bitmap.set(id);
  }

  for (const id of arr2) {
    bitmap.clear(id);
  }

  return R.range(0, maxElement + 1).filter((id) => bitmap.isSet(id));
};
