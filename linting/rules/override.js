module.exports = [
  {
    rules: {
      "import/no-default-export": 2,
      "import/newline-after-import": 1,
      "import/no-duplicates": 2,
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "no-process-env": 0,
      "prefer-const": 1,
      "prefer-destructuring": 1,
      "prefer-spread": 1,
      "arrow-body-style": 0,
    },
  },
];
