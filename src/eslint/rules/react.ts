import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import { Config } from 'typescript-eslint';

export default [
    ...(reactPlugin.configs.flat?.recommended ? [reactPlugin.configs.flat.recommended] : []),
    ...(reactPlugin.configs.flat?.['jsx-runtime'] ? [reactPlugin.configs.flat['jsx-runtime']] : []),
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin,
            'jsx-a11y': jsxA11y,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        rules: {
            ...jsxA11y.flatConfigs.recommended.rules,
        },
        languageOptions: {
            ...jsxA11y.flatConfigs.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
    },
] satisfies Config;
