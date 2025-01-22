import globals from 'globals';
import evaneosEslintConfig from './linting/eslint.config';
export default [
    {
        ignores: ['./node_modules/**/*', 'eslint/*', './*.cjs'],
    },
    {
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
    },
    ...evaneosEslintConfig,
];
