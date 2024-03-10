export const capitalize = <T extends string>(str: T): Capitalize<T> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;

export const uncapitalize = <T extends string>(str: T): Uncapitalize<T> =>
  (str.charAt(0).toLowerCase() + str.slice(1)) as Uncapitalize<T>;
