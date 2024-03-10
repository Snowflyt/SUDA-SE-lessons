import {
  cacheMapToDictFile,
  checkDictFileExists,
  compareFileHash,
  parseDictFileToMap,
  parseSourceFileToMap,
} from './utils.js';

const SOURCE_FILE_PATH = 'data/sample-en.txt';
const DICT_FILE_PATH = 'dict.index';

const main = async () => {
  let word2numMap: Map<string, number>;
  // Read data from source file or dict file
  const isDictFileExists = await checkDictFileExists(DICT_FILE_PATH);
  if (
    isDictFileExists &&
    (await compareFileHash(DICT_FILE_PATH, SOURCE_FILE_PATH))
  ) {
    // If the source file exists and has not been modified, read data from dict file
    console.log('Reading data from cache dict file...');
    const startTime = Date.now();
    word2numMap = await parseDictFileToMap(DICT_FILE_PATH);
    console.log(`Data loaded in ${Date.now() - startTime}ms`);
  } else {
    // If the source file does not exist or has been modified, read data from source file,
    if (isDictFileExists) {
      console.log(
        'Source file has been modified, reading data from source file...',
      );
    } else {
      console.log(`Dict file not found at ${DICT_FILE_PATH}`);
    }
    console.log('Reading data from source file...');
    const startTime1 = Date.now();
    word2numMap = await parseSourceFileToMap(SOURCE_FILE_PATH);
    console.log(`Data loaded in ${Date.now() - startTime1}ms`);

    // Save the word2numMap to dict file
    console.log('Caching the dict to speed up the next run...');
    const startTime2 = Date.now();
    await cacheMapToDictFile(DICT_FILE_PATH, SOURCE_FILE_PATH, word2numMap);
    console.log(`Dict saved in ${Date.now() - startTime2}ms`);
    console.log(`Dict file saved at ${DICT_FILE_PATH}`);
  }

  // Wait for the user to input words until the user inputs '###'
  // Each time the user inputs a word, print the number of occurrences of the word
  console.log('Please input a word to search (input ### to exit):');
  const stdin = process.openStdin();
  stdin.addListener('data', (input) => {
    const word = input.toString().trim();
    if (word === '###') {
      process.exit();
    }
    console.log(word2numMap.get(word) ?? -1);
  });
};

await main();
