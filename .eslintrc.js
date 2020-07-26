module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
};
