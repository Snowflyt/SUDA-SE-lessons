import crypto from 'node:crypto';
import fs from 'node:fs/promises';

/**
 * Read data from source file and return a map
 * which maps words to the number of occurrences
 * @param filePath
 */
export const parseSourceFileToMap = async (
  filePath: string,
): Promise<Map<string, number>> => {
  const word2numMap = new Map<string, number>();
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const words = fileContent.match(/[a-zA-Z]+/g) ?? [];
  for (const word of words) {
    word2numMap.set(word.toLowerCase(), (word2numMap.get(word) ?? 0) + 1);
  }
  return word2numMap;
};

/**
 * Check if the dict file exists
 * @param filePath
 */
export const checkDictFileExists = async (
  filePath: string,
): Promise<boolean> => {
  return await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
};

/**
 * Save the word2numMap to dict file
 * The first line of the dict file is the hash of the source file
 * @param dictFilePath
 * @param sourceFilePath
 * @param word2numMap
 */
export const cacheMapToDictFile = async (
  dictFilePath: string,
  sourceFilePath: string,
  word2numMap: Map<string, number>,
): Promise<void> => {
  // Get MD5 hash of the source file
  const hash = crypto.createHash('md5');
  const sourceFileContent = await fs.readFile(sourceFilePath, 'utf-8');
  hash.update(sourceFileContent);
  const hashResult = hash.digest('hex');

  // Write the word2numMap to the dict file
  const result = Array.from(word2numMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word, num]) => `${word}\t${num}`)
    .join('\n');

  await fs.writeFile(dictFilePath, `${hashResult}\n${result}`);
};

/**
 * Read data from dict file and return a map
 * which maps words to the number of occurrences
 * @param filePath
 */
export const parseDictFileToMap = async (
  filePath: string,
): Promise<Map<string, number>> => {
  const dictContent = await fs.readFile(filePath, 'utf-8');
  const word2numMap = new Map<string, number>();
  // Skip the first line because it is the hash of the source file
  for (const line of dictContent.split('\n').slice(1)) {
    const [word, num] = line.split('\t');
    word2numMap.set(word, Number(num));
  }
  return word2numMap;
};

/**
 * Compare the hash of the source file and the dict file (from the first line)
 * @param dictFilePath
 * @param sourceFilePath
 */
export const compareFileHash = async (
  dictFilePath: string,
  sourceFilePath: string,
): Promise<boolean> => {
  // Get MD5 hash of the source file
  const sourceFileHash = crypto.createHash('md5');
  const sourceFileContent = await fs.readFile(sourceFilePath, 'utf-8');
  sourceFileHash.update(sourceFileContent);
  const sourceFileResult = sourceFileHash.digest('hex');

  // Get the hash from the first line of the dict file
  const dictFileContent = await fs.readFile(dictFilePath, 'utf-8');
  const dictFileResult = dictFileContent.split('\n')[0];

  return sourceFileResult === dictFileResult;
};
