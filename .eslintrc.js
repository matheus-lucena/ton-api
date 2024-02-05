module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:prettier/recommended',
        'prettier',
        'eslint:recommended'
    ],
    plugins: ['@typescript-eslint', 'jest'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        'no-var': 'error',
        indent: ['error', 2, { SwitchCase: 1 }],
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        "prettier/prettier": ["error", { "singleQuote": true }]
    },
    overrides: [
        {
          files: [
            "**/*.test.ts"
          ],
          env: {
            jest: true // now **/*.test.js files' env has both es6 *and* jest
          },
          // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
          // "extends": ["plugin:jest/recommended"]
          plugins: ["jest"],
          rules: {
            "jest/no-disabled-tests": "warn",
            "jest/no-focused-tests": "error",
            "jest/no-identical-title": "error",
            "jest/prefer-to-have-length": "warn",
            "jest/valid-expect": "error",
            'no-var': 'error',
            indent: ['error', 2, { SwitchCase: 1 }],
            'no-multiple-empty-lines': 'error',
            'prefer-const': 'error',
            "prettier/prettier": ["error", { "singleQuote": true }]
          }
        }
    ],
};  