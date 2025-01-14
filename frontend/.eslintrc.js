const fs = require('fs');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:jest-dom/recommended',
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'graphql', 'jest-dom'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaString: fs.readFileSync('./schema.graphql').toString(),
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx}', 'setupTests.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
};
