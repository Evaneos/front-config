import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

import evaneosOverrides from './rules/override';
import reactLint from './rules/react';
import testLint from './rules/test';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: process.cwd(),
            },
        },
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    eslintConfigPrettier,
    ...testLint,
    ...reactLint,
    ...evaneosOverrides,
);
