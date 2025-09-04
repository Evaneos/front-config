import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        'eslint/index': 'src/eslint/shared.config.ts',
    },
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: false,
    outDir: './',
});
