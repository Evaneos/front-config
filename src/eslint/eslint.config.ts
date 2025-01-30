import eslintConfigPrettier from 'eslint-config-prettier';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import reactLint from './rules/react';
import testLint from './rules/test';
import evaneosOverrides from './rules/override';

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
    // custom evaneos rules
    ...evaneosOverrides,
);
