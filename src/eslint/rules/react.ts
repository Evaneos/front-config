import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
    reactPlugin.configs.flat?.recommended,
    reactPlugin.configs.flat?.['jsx-runtime'],
    {
        rules: {
            'react/display-name': 0,
            'react/prop-types': 0,
            'react/react-in-jsx-scope': 0,
        },
    },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin,
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
        rules: {
            // ... any rules you want
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
        // ... others are omitted for brevity
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            // ... any rules you want
            'jsx-a11y/alt-text': 'error',
        },
        // ... others are omitted for brevity
    },
];
