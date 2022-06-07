module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        require.resolve('./rules/override'),
        require.resolve('./rules/react'),
        require.resolve('./rules/style'),
        require.resolve('./rules/prettier'),
    ],
};
