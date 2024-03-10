import { enhancedFuzzyQueryByCharacter } from './fuzzy-query-enhanced.js';
import { fuzzyQuery } from './fuzzy-query.js';
import {
  generateEnhancedIndexByCharacter,
  readEnhancedIndex,
} from './indexer-enhanced.js';
import { IndexStrategy, generateIndex, readIndex } from './indexer.js';
import { fileExists } from './utils/file.js';
import { Nested, logged } from './utils/log.js';

const CORPUS_PATHNAME = './data/corpus.txt';
const TARGET_PATHNAME = './data/corpusnew.txt';
const WORD_INDEX_PATHNAME = './dict.index';
const CHARACTER_INDEX_PATHNAME = './dict.index.char';
const CHARACTER_ENHANCED_INDEX_PATHNAME = './dict.index.char.enhanced';

const loggedReadIndex = logged('Index read', readIndex);
const loggedGenerateIndex = logged('Index generated', generateIndex);
const loggedFuzzyQuery = logged(
  ({ __callStack: [[, [input]]] }) => `Queried "${input}"`,
  fuzzyQuery,
  Nested.of(1),
);

const loggedReadEnhancedIndex = logged(
  'Enhanced character index read',
  readEnhancedIndex,
);
const loggedGenerateEnhancedIndexByCharacter = logged(
  'Enhanced character index generated',
  generateEnhancedIndexByCharacter,
);
const loggedEnhancedFuzzyQueryByCharacter = logged(
  ({ __callStack: [[, [input]]] }) => `Queried "${input}"`,
  enhancedFuzzyQueryByCharacter,
  Nested.of(1),
);

const main = async () => {
  const wordIndexMap = (await fileExists(WORD_INDEX_PATHNAME))
    ? await loggedReadIndex(WORD_INDEX_PATHNAME)
    : await loggedGenerateIndex(
        CORPUS_PATHNAME,
        TARGET_PATHNAME,
        WORD_INDEX_PATHNAME,
      );

  const characterIndexMap = (await fileExists(CHARACTER_INDEX_PATHNAME))
    ? await loggedReadIndex(CHARACTER_INDEX_PATHNAME)
    : await loggedGenerateIndex(
        CORPUS_PATHNAME,
        TARGET_PATHNAME,
        CHARACTER_INDEX_PATHNAME,
        IndexStrategy.BY_CHARACTER,
      );

  const characterEnhancedIndexMap = (await fileExists(
    CHARACTER_ENHANCED_INDEX_PATHNAME,
  ))
    ? await loggedReadEnhancedIndex(CHARACTER_ENHANCED_INDEX_PATHNAME)
    : await loggedGenerateEnhancedIndexByCharacter(
        CORPUS_PATHNAME,
        CHARACTER_ENHANCED_INDEX_PATHNAME,
      );

  process.stdout.write(
    'Select a mode (0 for term, 1 for character, 2 for character-enhanced): ',
  );
  let mode: 'term' | 'character' | 'character-enhanced';
  process.stdin.on('data', (data) => {
    if (mode === undefined) {
      if (data.toString().trim() === '0') mode = 'term';
      else if (data.toString().trim() === '1') mode = 'character';
      else if (data.toString().trim() === '2') mode = 'character-enhanced';
      else throw new Error('Invalid mode');

      console.log();
      process.stdout.write('Query: ');
      return;
    }

    if (mode === 'term')
      console.log(
        loggedFuzzyQuery(data.toString().trim(), {
          threshold: 0,
          limit: 5,
          mode,
        }).on(wordIndexMap),
      );
    else if (mode === 'character')
      console.log(
        loggedFuzzyQuery(data.toString().trim(), {
          threshold: 0,
          limit: 5,
          mode,
        }).on(characterIndexMap),
      );
    else
      console.log(
        loggedEnhancedFuzzyQueryByCharacter(data.toString().trim(), {
          threshold: 0,
          limit: 5,
        }).on(characterEnhancedIndexMap),
      );

    console.log();

    process.stdout.write('Query: ');
  });
};

await main();
