# ESLint (and Prettier) config

This package provides Evaneos's configs for front projects.
- [x] .eslintrc as an extensible shared config.
- [ ] .prettierrc
- [ ] .tsconfig

These are settings for ESLint and Prettier used by @evaneos.

## What it does

This setup lints your JavaScript code based on practices. Check the .eslintrc.js file to see what is included. Feel free to override the rules that make sense for you.

## Installing

1. In your project folder, run:
   ```bash
   npm i -D @evaneos/eslint-config
   npx install-peerdeps --dev @evaneos/eslint-config
   ```

2. You will see several dependencies were installed. Now, create (or update) a .eslintrc file with the following content:
   ```
   {
      "extends": [
         "@evaneos"
      ]
   }
   ```

<!-- 3. Copy the .prettierrc file from this repository into your project folder -->

<!-- 4. Copy the .tsconfig file from this repository into your project folder -->