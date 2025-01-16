const testingLibrary = require("eslint-plugin-testing-library");

module.exports = {
  files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  ...testingLibrary.configs["flat/react"],
};
