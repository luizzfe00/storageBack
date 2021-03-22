module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  plugins: [
    'eslint-plugin-import-helpers'
  ],
  extends: [
    'standard',
    'prettier'
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-new': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'no-underscore-dangle': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: [
          'module',
          '/^@server/shared/',
          '/^@/',
          [
            'parent',
            'sibling',
            'index'
          ]
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ]
  }
};
