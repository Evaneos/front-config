module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        '@evaneos/eslint-config-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        '@evaneos/eslint-config-base/prettier',
    ],
    settings: {
        'import/extensions': [ '.js', '.jsx', '.css', '.ts', '.tsx' ],
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-unused-vars': [ 'error', { 'ignoreRestSiblings': true } ],
    },
};
