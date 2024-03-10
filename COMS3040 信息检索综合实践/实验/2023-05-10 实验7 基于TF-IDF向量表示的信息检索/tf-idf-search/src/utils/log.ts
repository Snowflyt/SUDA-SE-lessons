/**
 * The metadata of a logged function.
 *
 * @example
 * ```typescript
 * declare function queryAndPrint(input: string): void;
 * const loggedQueryAndPrint = logged({
 *   message: ({ __callStack: [[, [input]]] }) => `Queried "${input}"`,
 *   fn: queryAndPrint,
 * });
 * // The `__callStack` property is `[['queryAndPrint', ['Hello, world!']]]` here
 * loggedQueryAndPrint('Hello, world!');
 * // Output: Queried "Hello, world!" in 100ms
 *
 * declare function saveSomething(something: Something): {
 *   toFile: (pathname: string) => Promise<void>;
 * }
 * const loggedSaveSomething = logged({
 *   message: ({ __callStack: [[, [something]], [, [pathname]]] }) =>
 *     `Saved ${something} to ${pathname}`,
 *   fn: saveSomething,
 *   depth: 1,
 * });
 * // The `__callStack` property is `[
 * //   ['saveSomething', [something]],
 * //   ['toFile', [pathname]],
 * // ]` here
 * await loggedSaveSomething(something).toFile(pathname);
 * // Output: Saved <something> to <pathname> in 100ms
 * ```
 */
export interface LoggedMetadata {
  __callStack: [string | number | symbol, unknown[]][];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LoggedOptions<T extends (...args: any[]) => any> {
  message: string | ((metadata: LoggedMetadata) => string);
  fn: T;
  /**
   * Represents the depth of logging level. Defaults to 0.
   *
   * @example
   * ```typescript
   * declare function saveSomething(something: Something): {
   *  toFile: (pathname: string) => Promise<void>;
   * }
   * const loggedSaveSomething = logged(
   *   'Saved something to file',
   *   saveSomething,
   *   Nested.of(1),
   * );
   * // The log would print after the promise returned by `toFile` is resolved
   * await loggedSaveSomething(something).toFile(pathname);
   * // Output: Saved something to file in 100ms
   * ```
   */
  depth?: number;
}

/**
 * Log the execution time of a function.
 *
 * When the function is asynchronous (i.e. returning a promise),
 * the message will be logged after the promise returned by the
 * function is resolved.
 *
 * Special support for fluent APIs is provided. Functions like
 * `saveSomething(something).toFile(pathname)` are supported,
 * see {@link LoggedOptions#depth} for more details.
 *
 * Dynamically generated messages by making use of the arguments
 * passed to the function are also supported. See {@link LoggedMetadata}.
 *
 * A basic example with static message and no fluent API is shown below
 * (if you want to learn more, check {@link LoggedMetadata} and {@link LoggedOptions#depth}).
 * @param options The options for logging.
 *
 * @example
 * ```typescript
 * declare function queryAndPrint(input: string): void;
 * const loggedQueryAndPrint = logged({
 *   message: 'Queried something',
 *   fn: queryAndPrint,
 * });
 * // The log would print after the function returns
 * loggedQueryAndPrint('Hello, world!');
 * // Output: Queried something in 100ms
 *
 * declare function save(file: File, pathname: string): Promise<void>;
 * const loggedSave = logged({ message: 'File saved', fn: save });
 * // The log would print after the promise returned by `save` is resolved
 * await loggedSave(file, pathname);
 * // Output: File saved in 100ms
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logged = <T extends (...args: any[]) => any>(
  options: LoggedOptions<T>,
): T => {
  const { depth = 0, fn, message } = options;

  // WARNING: Many confusing methods are used here in order to
  // make accessing the metadata possible, so if you are not interested
  // in the implementation, just ignore it.
  return ((...args) => {
    const startTime = Date.now();
    let result = fn(...args);

    // Extract metadata from the last call.
    let metadata: LoggedMetadata;
    if (
      result !== null &&
      typeof result === 'object' &&
      '__metadata' in result
    ) {
      metadata = result['__metadata'];
      result = result['result'];
    } else {
      // If no metadata is found, consider this function as the root function,
      // and create a new metadata.
      metadata = { __callStack: [[fn.name, args]] };
    }

    // For async functions, wait for the result and log the message.
    if (result instanceof Promise) {
      result = result
        .then((res) => {
          if (depth === 0) {
            console.log(
              `${
                typeof message === 'string' ? message : message(metadata ?? [])
              } in ${Date.now() - startTime}ms.`,
            );
          }
          return res;
        })
        .catch((err) => {
          throw err;
        });
    }

    if (!(result instanceof Promise) && depth === 0) {
      // If the depth is 0, log the message
      console.log(
        `${
          typeof message === 'string' ? message : message(metadata ?? [])
        } in ${Date.now() - startTime}ms.`,
      );
    }

    if (depth === 0) return result;

    // Check if the result is an object if the nested level is not 0.
    if (typeof result !== 'object' || result === null) {
      throw new Error('Nested logging is only supported for objects.');
    }

    // Recursively log the nested functions.
    return Object.entries(result).reduce((acc, [key, value]) => {
      acc[key] = value;
      if (typeof value === 'function') {
        acc[key] = logged({
          message,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fn: (...as: any[]) => ({
            __metadata: {
              ...metadata,
              __callStack: [...metadata.__callStack, [key, as]],
            } as LoggedMetadata,
            result: value(...as),
          }),
          depth: depth - 1,
        });
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
  }) as T;
};
