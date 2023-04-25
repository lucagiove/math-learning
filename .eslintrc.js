module.exports = {
    env: {
        node: true,
        es2022: true,
    },
    plugins: ['prettier'],
    extends: ['standard-with-typescript', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'prettier/prettier': 'warn',
    },
};
