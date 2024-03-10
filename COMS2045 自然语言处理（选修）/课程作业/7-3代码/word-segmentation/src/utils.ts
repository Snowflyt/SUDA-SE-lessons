import fs from 'node:fs/promises';

/**
 * Log the execution time of a function.
 * @param message The name of the function.
 * @param fn The function to be executed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logged = <T extends (...args: any[]) => any>(
  message: string,
  fn: T,
): T => {
  return ((...args) => {
    const startTime = Date.now();
    const result = fn(...args);
    if (result instanceof Promise) {
      return result
        .then((res) => {
          console.log(`${message} in ${Date.now() - startTime}ms.`);
          return res;
        })
        .catch((err) => {
          throw err;
        });
    }
    console.log(`${message} in ${Date.now() - startTime}ms.`);
    return result;
  }) as T;
};

/**
 * Read the corpus dictionary.
 * @param path The path of the corpus dictionary.
 */
export const readCorpusDict = async (
  path: string,
): Promise<{
  possibleWords: string[];
  maxWordLength: number;
}> => {
  const content = await fs.readFile(path, 'utf-8');
  const lines = content.split('\n');

  const maxWordLength = +lines[0].split('\t', 2)[1];
  const possibleWords = lines.slice(1);

  return { possibleWords, maxWordLength };
};

/**
 * Read the corpus source sentences.
 * @param path The path of the corpus source.
 */
export const readCorpusSource = async (path: string): Promise<string> => {
  const content = await fs.readFile(path, 'utf-8');
  return content.replace(/\s+/g, '');
};

/**
 * Read the corpus processed sentences.
 * @param path The path of the corpus processed.
 */
export const readCorpusProcessed = async (path: string): Promise<string[]> => {
  const content = await fs.readFile(path, 'utf-8');
  return content.split(/\s+/).filter((s) => s);
};

/**
 * Save the segmentation results to a file,
 * separated by spaces, and add new lines according to the source.
 * @param sourcePath The path of the corpus source.
 * @param outputPath The path of the output file.
 * @param result The segmentation result.
 */
export const saveCorpusOutput = async (
  sourcePath: string,
  outputPath: string,
  result: string[],
) => {
  const sourceContent = await fs.readFile(sourcePath, 'utf-8');
  const sourceLines = sourceContent.split(/\r?\n/);
  const sourceLineLengths = sourceLines.map((line) => line.length);

  let output = '';
  let lineIdx = 0;
  let charIdx = 0;
  for (const word of result) {
    output += word;
    charIdx += word.length;

    if (charIdx === sourceLineLengths[lineIdx]) {
      output += '\n';
      lineIdx++;
      charIdx = 0;
    } else {
      output += ' ';
    }
  }

  await fs.writeFile(outputPath, output);
};

/**
 * Use the backward maximum matching algorithm to segment.
 * @param text The text to be segmented.
 * @param possibleWords All words in the dictionary.
 * @param maxWordLength The length of the longest word in the dictionary.
 */
export const backwardMaximumMatching = (
  text: string,
  possibleWords: string[],
  maxWordLength: number,
): string[] => {
  const result: string[] = [];
  const possibleWordsSet = new Set(possibleWords);

  let index = text.length; // The index of the current character
  while (index > 0) {
    let length = Math.min(index, maxWordLength); // The length of the current word
    let word = text.slice(index - length, index); // the current word

    // If the current word is not in the dictionary.
    while (length > 1 && !possibleWordsSet.has(word)) {
      length--;
      word = text.slice(index - length, index);
    }

    result.unshift(word);
    index -= word.length;
  }

  return result;
};

/**
 * Evaluate the segmentation result (P / R / F1).
 * @param result Segmentation result array.
 * @param answer Manual segmentation result array.
 */
export const evaluate = (
  result: string[],
  answer: string[],
): {
  precisionFraction: [number, number];
  precision: number;
  recallFraction: [number, number];
  recall: number;
  f1: number;
} => {
  const forwardIdx = (words: string[], wordIdx: number, charIdx: number) => {
    if (charIdx < words[wordIdx].length - 1) {
      return [wordIdx, charIdx + 1];
    } else {
      return [wordIdx + 1, 0];
    }
  };

  const isCharAligned = (
    resultWords: string[],
    answerWords: string[],
    resultWordIdx: number,
    answerWordIdx: number,
    resultCharIdx: number,
    answerCharIdx: number,
  ) => {
    return (
      resultCharIdx === 0 &&
      answerCharIdx === 0 &&
      resultWords[resultWordIdx][0] === answerWords[answerWordIdx][0]
    );
  };

  return (() => {
    let resultWordIdx = 0;
    let answerWordIdx = 0;
    let resultCharIdx = 0;
    let answerCharIdx = 0;

    let correct = 0;

    while (resultWordIdx < result.length && answerWordIdx < answer.length) {
      if (result[resultWordIdx] === answer[answerWordIdx]) {
        // If the current word is correct, forward word index, and reset char index.
        correct++;
        resultWordIdx++;
        answerWordIdx++;
        resultCharIdx = 0;
        answerCharIdx = 0;
      } else {
        // Forward the index until the first character of the word is aligned.
        do {
          [resultWordIdx, resultCharIdx] = forwardIdx(
            result,
            resultWordIdx,
            resultCharIdx,
          );
          [answerWordIdx, answerCharIdx] = forwardIdx(
            answer,
            answerWordIdx,
            answerCharIdx,
          );
        } while (
          resultWordIdx < result.length &&
          answerWordIdx < answer.length &&
          !isCharAligned(
            result,
            answer,
            resultWordIdx,
            answerWordIdx,
            resultCharIdx,
            answerCharIdx,
          )
        );
      }
    }

    const precisionFraction: [number, number] = [correct, result.length];
    const precision = correct / result.length;
    const recallFraction: [number, number] = [correct, answer.length];
    const recall = correct / answer.length;
    const f1 = (2 * precision * recall) / (precision + recall);

    return { precisionFraction, precision, recallFraction, recall, f1 };
  })();
};
