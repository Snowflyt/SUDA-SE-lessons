module.exports = {
  root: true,
  extends: [
    'standard-with-typescript',
    'eslint-config-prettier',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'no-shadow': 'off',
        'no-undef': 'off'
      }
    }
  ],
  rules: {
    'comma-dangle': [2, 'never'],
    semi: [2, 'never']
  }
}
