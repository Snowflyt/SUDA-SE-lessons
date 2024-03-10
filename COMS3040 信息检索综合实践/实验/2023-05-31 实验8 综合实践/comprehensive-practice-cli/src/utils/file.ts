import fs from 'node:fs/promises';

/**
 * Check if a file exists.
 * @param pathname The path to the file.
 * @returns
 */
export const fileExists = async (pathname: string) => {
  try {
    const stat = await fs.stat(pathname);
    return stat.isFile();
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};

export const folderExists = async (pathname: string) => {
  try {
    const stat = await fs.stat(pathname);
    return stat.isDirectory();
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};
