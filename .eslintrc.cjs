module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/gql/types'],
  rules: {},
}
