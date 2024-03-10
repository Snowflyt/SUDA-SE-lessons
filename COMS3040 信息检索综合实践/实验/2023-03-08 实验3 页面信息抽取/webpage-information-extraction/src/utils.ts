import * as cheerio from 'cheerio';

/**
 * Extract text from node.
 * @param $
 * @param node
 * @returns
 */
export const extractText = (
  $: cheerio.CheerioAPI,
  node: cheerio.AnyNode,
): string => {
  if (node.type === 'tag' && node.name === 'br') {
    return '\n';
  } else if (node.type === 'text') {
    if (/^\s+$/.test(node.data)) {
      return '';
    }
    return `${node.data.replace(/^\n+/, '').replace(/\n/g, ' ')}${
      node.data.at(-1) === '\n' ? '\n' : ''
    }`;
  } else {
    return $(node)
      .contents()
      .map((_, el) => extractText($, el))
      .get()
      .join('');
  }
};
