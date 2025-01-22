import reactPlugin from 'eslint-plugin-react';

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
];
