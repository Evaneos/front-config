# @evaneos/front-config

@evaneos/front-config is the main resource for shared js/ts/tsx linting and config across Evaneos apps.

## Instal

```shell
npm install @evaneos/front-config@latest
```

# Usage

## Eslint

In your `.eslintrc` file, add:

```json
{
  "extends": ["@evaneos/front-config/linting/eslint-config"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```

## TSConfig

In your `tsconfig.json` file, add:

```json
{
  "extends": "@evaneos/front-config/config/tsconfig.json"
}
```

## Prettier

In your `.prettierrc` file add:

```js
module.exports = {
  ...require("@evaneos/front-config/linting/prettier-config.js"),
  semi: false,
};
```
