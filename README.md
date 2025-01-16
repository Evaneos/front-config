# @evaneos/front-config

@evaneos/front-config is the main resource for shared js/ts/tsx linting and config across Evaneos apps.

## Install

```shell
npm install @evaneos/front-config@latest
```

# Usage

## Eslint flat config

In your `eslint.config.js` file, add:

```js
const evaneosConfig = require("@evaneos/front-config/linting/eslint.config.js")
module.export = [
  ...evaneosConfig
  ]
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
};
```
