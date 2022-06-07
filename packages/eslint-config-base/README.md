# ESLint (and Prettier) config

This package provides Evaneos' configs for front projects.

-   `.eslintrc` as an extensible shared config.
-   `.prettierrc` as an importable file

## What it does

This setup lints and formats your JavaScript code based on Evaneos practices. Feel free to override the rules that make sense for you.

## Installing

1.  In your project folder, run:

    ```bash
    npm i -D @evaneos/eslint-config-base
    npx install-peerdeps --dev @evaneos/eslint-config-base
    ```

    You will see several dependencies were installed.

2.  Now, create (or update) a `.eslintrc` file with the following content:

    ```
    {
       "extends": [
          "@evaneos/eslint-config-base"
       ]
    }
    ```

    **If you need to extend the configuration with other plugins, make sure that `eslint-config/prettier` is the last item of the array**

    ```
    {
       "extends": [
          "@evaneos/eslint-config-base",
          ...,
          "@evaneos/eslint-config-base/prettier",
       ]
    }
    ```

3.  Add prettier config to your `package.json`

    ```
    {
       "prettier": "@evaneos/eslint-config-base/.prettierrc.js"
    }
    ```

    If you want to override it, you'll have to spread the config into a `.prettierrc.js` file instead, eg:

    ```js
    module.exports = {
        ...require('@evaneos/eslint-config-base/.prettierrc.js'),
        semi: false,
    };
    ```
