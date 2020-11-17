module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  globals: {
    it: true,
    describe: true,
    beforeEach: true,
    afterEach: true,
    before: true,
    after: true,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-shadow': [2, { allow: ['_'] }],
  },
};
