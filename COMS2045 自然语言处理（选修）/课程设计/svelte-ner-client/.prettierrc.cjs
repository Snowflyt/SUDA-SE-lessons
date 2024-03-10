/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-svelte',
    'prettier-plugin-tailwindcss',
  ],
  pluginSearchDirs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
};
