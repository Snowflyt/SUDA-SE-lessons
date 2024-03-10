import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const HOME_URL = 'http://nlp.nju.edu.cn/homepage/people.html';

export const getTeacherURLs = async () => {
  const rawHTML = await fetch(HOME_URL).then((res) => res.text());
  const html = rawHTML
    .split('<!--teacher-->', 2)[1]
    .split('<!--PhD student-->', 2)[0];
  const $ = cheerio.load(html);
  return $('h4.pt15.mb10')
    .map((_, elem) => {
      const $elem = $(elem);
      const $a = $elem.find('a');
      const url = $a.attr('href')!;
      const name = $a.text().replaceAll(' ', '');
      return { name, url };
    })
    .toArray()
    .filter(({ url }) => url !== '#');
};

interface ExtractOptions {
  /**
   * The CSS selector used to split sections.
   */
  splitter: string;
  /**
   * Extract the title from the section texts.
   * @param $elem The title element.
   * @param index The index of the element.
   * @returns The title, or `false` to skip this section.
   */
  titleExtractor?: (
    $elem: cheerio.Cheerio<cheerio.AnyNode>,
    index: number,
  ) => string | false;
  /**
   * Process the content of the section.
   * @param title The title of the section.
   * @param $elem The content element.
   * @param splitter The splitter.
   * @param $ The cheerio instance.
   * @param currentURL The URL of the page.
   * @returns The processed content. If it is a promise, it will be awaited.
   */
  contentProcessor?: (
    title: string,
    $elem: cheerio.Cheerio<cheerio.AnyNode>,
    splitter: string,
    $: cheerio.CheerioAPI,
    currentURL: string,
  ) => string[] | Promise<string[]>;
}

/**
 * Extract the information from a teacher's page.
 *
 * @param url The URL of the page.
 * @param options The options.
 */
export const extractPageInfo = async (
  url: string,
  { contentProcessor, splitter, titleExtractor }: ExtractOptions,
) => {
  const html = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(html);

  // Get texts after splitter, and convert to { "<title>": ["<text1>", "<text2>", ...], ... }
  const info: Record<string, string[]> = {};
  const promises = $(splitter)
    .map(async (i, elem) => {
      const $elem = $(elem);
      const title = titleExtractor
        ? titleExtractor($elem, i)
        : $elem.text().trim();
      if (!title) return;
      const text = (
        contentProcessor
          ? await contentProcessor(title, $elem, splitter, $, url)
          : // Get all text before next splitter
            $elem.nextUntil(splitter).text().split('\n')
      )
        .map((line) => line.trim())
        .filter((line) => line);
      info[title] = text;
    })
    .toArray();
  await Promise.all(promises);
  return info;
};

export const extractOptions: Record<string, ExtractOptions | undefined> = {
  陈家骏: {
    splitter:
      'p:has(> strong:has(> span)), p:has(> span:has(> b:has(> strong:has(> span))))',
    titleExtractor: ($elem, i) => {
      if (i < 2) return false;
      const titleMap: Record<string, string | undefined> = {
        教学: 'teaching',
        研究项目: 'projects',
        发表论文: 'publications',
      };
      const rawTitle = $elem
        .find('strong')
        .text()
        .split('：', 2)[0]
        .split(':', 2)[0]
        .trim();
      return titleMap[rawTitle] ?? rawTitle;
    },
    contentProcessor: async (title, $elem, splitter, $, currentURL) => {
      if (title === 'teaching') {
        return $elem
          .nextUntil(splitter)
          .filter('p')
          .map((_, elem) =>
            $(elem)
              .text()
              .trim()
              .replace(/^[0-9]\./, '')
              .trim()
              .replaceAll('\n', ''),
          )
          .get();
      }

      if (title === 'projects' || title === 'publications') {
        const links = $elem
          .next()
          .find(title === 'projects' ? 'li > p > a' : 'li > p > strong > a')
          .map((_, elem) => `${$(elem).text()}|${$(elem).attr('href')}`)
          .toArray()
          .map((t) => ({ name: t.split('|', 2)[0], href: t.split('|', 2)[1] }));
        // Add base URL to relative links
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          if (link.href.startsWith('http')) continue;
          links[i].href = new URL(link.href, currentURL).href;
        }

        const texts = [];
        for (const link of links) {
          const html = await fetch(link.href).then((res) => res.text());
          const $ = cheerio.load(html);

          if (title === 'projects') {
            if (link.name === '自然语言处理') {
              texts.push(
                ...$('table > tbody > tr')
                  .map((_, elem) =>
                    $(elem)
                      .text()
                      .trim()
                      .replaceAll('\n', ',')
                      .replace(/\s+/g, ''),
                  )
                  .get(),
              );
            } else {
              texts.push(
                ...$('ol > li > p')
                  .map((_, elem) =>
                    $(elem)
                      .text()
                      .replaceAll('\n', '')
                      .trim()
                      .replace(/。$/, ''),
                  )
                  .get(),
              );
            }
          }

          if (title === 'publications') {
            if (link.name === '自然语言处理') {
              texts.push(
                ...$('ol')
                  .first()
                  .find('li')
                  .map((_, elem) => $(elem).text())
                  .get(),
              );
            } else {
              texts.push(
                ...$('ol')
                  .first()
                  .find('li > p')
                  .map((_, elem) =>
                    $(elem)
                      .text()
                      .replaceAll('\n', '')
                      .trim()
                      .replace(/\s+/g, ' '),
                  )
                  .get(),
              );
            }
          }
        }

        return texts;
      }

      return $elem.nextUntil(splitter).text().split('\n');
    },
  },

  戴新宇: {
    splitter: 'h3',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        Teaching: 'teaching',
        Projects: 'projects',
        'Recent Selected Publications': 'publications',
      };
      const rawTitle = $elem.text().trim();
      return titleMap[rawTitle] ?? rawTitle;
    },
  },

  黄书剑: {
    splitter: 'h2',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        Courses: 'teaching',
        Projects: 'projects',
        'Selected Publications': 'publications',
      };
      const rawTitle = $elem.text().trim();
      return titleMap[rawTitle] ?? rawTitle;
    },
    contentProcessor: (title, $elem, splitter, $) => {
      if (title === 'teaching')
        return $elem
          .next()
          .find('li > h3')
          .map((_, elem) => $(elem).text().trim().replace(/.$/, ''))
          .get();

      if (title === 'publications')
        return $elem
          .next()
          .next()
          .nextUntil('p:has(> a)')
          .text()
          .replace(/20[0-9][0-9]\n/g, '')
          .split('\n');

      return $elem.nextUntil(splitter).text().split('\n');
    },
  },

  尹存燕: {
    splitter: 'tr:has(> td:has(> p:has(> a:has(> b:has(> span)))))',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        'Selected Publications': 'publications',
      };
      const rawTitle = $elem
        .text()
        .trim()
        .replaceAll('\n', '')
        .replace(/\s+/g, ' ');
      return titleMap[rawTitle] ?? rawTitle;
    },
    contentProcessor: (title, $elem, splitter, $) => {
      if (title === 'publications')
        return $elem
          .next()
          .find('td > p')
          .map((_, elem) => $(elem).text().trim())
          .get()
          .filter((line) => !/^20[0-9][0-9]$/.test(line))
          .map((line) =>
            line
              .replace(/[0-9]+\./, '')
              .trim()
              .replace(/\n\s*/g, ' ')
              .replace(/\s+/g, ' '),
          );

      return $elem.nextUntil(splitter).text().split('\n');
    },
  },

  张建兵: {
    splitter: 'h3',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        Course: 'teaching',
        Publication: 'publications',
      };
      const rawTitle = $elem
        .text()
        .trim()
        .replaceAll('\n', '')
        .replace(/\s+/g, ' ');
      return titleMap[rawTitle] ?? rawTitle;
    },
    contentProcessor: (title, $elem, splitter, $) => {
      if (title === 'teaching')
        return $elem
          .next()
          .find('li')
          .map((_, elem) => $(elem).text().trim())
          .get();

      if (title === 'publications')
        return $elem
          .next()
          .find('li')
          .map((_, elem) => $(elem).text().trim())
          .get()
          .map((line) => line.replace(/\n\s*/g, ' ').replace(/\s+/g, ' '));

      return $elem.nextUntil(splitter).text().split('\n');
    },
  },

  吴震: {
    splitter: 'h2',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        'Selected Publications ([Full List])': 'publications',
      };
      const rawTitle = $elem
        .text()
        .trim()
        .replaceAll('\n', '')
        .replace(/\s+/g, ' ');
      return titleMap[rawTitle] ?? rawTitle;
    },
    contentProcessor: (title, $elem, splitter, $) => {
      if (title === 'publications')
        return $elem
          .next()
          .nextAll()
          .map((_, elem) =>
            $(elem).find('div').first().text().split(' [Paper]', 2)[0].trim(),
          )
          .get()
          .map((line) => line.replace(/\n\s*/g, ' ').replace(/\s+/g, ' '));

      return $elem.nextUntil(splitter).text().split('\n');
    },
  },

  商琳: {
    splitter: '.banner',
    titleExtractor: ($elem) => {
      const titleMap: Record<string, string | undefined> = {
        Teaching: 'teaching',
      };
      const rawTitle = $elem
        .text()
        .trim()
        .replaceAll('\n', '')
        .replace(/\s+/g, ' ');
      return titleMap[rawTitle] ?? rawTitle;
    },
  },
};
