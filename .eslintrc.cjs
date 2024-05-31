require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * ESLint 설정
 * @see {@link https://eslint.org}
 */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: { ecmaVersion: 'latest' },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        ...require('./eslint/js.cjs'),
        ...require('./eslint/ts.cjs'),
        ...require('./eslint/vue.cjs'),
    },
};
