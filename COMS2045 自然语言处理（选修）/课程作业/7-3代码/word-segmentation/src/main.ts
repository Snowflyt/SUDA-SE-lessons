import {
  backwardMaximumMatching,
  evaluate,
  logged,
  readCorpusDict,
  readCorpusProcessed,
  readCorpusSource,
  saveCorpusOutput,
} from './utils.js';

const CORPUS_DICT_PATH = './data/corpus.dict.txt';
const CORPUS_SOURCE_PATH = './data/corpus.sentence.txt';
const CORPUS_PROCESSED_PATH = './data/corpus.answer.txt';
const CORPUS_OUTPUT_PATH = './data/corpus.out.txt';

const loadData = async () => {
  // Load the dictionary.
  const { maxWordLength, possibleWords } = await logged(
    'Dictionary loaded',
    readCorpusDict,
  )(CORPUS_DICT_PATH);

  // Load the source sentences.
  const source = await logged(
    'Source loaded',
    readCorpusSource,
  )(CORPUS_SOURCE_PATH);

  // Load the processed sentences.
  const answer = await logged(
    'Processed loaded',
    readCorpusProcessed,
  )(CORPUS_PROCESSED_PATH);

  return { possibleWords, maxWordLength, source, answer };
};

const logEvaluation = ({
  f1,
  precision,
  precisionFraction,
  recall,
  recallFraction,
}: {
  precisionFraction: [number, number];
  precision: number;
  recallFraction: [number, number];
  recall: number;
  f1: number;
}) => {
  const toPercentage = (num: number) => `${(num * 100).toFixed(4)}%`;

  console.log(
    `Precision = ${precisionFraction[0]} / ${
      precisionFraction[1]
    } = ${toPercentage(precision)}`,
  );
  console.log(
    `Recall = ${recallFraction[0]} / ${recallFraction[1]} = ${toPercentage(
      recall,
    )}`,
  );
  console.log(`F1 = ${toPercentage(f1)}`);
};

const main = async () => {
  // Load the data.
  const { answer, maxWordLength, possibleWords, source } = await loadData();

  console.log();

  // Use backward maximum matching algorithm to segment.
  const result2 = logged(
    'Backward maximum matching finished',
    backwardMaximumMatching,
  )(source, possibleWords, maxWordLength);
  // Evaluate the segmentation result.
  logEvaluation(evaluate(result2, answer));
  // Save the segmentation result.
  await logged('Result saved', saveCorpusOutput)(
    CORPUS_SOURCE_PATH,
    CORPUS_OUTPUT_PATH,
    result2,
  );
};

await main();
