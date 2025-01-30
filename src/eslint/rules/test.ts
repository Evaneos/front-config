import testingLibrary from 'eslint-plugin-testing-library';
import pluginJest from 'eslint-plugin-jest';

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
        rules: {
            'jest/no-disabled-tests': 'off',
            'jest/no-focused-tests': 'off',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            '@typescript-eslint/no-require-imports': 'off',
            'jest/valid-expect': 'off',
        },
    } as const,
];
