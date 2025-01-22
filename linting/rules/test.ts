import testingLibrary from 'eslint-plugin-testing-library';

export default {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
};
