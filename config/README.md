# tsconfig

This package provides Evaneos's tsconfig for typescript front projects.

-   `.tsconfig` as an extensible shared config

## What it does

This setup configures your TypeScript code based on Evaneos' practices. Feel free to override the rules that make sense for you.

## Installing

1.  In your project folder, run:

    ```bash
    npm i @evaneos/typescript-config
    npx install-peerdeps @evaneos/typescript-config
    ```

    You will see several dependencies were installed.

2.  Create (or update) a `.tsconfig` file with the following content:

    ```json
    {
        "extends": "@evaneos/typescript-config/tsconfig.json",
        "compilerOptions": {},
        "include": ["./src"]
    }
    ```

    You can also set/override any `compilerOptions` you want, as well as change the `include` or any other entry.
