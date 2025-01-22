# @evaneos/front-config

@evaneos/front-config is the main resource for shared js/ts/tsx linting and config across Evaneos apps.

## Install

```shell
npm install @evaneos/front-config@latest
```

# Install

## Eslint flat config

In your `eslint.config.(c|m)js` file, add:

```cjs
const evaneosConfig = require("@evaneos/front-config/eslint/eslint.config.js");
module.export = [...evaneosConfig];
```

```mjs
import evaneosConfig from "@evaneos/front-config/eslint/eslint.config.mjs";
export default [...evaneosConfig];
```

## TSConfig

In your `tsconfig.json` file, add:

```json
{
  "extends": "@evaneos/front-config/config/tsconfig.json"
}
```

## Prettier

In your `.prettierrc.js` file add:

```js
module.exports = {
  ...require("@evaneos/front-config/linting/prettier-config.js"),
};
```

# Contribution

Contributing to this repo should be simple.

If you want to add a rule, plugin or anything, make a simple PR that does it, get it reviewed, merge it and then a release PR will automatically appear few minutes after.
Make sure you follow standard commit.
Merge it and it will automatically build and publish.
