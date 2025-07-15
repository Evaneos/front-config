export default [
    {
        rules: {
            'no-process-env': 0,
            'prefer-const': 1,
            'prefer-destructuring': 1,
            'prefer-spread': 1,
            'arrow-body-style': 0,
            'react/display-name': 0,
            'react/prop-types': 0,
            'react/react-in-jsx-scope': 0,
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
                                'Please use next-intl instead of react-intl. See official documentation: https://next-intl-docs.vercel.app/ and internal ADR: https://www.notion.so/leather-yard-6b5/ADR-Next-intl-et-internationalisation-d-une-app-Next-17da97006602800bafd9cf4ebdfde508',
                        },
                    ],
                },
            ],
        },
    },
] as const;
