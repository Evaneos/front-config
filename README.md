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
const evaneosConfig = require('@evaneos/front-config/eslint/index.js');
module.exports = [...evaneosConfig];
```

```mjs
import evaneosConfig from '@evaneos/front-config/eslint/index.mjs';
export default [...evaneosConfig];
```

You may want to turn off the new rules, here is an example from rm

```
import globals from 'globals';
import evaneosConfig from '@evaneos/front-config/eslint/index.mjs';

export default [
    ...evaneosConfig,
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-duplicate-type-constituents': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/await-thenable': 'off',
            '@typescript-eslint/require-await': 'off',
            'no-constant-binary-expression': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'jsx-a11y/alt-text': 'off',
        },
    },
];

```

You may want to lint some files differently, for example if its node or browser or test files, if so you can do like this:

```

{
        files: [
            'webpack.config.dev.js',
            'webpack.config.prod.js',
            'webpack.config.common.js',
            '.jestrc.js',
            '.prettierrc.js',
            'babel.config.js',
            'jest/mediaFileTransformer.js',
            'jest/setup.js',
        ],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
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
    ...require('@evaneos/front-config/prettier/index.js'),
};
```

# Development

## Local Development Files

The following files at the repository root are **only for development experience within this repository** and are **not exported** as part of the package:

- `tsconfig.json` - TypeScript configuration for developing this package
- `eslint.config.ts` - ESLint configuration for linting this repository's source code
- `.prettierrc.js` - Prettier configuration for formatting this repository's code

These files are not included in the published package and should not be used as examples for consuming projects.

# Contribution

Contributing to this repo should be simple.

If you want to add a rule, plugin or anything, make a simple PR that does it, get it reviewed, merge it and then a release PR will automatically appear few minutes after.
Make sure you follow standard commit.
Merge it and it will automatically build and publish.

## Supply chain protection

This repo refuses to install packages published in the last 7 days, via the `min-release-age` directive in `.npmrc`, as a mitigation against npm supply chain attacks (ref INC-227). This delay leaves time for the community and automated scanners to detect and unpublish compromised packages before they reach our install.

The delay is relative to the day you install, so it never expires and needs no maintenance — including when you upgrade dependencies.

`min-release-age` requires **npm >= 11.10.0**; older versions only warn that the directive is unknown and install without any cooldown, dropping the protection. To make that impossible, `.npmrc` also sets `engine-strict=true` while `package.json` declares `engines.npm: ">=11.10.0"`: an install driven by an older npm is aborted with `EBADENGINE` before a single dependency is unpacked, so no lifecycle script of a too-fresh package ever runs. Upgrade with `npm i -g npm@latest`.

For projects consuming the published package, `engines.npm` only produces an `EBADENGINE` **warning**, never a blocked install: `engine-strict` lives in `.npmrc`, which is not published.
