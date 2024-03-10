import fs from 'node:fs/promises';

import * as cheerio from 'cheerio';

import { extractText } from './utils.js';

/**
 * Process a html file and save the result to another file.
 * @param sourcePath
 * @param outputPath
 * @param logOutput
 */
const exercise1 = async (
  sourcePath: string,
  outputPath: string,
  logOutput = false,
) => {
  const html = await fs.readFile(sourcePath, 'utf-8');
  const $ = cheerio.load(html);

  // Title
  const title = $('title').text();
  fs.writeFile(outputPath, `title:\n${title}\n\n`, 'utf-8');
  if (logOutput) {
    console.log(`title:\n${title}\n`);
  }

  // Body
  const body = $('body')
    .contents()
    .map((_, el) => extractText($, el)) // Extract text from each node.
    .get()
    .join('')
    .replace(/\n{2,}/g, '\n') // Remove redundant newlines.
    .trim()
    .split('Google Scholar', 2)[0]; // Remove words after "Google Scholar".
  await fs.appendFile(outputPath, `body:\n${body}\n`, 'utf-8');
  if (logOutput) {
    console.log(`body:\n${body}`);
  }
};

export default exercise1;
