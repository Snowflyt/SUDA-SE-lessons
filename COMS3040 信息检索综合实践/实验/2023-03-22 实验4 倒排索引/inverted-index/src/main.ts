import { stdin, stdout } from 'node:process';

import { generateIndex, readIndex } from './indexer.js';
import { query } from './query.js';
import { fileExists } from './utils/file.js';
import { logged } from './utils/log.js';

const DATA_DIR = './data';
const INDEX_PATHNAME = './dict.index';

const loggedReadIndex = logged('Index read', readIndex);
const loggedGenerateIndex = logged('Index generated', generateIndex);

const main = async () => {
  const indexMap = (await fileExists(INDEX_PATHNAME))
    ? await loggedReadIndex(INDEX_PATHNAME)
    : await loggedGenerateIndex(DATA_DIR, INDEX_PATHNAME);

  // Test query
  console.log('Test query: john and (james or not mary)');
  console.log(
    query('john and (james or not mary)').on(
      new Map([
        ['john', [1, 3]],
        ['james', [2, 3, 4]],
        ['mary', [2, 5]],
      ]),
    ),
  );

  stdout.write('Enter a query: ');
  stdin.on('data', (data) => {
    const queryStr = data.toString().trim();
    console.log(query(queryStr).on(indexMap));
    stdout.write('Enter a query: ');
  });
};

await main();
