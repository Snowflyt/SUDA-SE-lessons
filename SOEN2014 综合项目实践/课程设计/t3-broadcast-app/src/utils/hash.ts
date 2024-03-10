export const hash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

export function hashSelect<T>(arr: T[], str: string): T;
export function hashSelect<T>(arr: T[]): (str: string) => T;
export function hashSelect<T>(arr: T[], str?: string) {
  if (str === undefined) return (str: string) => hashSelect(arr, str);
  return arr[hash(str) % arr.length];
}
