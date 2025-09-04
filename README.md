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

# Contribution

Contributing to this repo should be simple.

If you want to add a rule, plugin or anything, make a simple PR that does it, get it reviewed, merge it and then a release PR will automatically appear few minutes after.
Make sure you follow standard commit.
Merge it and it will automatically build and publish.
