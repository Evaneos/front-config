import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "eslint/index": "linting/eslint.config.ts",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  outDir: "./",
});
