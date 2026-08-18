# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@evaneos/front-config`, a shared configuration package for JavaScript/TypeScript/React projects at Evaneos. It provides:

- ESLint flat config with TypeScript, React, and custom Evaneos rules
- TypeScript configuration
- Prettier configuration

## Key Commands

### Development

- `npm run build` - Build the package using tsup
- `npm run lint:check` - Check linting with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run prettier:check` - Check code formatting
- `npm run prettier:fix` - Fix code formatting

### Testing

- `npm test` - Build + run tests

Fixture-based tests live under `tests/eslint/` — see the header of `tests/eslint/import-order.test.mjs` for the convention. Run them before touching `src/eslint/rules/*.ts`; CI does the same on every PR.

## Architecture

### Build System

- Uses `tsup` to build TypeScript source into both ESM and CommonJS formats
- Source files in `src/eslint/` are built to `eslint/` directory
- Main entry point: `src/eslint/shared.config.ts` → `eslint/index.js` + `eslint/index.mjs`

### ESLint Configuration Structure

- `src/eslint/shared.config.ts` - Main ESLint configuration for export to other projects; resolves types via `process.cwd()`
- `eslint.config.ts` - Root configuration for this repository: imports the shared config but overrides `tsconfigRootDir: './'`. Both are needed — without the override, ESLint treats the shared config as this repository's own primary config
- `src/eslint/rules/override.ts` - Evaneos-specific rule overrides (includes react-intl deprecation warning)
- `src/eslint/rules/react.ts` - React-specific linting rules
- `src/eslint/rules/test.ts` - Testing-specific linting rules

### Local Development Configuration Files

`tsconfig.json`, `eslint.config.ts` and `.prettierrc.js` at the root configure **this repository only** and are not exported. When fixing a TypeScript error, an ESLint issue or any other development problem here, modify those — never the exported configurations.

## Important Notes

### Commit Standards

- Uses conventional commits with custom types defined in `commitlint.config.cjs`
- Supported types: feat, fix, docs, chore, style, refactor, ci, test, revert, fix!, feat!, other
- Commit messages are written in English; the French failure messages come from `commitlint.config.cjs`'s own `function-rules`, and say nothing about the language a commit should be written in

### Custom Rules

- Warns against using `react-intl` (deprecated in favor of `next-intl`)
- Turns off exactly two type-safety rules — `@typescript-eslint/no-unsafe-member-access` and `no-unsafe-assignment`; `recommendedTypeChecked` and `strict` stay on
- React components don't require explicit React import (JSX transform)

### Release Process

- Merging to `main` runs release-please, which opens a release PR; merging **that** PR is what publishes to npm
- `feat` cuts a minor, `fix` a patch, `feat!`/`fix!` a major. No other type is user facing on its own: release-please skips them, logging `No user facing commits found ... - skipping`, and nothing reaches npm
- A `Release-As: X.Y.Z` footer forces a release whatever the type — that is how 5.4.1 shipped a `ci:`-only change
- Which commits release-please reads depends on how the PR is merged, and this repo allows all three strategies: a squash merge collapses the branch into the PR **title**, so that title's type is the only one that counts; a merge commit keeps the individual types