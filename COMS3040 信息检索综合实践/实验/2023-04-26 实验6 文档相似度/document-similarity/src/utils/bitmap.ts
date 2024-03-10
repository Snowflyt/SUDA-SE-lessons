/**
 * A data structure that represents a bitmap.
 */
export interface Bitmap {
  readonly value: Uint32Array;
  set: (bitIndex: number) => void;
  clear: (bitIndex: number) => void;
  isSet: (bitIndex: number) => boolean;
}

/**
 * Create a bitmap.
 * @param size The size of the bitmap.
 * @returns
 */
export const createBitmap = (size: number): Bitmap => {
  const _value = new Uint32Array(Math.ceil(size / 32));

  return {
    get value() {
      return _value;
    },
    /**
     * Set a bit in the bitmap.
     * @param index
     */
    set(index: number) {
      const key = Math.floor(index / 32);
      const mask = 1 << index % 32;
      _value[key] |= mask;
    },
    /**
     * Clear a bit in the bitmap.
     * @param index
     */
    clear(index: number) {
      const key = Math.floor(index / 32);
      const mask = 1 << index % 32;
      _value[key] &= ~mask;
    },
    /**
     * Check if a bit is set.
     * @param index
     * @returns
     */
    isSet(index: number) {
      const key = Math.floor(index / 32);
      const mask = 1 << index % 32;
      return (_value[key] & mask) !== 0;
    },
  };
};
