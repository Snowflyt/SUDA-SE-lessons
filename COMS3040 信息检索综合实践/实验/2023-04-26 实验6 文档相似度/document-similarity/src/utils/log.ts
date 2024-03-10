/**
 * A class that represents a nested logging level.
 */
export class Nested {
  constructor(public readonly value: number) {}

  static of(value: number): Nested {
    return new Nested(value);
  }
}

/**
 * The metadata of a logged function.
 */
export interface LoggedMetadata {
  __callStack: [string | number | symbol, unknown[]][];
}

/**
 * Log the execution time of a function.
 * @param message The message to be logged.
 * @param fn The function to be executed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logged = <T extends (...args: any[]) => any>(
  message: string | ((metadata: LoggedMetadata) => string),
  fn: T,
  nested: Nested = Nested.of(0),
): T =>
  // WARNING: Many confusing methods are used here in order to make accessing the metadata possible, so if you are not interested in the implementation, just ignore it.
  ((...args) => {
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
      // If no metadata is found, consider this function as the root function, and create a new metadata.
      metadata = { __callStack: [[fn.name, args]] };
    }

    // For async functions, wait for the result and log the message.
    if (result instanceof Promise) {
      result = result
        .then((res) => {
          if (nested.value === 0) {
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

    // If the nested level is 0, log the message.
    if (nested.value === 0) {
      console.log(
        `${
          typeof message === 'string' ? message : message(metadata ?? [])
        } in ${Date.now() - startTime}ms.`,
      );
      return result;
    }

    // Check if the result is an object if the nested level is not 0.
    if (typeof result !== 'object' || result === null) {
      throw new Error('Nested logging is only supported for objects.');
    }

    // Recursively log the nested functions.
    return Object.entries(result).reduce((acc, [key, value]) => {
      acc[key] = value;
      if (typeof value === 'function') {
        acc[key] = logged(
          message,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (...as: any[]) => {
            return {
              __metadata: {
                ...metadata,
                __callStack: [...metadata.__callStack, [key, as]],
              } as LoggedMetadata,
              result: value(...as),
            };
          },
          Nested.of(nested.value - 1),
        );
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
  }) as T;
