const commitTypes = [
    'feat',
    'fix',
    'docs',
    'chore',
    'style',
    'refactor',
    'ci',
    'test',
    'revert',
    'fix!',
    'feat!',
    'other',
];

module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: ['commitlint-plugin-function-rules'],
    rules: {
        'type-enum': [2, 'always', commitTypes],
        'subject-full-stop': [0, 'never'],
        'type-empty': [0, 'never'],
        'subject-empty': [0, 'never'],
        'function-rules/type-empty': [
            2,
            'always',
            (parsed) => {
                const isValid = Boolean(parsed.type);
                const message = `Type de commit requis, par exemple : ${commitTypes.join(
                    ', '
                )}`;
                return [isValid, message];
            },
        ],
        'function-rules/subject-empty': [
            2,
            'never',
            (parsed) => {
                const isValid = Boolean(parsed.subject);
                return [isValid, 'Le message de commit ne peut pas être vide.'];
            },
        ],
    },
};