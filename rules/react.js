module.exports = {
  plugins: ['react-hooks'],
  extends: ['plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.css', '.ts', '.tsx'],
  },
  rules: {
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
  },
};
