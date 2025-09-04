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

No test suite is configured in this project.

## Architecture

### Build System

- Uses `tsup` to build TypeScript source into both ESM and CommonJS formats
- Source files in `src/eslint/` are built to `eslint/` directory
- Main entry point: `src/eslint/shared.config.ts` → `eslint/index.js` + `eslint/index.mjs`

### ESLint Configuration Structure

- `src/eslint/shared.config.ts` - Main ESLint configuration for export to other projects
- `eslint.config.ts` - Root configuration specific to this repository (overrides `tsconfigRootDir`)
- `src/eslint/rules/override.ts` - Evaneos-specific rule overrides (includes react-intl deprecation warning)
- `src/eslint/rules/react.ts` - React-specific linting rules
- `src/eslint/rules/test.ts` - Testing-specific linting rules

### Local Development Configuration Files

The following files at the repository root are **only for development of this repository** and are **not exported**:

- `tsconfig.json` - TypeScript configuration for this repository (extends `./config/tsconfig.json`)
- `eslint.config.ts` - ESLint configuration for linting this repository's code
- `.prettierrc.js` - Prettier configuration for formatting this repository's code

**Important**: When fixing TypeScript errors, ESLint issues, or other development problems in this repository, these are the configuration files to modify, not the exported configurations.

### Configuration Exports

- ESLint: Exports flat config array from `eslint/index.js|mjs`
- TypeScript: Exports base config from `config/tsconfig.json`
- Prettier: Exports config from `prettier/index.js`

## Important Notes

### Dual ESLint Configuration

This repository uses a unique dual configuration approach:
- `src/eslint/shared.config.ts` - Clean config exported as a library using `process.cwd()`
- `eslint.config.ts` - Repository-specific config that imports shared config but overrides `tsconfigRootDir: './'`

This solves the issue where ESLint treats the shared config as the primary config for this repository.

### Commit Standards

- Uses conventional commits with custom types defined in `commitlint.config.cjs`
- Supported types: feat, fix, docs, chore, style, refactor, ci, test, revert, fix!, feat!, other
- Commit messages are validated in French

### Custom Rules

- Warns against using `react-intl` (deprecated in favor of `next-intl`)
- Disables strict TypeScript safety rules for easier migration
- React components don't require explicit React import (JSX transform)

### Release Process

- Automated release PRs are created after merging changes
- Uses semantic versioning and conventional commits for release automation