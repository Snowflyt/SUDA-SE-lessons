import type { EnumLike } from 'zod';

export const enumValuesType = <T extends EnumLike>(enumObj: T) => {
  return Object.values(enumObj)
    .map((role) => `"${role}"`)
    .join('|') as `"${(typeof enumObj)[keyof typeof enumObj]}"`;
};
