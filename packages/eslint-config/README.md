# ESLint (and Prettier, and tsconfig) config

This package provides Evaneos's configs for front projects.

-   `.eslintrc` as an extensible shared config
-   `.prettierrc` as an importable/extensible file
-   `.tsconfig` as an extensible shared config

## What it does

This setup lints, and formats, and configures your TypeScript code based on Evaneos' practices. Feel free to override the rules that make sense for you.

## Installing

1.  In your project folder, run:

    ```bash
    npm i -D @evaneos/eslint-config
    npx install-peerdeps --dev @evaneos/eslint-config
    ```

    You will see several dependencies were installed.

2.  Now, create (or update) a `.eslintrc` file with the following content:

    > Don't forget to adapt the `parserOptions.project` if it's different in your project.

    ```json
    {
        "extends": ["@evaneos/eslint-config"],
        "parserOptions": {
            "project": ["./tsconfig.json"]
        }
    }
    ```

    **If you need to extend the configuration with other plugins, make sure that `@evaneos/eslint-config/prettier` is the last item of the array**

    ```json
    {
       "extends": [
          "@evaneos/eslint-config",
          ...,
          "@evaneos/eslint-config/prettier",
       ],
        "parserOptions": {
            "project": ["./tsconfig.json"]
        }
    }
    ```

3.  Add prettier config to your `package.json`

    ```json
    {
        "prettier": "@evaneos/eslint-config/.prettierrc.js"
    }
    ```

    If you want to override it, you'll have to spread the config into a `.prettierrc.js` file instead, eg:

    ```js
    module.exports = {
        ...require('@evaneos/eslint-config/.prettierrc.js'),
        semi: false,
    };
    ```

4.  Create (or update) a `.tsconfig` file with the following content:

    ```json
    {
        "extends": "@evaneos/eslint-config/tsconfig.json",
        "compilerOptions": {},
        "include": ["./src"]
    }
    ```

    You can also set/override any `compilerOptions` you want, as well as change the `include` or any other entry.
