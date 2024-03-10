import fs from 'node:fs/promises';
import path from 'node:path';

import * as cheerio from 'cheerio';

import { extractText } from './utils.js';

/**
 * Process all html files in a folder and save the result to another folder.
 * @param sourceFolder
 * @param outputFolder
 * @param logProgress
 */
const exercise2 = async (
  sourceFolder: string,
  outputFolder: string,
  logProgress = false,
) => {
  // Get all file names in the source folder.
  const fileNames = await fs.readdir(sourceFolder);

  for (const fileName of fileNames) {
    const sourcePath = path.join(sourceFolder, fileName);
    const outputPath = path.join(outputFolder, `${fileName.slice(0, -4)}txt`);
    if (logProgress) {
      console.log(`Processing "${sourcePath}" to "${outputPath}"...`);
    }

    // Load html file.
    const html = await fs.readFile(sourcePath, 'utf-8');
    const $ = cheerio.load(html);

    // Extract the main part of the page.
    const body = $('table[bgcolor="#C0C0C0"] tr td') // Find the main table.
      .contents()
      .not('font[color="#FFFFFF"], a') // Filter out advertisement and links.
      .map((_, el) => extractText($, el)) // Extract text from each node.
      .get()
      .join('')
      .replace(/\n{2,}/g, '\n') // Remove redundant newlines.
      .trim() // Remove leading and trailing whitespace.
      .split('相关词语', 2)[0] // Remove words after "相关词语".
      .split('基本解释', 2)
      .join('\n基本解释'); // Add a line break before "基本解释".

    // Save the result to a text file.
    await fs.writeFile(outputPath, body, 'utf-8');

    if (logProgress) {
      console.log('Done.\n');
    }
  }
};

export default exercise2;
