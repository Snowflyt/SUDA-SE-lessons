/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
};

module.exports = config;
