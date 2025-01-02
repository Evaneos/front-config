// @ts-check

const eslintConfigPrettier = require("eslint-config-prettier");

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");

const reactLint = require("./rules/react");
const testLint = require("./rules/test");
const evaneosOverrides = require("./rules/override");

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  eslintConfigPrettier,
  testLint,
  // @ts-expect-error
  ...reactLint,
  // custom evaneos rules
  ...evaneosOverrides
);
