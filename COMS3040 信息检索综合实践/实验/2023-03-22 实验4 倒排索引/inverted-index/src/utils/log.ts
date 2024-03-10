/**
 * Log the execution time of a function.
 * @param message The message to be logged.
 * @param fn The function to be executed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logged = <T extends (...args: any[]) => any>(
  message: string,
  fn: T,
): T => {
  return ((...args) => {
    const startTime = Date.now();
    const result = fn(...args);
    if (result instanceof Promise) {
      return result
        .then((res) => {
          console.log(`${message} in ${Date.now() - startTime}ms.`);
          return res;
        })
        .catch((err) => {
          throw err;
        });
    }
    console.log(`${message} in ${Date.now() - startTime}ms.`);
    return result;
  }) as T;
};
