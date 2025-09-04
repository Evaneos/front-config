import testingLibrary from 'eslint-plugin-testing-library';
import pluginJest from 'eslint-plugin-jest';
import { Config } from 'typescript-eslint';

export default [
    {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'] as string[],
        ...testingLibrary.configs['flat/react'],
    },
    {
        files: [
            '**/*.test.js',
            '**/*.test.ts',
            '**/*.test.tsx',
            'jest/setup.js',
            'src/shared/utils/env.test.ts',
        ] as string[],
        plugins: { jest: pluginJest },
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
    },
] satisfies Config;
