import importPlugin from 'eslint-plugin-import-x';

import type { Config } from 'typescript-eslint';

export default [
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            'no-process-env': 'off',
            'prefer-const': 'warn',
            'prefer-destructuring': 'warn',
            'prefer-spread': 'warn',
            'arrow-body-style': 'off',
            'react/display-name': 'off',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            'no-restricted-imports': [
                'warn',
                {
                    paths: [
                        {
                            name: 'react-intl',
                            message:
                                'Use next-intl instead of react-intl.\nADR: https://next-intl-docs.vercel.app/\nADR: https://www.notion.so/leather-yard-6b5/ADR-Next-intl-et-internationalisation-d-une-app-Next-17da97006602800bafd9cf4ebdfde508',
                        },
                    ],
                },
            ],
            'import/order': [
                'warn',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'parent',
                            position: 'before',
                        },
                        {
                            // matchBase: minimatch's `**/*.{ext}` glob fails to match relative
                            // paths starting with `..` (minimatch treats `..` as a parent-dir
                            // reference, not a path segment). matchBase ignores directories and
                            // matches against the basename, so it catches every `*.css/scss/sass/less`
                            // regardless of path depth (`./`, `../`, `../../`, bare modules, aliases).
                            // nocomment is kept to preserve eslint-plugin-import's default behavior
                            // (patternOptions completely replaces the default `{ nocomment: true }`).
                            pattern: '*.{css,scss,sass,less}',
                            patternOptions: { matchBase: true, nocomment: true },
                            group: 'object',
                        },
                    ],
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'unknown',
                        'parent',
                        'sibling',
                        'index',
                        'type',
                        'object',
                    ],
                    warnOnUnassignedImports: true,
                },
            ],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always', // Ligne vide obligatoire après directive
                    prev: 'directive',
                    next: '*',
                },
                {
                    blankLine: 'never', // Interdire ligne vide entre directives
                    prev: 'directive',
                    next: 'directive',
                },
            ],
        },
    },
] satisfies Config;
