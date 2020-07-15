/**
 * To enable .ts files checking in the Virtual Studio Code go to the IDE settings.json,
 * find "eslint.validate" (or create, if there no such property), then add "typescript"
 * value to the proeprty array.
 */
module.exports = {
  env: {
      es6: true,
  },
  extends: [
      // https://www.npmjs.com/package/eslint-config-airbnb-typescript
      'airbnb-typescript/base',
      'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
  },
  plugins: [
      '@typescript-eslint',
  ],
  rules: {},
  overrides: [{
      files: ['**/*.js'],
      env: {
          node: true,
          es6: true,
          browser: true,
      },
      extends: [
          // https://www.npmjs.com/package/eslint-config-airbnb-base
          'airbnb-base',
      ],
      rules: {
          'max-len': ['error', 100, 2, {
              ignoreUrls: true,
              ignoreComments: false,
              ignoreRegExpLiterals: true,
              ignoreStrings: false,
              ignoreTemplateLiterals: true,
          }]
      },
  }],
};
