# Monorepo for Evaneos's front configs

This monorepo provides 2 packages as Evaneos's configs for front projects.

- [`eslint-config`](packages/eslint-config) for TypeScript projects
- [`eslint-config-base`](packages/eslint-config-base) for JavaScript projects

## What they do

They set up lints, and formats, and configures your TypeScript/JavaScript code based on Evaneos' practices. Feel free to override the rules that make sense for you.

## Installing

Please check either package for detailed README files:
- [How to install `eslint-config`](packages/eslint-config/README.md#installing)
- [How to install `eslint-config-base`](packages/eslint-config-base/README.md#installing)

## How this works

### Eslint

By default, we use `env.brower = true` but you might want to set `env.node = true` if that applies to your situation.

### Prettier

Prettier might be configured at 2 different places (see "How to install"s for details) :
- in the package.json  
  This is the preferred way at it does not contribute to the growing size of root folders in projects.
- in a .prettierrc.js  
  That would allow overriding its rules

To activate prettier on your projects, you just have to set up those configs and activate it in your IDE.  
For example in PHPStorm search for "prettier" and activate the "Automatic Prettier configuration"  

Also, you might want to make it autorun when you save a file.  
For example in PHPStorm search for "prettier" and check "Run on save".

#### Understanding our config

For list and the default values of the available configs, you can refer to [prettier documentation](https://prettier.io/docs/en/options).

We chose to override those :
- tabWidth: 4  
  Makes the code easier to read
- singleQuote: true  
  We think doubleQuote might be (just a bit) better, but it would generate a lot of changes, so not worth it.

### TSconfig

[tsconfig.json](packages/eslint-config/tsconfig.json) is mandatory for a TypeScript project to work.  
Some of its config is project specific, but we can share most ot the `compilerOptions` configs, and so we chose to override some of the defaults :

`compilerOptions.target` is set to `es6` because TSC transpiles poorly to ES5,
so we let TSC transpile to ES6 and Babel transpile from ES6 to the desired target.

`compilerOptions.module` must not be `esnext`: too risky because it means it auto updates to the last version, while `es2020` match our needs.

`compilerOptions.moduleResolution` defaults to `node` if module > `es6` (`es2020` > `es6` so => `node`)

`compilerOptions.jsx` we prefer to specify the import of React package, because it makes the code less dependent on the tooling.

`compilerOptions.useUnknownInCatchVariables` default to `true` because `compilerOptions.strict` is `true` and in JavaScript you can catch any type of variables so the caught variable type is `unknown`.


## Contributing

### Eslint

You have to keep prettier as the last of eslint extensions. Because it must have the last word on automatic code modification (eg: eslint --fix / prettier).  

That is for (at least) 2 reasons :
- Some rules might overlap between eslint and prettier configs (eg: [Arrow Function Parentheses](https://prettier.io/docs/en/options#arrow-function-parentheses))
- Prettier must be the ruler of writing style while eslint is the ruler of semantics and other stuff

```javascript
module.exports = {
    ...,
    extends: [
        'my rules',
        '...',
        'prettier'
    ],
};
```

### Questions / To Discuss

#### Eslint

- `arrow-body-style` rule: do we want to force it or not?
