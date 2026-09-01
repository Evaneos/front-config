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

## ESLint 9 or 10

This package supports both. `import/order` is now backed by
[`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), the maintained fork —
`eslint-plugin-import` never shipped an ESLint 10 compatible release and crashes on `import/order`
under it. The plugin stays registered under the `import` key, so **rule ids do not change**: your
`import/order` overrides and your `// eslint-disable-next-line import/order` comments keep working
untouched.

One caveat if you move to ESLint 10: `eslint-plugin-react` and `eslint-plugin-jsx-a11y` still cap
their `eslint` peer at `^9`. They run fine under 10 — only npm's dependency resolution refuses the
install. Until they widen their range, add this to your app's `package.json`:

```json
"overrides": {
    "eslint-plugin-react": { "eslint": "$eslint" },
    "eslint-plugin-jsx-a11y": { "eslint": "$eslint" }
}
```

Remove it once both plugins declare `^10`.

If you set your own `settings['import/...']` — a resolver, `extensions`, `parsers` — rename the key
to `settings['import-x/...']`. `eslint-plugin-import-x` reads its settings from its own namespace,
whatever key the plugin is registered under. This package sets no `import/*` settings itself.

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

The cooldown delays a compromised package's arrival; it does nothing about the moment it arrives anyway. `ignore-scripts=true` narrows what a package can do on arrival: npm no longer runs the `preinstall`, `install` and `postinstall` lifecycle scripts a dependency ships, which is how a poisoned release takes over a machine on a plain `npm install`. No script of this repo can substitute for it: npm runs every dependency lifecycle script before the first root script, so anything written here would only witness a fait accompli. What it closes is the install vector, and only that — a compromised dependency is still executed when its code is imported, as the eslint stack is by `npm run lint:check` and tsup by `npm run build`.

Two things change for developers. `prepare: husky` no longer runs, so a fresh clone starts without the local `commit-msg` hook and a malformed commit message is no longer refused at `git commit` time. It is still caught on every pull request, where CI runs commitlint. If you want the hook back locally, run `npx husky` once in your clone. The `pre*`/`post*` lifecycle scripts of an explicitly run npm script are skipped too: `package.json` declares none today, so nothing is lost, but a `pretest` added later would silently never run.

For projects consuming the published package, `engines.npm` only produces an `EBADENGINE` **warning**, never a blocked install: `engine-strict` lives in `.npmrc`, which is not published.
