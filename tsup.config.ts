import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        'eslint/index': 'src/eslint/eslint.config.ts',
    },
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: false,
    outDir: './',
});
