import type { Config } from 'typescript-eslint';

export default [
    {
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
        },
    },
] satisfies Config;
