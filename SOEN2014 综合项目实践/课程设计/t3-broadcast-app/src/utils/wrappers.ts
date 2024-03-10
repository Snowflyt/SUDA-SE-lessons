type IsExactlyAny<T> = boolean extends (T extends never ? true : false)
  ? true
  : false;

export const wrapAsyncCallback = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends ((...args: any) => any) | undefined,
>(
  fn: IsExactlyAny<Parameters<Exclude<F, undefined>>> extends true
    ? () => Promise<void>
    : (...args: Parameters<Exclude<F, undefined>>) => Promise<void>,
) =>
  ((...args: Parameters<Exclude<F, undefined>>) => {
    void fn(...args);
  }) as IsExactlyAny<Parameters<Exclude<F, undefined>>> extends true
    ? () => void
    : (...args: Parameters<Exclude<F, undefined>>) => void;
