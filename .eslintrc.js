module.exports = {
    plugins: ['react'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        commonjs: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        quotes: [2, 'single', 'avoid-escape'],
        'no-console': 'off',
        semi: [2, 'always'],
        indent: ['error', 2],
        'object-curly-spacing': ['error', 'always'],
        'no-extra-parens': 'error',
        'max-len': ['error', { code: 140 }],
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'block-scoped-var': 'error',
        'no-shadow': 'error',
        'block-spacing': 'error',
        'no-unused-vars': 'off',
        'class-methods-use-this': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
