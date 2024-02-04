module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:prettier/recommended',
        'prettier',
        'eslint:recommended'
    ],
    plugins: ['@typescript-eslint'],
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
};  