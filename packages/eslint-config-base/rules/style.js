module.exports = {
    rules: {
        'import/newline-after-import': 1,
        'import/no-duplicates': 2,
        'import/order': [
            'warn',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always-and-inside-groups',
            },
        ],
    },
};
