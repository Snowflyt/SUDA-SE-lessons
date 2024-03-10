import fs from 'fs/promises';
import path from 'node:path';

import {
  generateIndex,
  loadIndex,
  saveIndex,
  transformIndexMap,
} from './indexer.js';
import {
  calculateSimilaritiesOf,
  generateTFIDFVectorMatrix,
} from './lexical-vector.js';
import { translate } from './model.js';
import { extractOptions, extractPageInfo, getTeacherURLs } from './spider.js';
import { fileExists, folderExists } from './utils/file.js';
import { logged } from './utils/log.js';

import type { SimplifiedIndexMap } from './types/common';
import type { SparseDataFrame } from './utils/dataframe';

const DATA_DIR = './data';
const DATA_NAME = 'data.json';
const DATA_JSON_PATHNAME = path.join(DATA_DIR, DATA_NAME);

type Keys = 'teaching' | 'projects' | 'publications';
const KEYS = ['teaching', 'projects', 'publications'] as const;

const loggedSaveJSON = logged({
  message: 'JSON saved',
  fn: (data: unknown) => ({
    toFile: async (pathname: string) =>
      await fs.writeFile(pathname, JSON.stringify(data, null, 2)),
  }),
  depth: 1,
});
const loggedReadCorpus = logged({
  message: 'Corpus read',
  fn: fs.readFile,
});
const loggedLoadIndex = logged({
  message: 'Index loaded',
  fn: loadIndex,
});
const loggedGenerateIndex = logged({
  message: 'Index generated',
  fn: generateIndex,
});
const loggedSaveIndex = logged({
  message: 'Index saved',
  fn: saveIndex,
  depth: 1,
});
const loggedTransformIndexMap = logged({
  message: 'Index map transformed',
  fn: transformIndexMap,
});
const loggedGenerateTFIDFVectorMatrix = logged({
  message: 'TF-IDF vector matrix generated',
  fn: generateTFIDFVectorMatrix,
});
const loggedReadDocuments = logged({
  message: 'Documents read',
  fn: async (pathname: string) => {
    const content = await fs.readFile(pathname, 'utf-8');
    return content.split('\n');
  },
});

/**
 * Fetch teacher info from the Internet. (would translate Chinese to English using ChatGPT-3.5)
 * @returns The teacher infos.
 */
const fetchTeacherInfos = async () => {
  const teacherURLs = await getTeacherURLs();
  const teacherInfos: Array<{
    name: string;
    teaching: string[];
    projects: string[];
    publications: string[];
  }> = [];
  for (const { name, url } of teacherURLs) {
    const { projects, publications, teaching } = await logged({
      message: `Fetched info of "${name}"`,
      fn: async () =>
        await extractPageInfo(url, extractOptions[name] ?? { splitter: 'h3' }),
    })();
    teacherInfos.push({
      name,
      teaching: teaching ?? null,
      projects: projects ?? null,
      publications: publications ?? null,
    });
  }

  // Translate Chinese to English
  const translationTypeMap = {
    teaching: 'course-name',
    projects: 'project-name',
    publications: 'paper-title',
  } as const;

  await logged({
    message: 'Translated Chinese to English',
    fn: async () => {
      for (const info of teacherInfos) {
        for (const key of KEYS) {
          if (info[key] === null) continue;
          info[key] = await Promise.all(
            info[key].map(async (line) =>
              /[\u4e00-\u9fa5]/.test(line)
                ? await translate(line, translationTypeMap[key])
                : line,
            ),
          );
        }
      }
    },
  })();

  return teacherInfos;
};

/**
 * Get index map from cached file or generate it from corpus.
 * @param indexPathname The pathname of the cached index map file.
 * @param corpusPathname The pathname of the corpus file.
 * @returns The index map.
 */
const getIndexMap = async (indexPathname: string, corpusPathname: string) => {
  if (await fileExists(indexPathname))
    return await loggedLoadIndex(indexPathname, { simplified: true });

  const corpus = await loggedReadCorpus(corpusPathname, 'utf-8');
  const documents = corpus.split('\n');
  const indexMap = await loggedGenerateIndex(documents);
  await loggedSaveIndex(indexMap).toFile(indexPathname);
  return loggedTransformIndexMap(indexMap);
};

const main = async () => {
  /* Fetch teacher info from the Internet if not exists */
  if (!(await fileExists(DATA_JSON_PATHNAME))) {
    const teacherInfos = await fetchTeacherInfos();
    // Save to JSON
    await loggedSaveJSON(teacherInfos).toFile(DATA_JSON_PATHNAME);
    // Save to text files
    await logged({
      message: 'Saved to text files',
      fn: async () => {
        for (const info of teacherInfos) {
          const folderPath = path.join(DATA_DIR, info.name);
          if (!(await folderExists(folderPath))) fs.mkdir(folderPath);

          for (const key of KEYS) {
            const filePath = path.join(folderPath, `${key}.txt`);
            if (info[key] === null) continue;
            await fs.writeFile(filePath, info[key].join('\n'));
          }
        }
      },
    })();
    console.log();
  }

  /* Read teacher info from cached files, and generate TF-IDF vector matrix for similarity calculation */
  const indexMaps: Record<string, { [key in Keys]?: SimplifiedIndexMap }> = {};
  const tfidfMatrices: Record<
    string,
    { [key in Keys]?: SparseDataFrame<number> }
  > = {};
  const allDocuments: Record<string, { [key in Keys]?: string[] }> = {};

  // Read indexMaps and tfidfMatrices from cached files
  const folders = (await fs.readdir(DATA_DIR)).filter(
    (name) => name !== DATA_NAME,
  );
  for (const name of folders) {
    const filenames = await fs.readdir(path.join(DATA_DIR, name));
    for (const filename of filenames) {
      if (!filename.endsWith('.txt')) continue;

      const key = filename.split('.', 2)[0] as Keys;
      console.log(`Reading ${name}'s ${key}...`);

      const corpusPathname = path.join(DATA_DIR, name, filename);
      const indexPathname = path.join(DATA_DIR, name, `${key}.index`);

      const indexMap = await getIndexMap(indexPathname, corpusPathname);
      if (!indexMaps[name]) indexMaps[name] = {};
      indexMaps[name][key] = indexMap;

      const tfidfMatrix = loggedGenerateTFIDFVectorMatrix(indexMap);
      if (!tfidfMatrices[name]) tfidfMatrices[name] = {};
      tfidfMatrices[name][key] = tfidfMatrix;

      const documents = await loggedReadDocuments(corpusPathname);
      if (!allDocuments[name]) allDocuments[name] = {};
      allDocuments[name][key] = documents;
    }
    console.log();
  }

  /* Wait for user input and calculate similarities */
  process.stdout.write('\nEnter a sentence to search: ');
  process.stdin.on('data', async (data) => {
    for (const name of folders) {
      for (const key of KEYS) {
        if (!indexMaps[name][key]) continue;

        const indexMap = indexMaps[name][key]!;
        const tfidfMatrix = tfidfMatrices[name][key]!;
        const documents = allDocuments[name][key]!;

        const similarities = calculateSimilaritiesOf(data.toString().trim()).on(
          indexMap,
          tfidfMatrix,
        );

        const similaritiesToShow = similarities.slice(0, 5);
        if (similaritiesToShow.length === 0) continue;

        console.log(`\n${name}'s ${key}:`);
        similaritiesToShow.forEach(([docID, score], index) => {
          console.log(
            `${index + 1}. Similarity: ${score}\n` +
              `   Document ID: ${docID}\n` +
              `   Document: ${documents[docID - 1]}`,
          );
        });
      }
    }

    process.stdout.write('\nEnter a sentence to search: ');
  });
};

await main();
