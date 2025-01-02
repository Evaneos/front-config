const reactPlugin = require("eslint-plugin-react");
const hooksPlugin = require("eslint-plugin-react-hooks");

module.exports = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    rules: {
      "react-hooks/exhaustive-deps": 1,
      "react-hooks/rules-of-hooks": 2,
      "react/display-name": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
    },
  },
];
