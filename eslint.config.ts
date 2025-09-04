import globals from 'globals';

import sharedConfig from './src/eslint/shared.config';

export default [
    {
        ignores: ['node_modules/**/*', 'eslint/**/*', 'prettier/**/*'],
    },
    {
        files: [
            'src/**/*.ts',
            'src/**/*.tsx',
            '.prettierrc.js',
            'prettier/index.js',
            'tsup.config.ts',
            'eslint.config.ts',
        ],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: './', // Override spécifique à ce repo
            },
        },
    },
    ...sharedConfig.map((config) => ({
        ...config,
        files: config.files || [
            'src/**/*.ts',
            'src/**/*.tsx',
            'types/**/*.d.ts',
            '.prettierrc.js',
            'prettier/index.js',
            'tsup.config.ts',
            'eslint.config.ts',
        ],
    })),
];
