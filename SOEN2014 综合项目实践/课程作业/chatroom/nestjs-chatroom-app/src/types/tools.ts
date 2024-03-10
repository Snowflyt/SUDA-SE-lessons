export type Cast<T, U> = T extends U ? T : U;

export type UnsafeGet<T, K> = K extends keyof T ? T[K] : never;
export type UnsafeReturnType<F> = F extends (...args: any[]) => any ? ReturnType<F> : never;

/**
 * Convert a union type to a `List`.
 */
export type ToList<U> = _ToList<U> extends infer X ? Cast<X, readonly unknown[]> : never;
type _ToList<U, LN extends readonly unknown[] = [], LastU = Last<U>> = {
  0: _ToList<Exclude<U, LastU>, [LastU, ...LN]>;
  1: LN;
}[[U] extends [never] ? 1 : 0];
type Last<U> =
  IntersectOf<U extends unknown ? (x: U) => void : never> extends (x: infer P) => void ? P : never;
type IntersectOf<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
