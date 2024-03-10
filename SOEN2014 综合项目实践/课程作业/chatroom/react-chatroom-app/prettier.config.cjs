// @ts-check

/** @satisfies {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
};

module.exports = config;
