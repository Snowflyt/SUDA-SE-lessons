import crypto from 'node:crypto';

const SALT = 'f9086a33-e134-4a3e-9bfb-e417446805dd';

export const hash = (str: string) =>
  crypto.pbkdf2Sync(str, SALT, 1000, 64, 'sha512').toString('hex');

export const verify = (str: string) => ({
  withHash: (hashStr: string) => hash(str) === hashStr,
});
