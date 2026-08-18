// Fixture-based tests for the import/order rule shipped by this package.
//
// Layout:
//   tests/eslint/fixtures/<category>/<scenario>.<type>.tsx
//
// The category subfolder groups tests by intent, and each runner reads
// only its own category — this one reads `import-order/`; add a sibling
// category if you start testing another rule. Within a category, the file
// suffix determines the test type:
//
//   - <name>.valid.tsx              → "this code is already lint-clean".
//                                     Asserts 0 import/order warnings AND
//                                     that autofix doesn't touch it.
//
//   - <name>.before.tsx + .after.tsx → "autofix transforms before into
//                                      after". Asserts `eslint --fix` on
//                                      <name>.before.tsx yields exactly
//                                      <name>.after.tsx.
//
// Adding a case = drop a file (or pair) in the category folder. No code
// change to this runner.
//
// Notes:
//
// - Known autofix limitations are NOT swept under the rug — they live in
//   `fixtures/import-order/incomplete-autofix/`, each as a `.before/.after`
//   pair plus a leading comment block in the file explaining the
//   limitation. See that folder's README.md for the index. The fixtures
//   double as regression alarms: if a future bump of
//   `eslint-plugin-import` removes a limitation, the matching test fails.
//
// - Comments at the top of `.before.tsx` survive autofix unchanged, so
//   they end up identical in `.after.tsx`. Use them to explain the case
//   to whoever reads the fixture.

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

import sharedConfig from '../../eslint/index.mjs';

const FIXTURES_DIR = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'import-order');

const importOrderConfigBlock = sharedConfig.find(
    (block) => block?.rules && block.rules['import/order'],
);
if (!importOrderConfigBlock) {
    throw new Error('Could not locate import/order rule config in built shared config.');
}

const isolatedConfig = [
    {
        files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tseslint.parser,
        },
        plugins: { import: importPlugin },
        rules: { 'import/order': importOrderConfigBlock.rules['import/order'] },
    },
];

const eslintFixer = new ESLint({
    overrideConfigFile: true,
    overrideConfig: isolatedConfig,
    fix: true,
});

async function runEslintFix(code) {
    const [result] = await eslintFixer.lintText(code, { filePath: 'fixture.tsx' });
    return {
        output: result.output ?? code,
        importOrderWarnings: result.messages.filter((m) => m.ruleId === 'import/order'),
    };
}

function listFixtureFiles(rootDir) {
    const result = [];
    function walk(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (entry.isFile() && entry.name.endsWith('.tsx')) result.push(full);
        }
    }
    walk(rootDir);
    return result;
}

const allFiles = listFixtureFiles(FIXTURES_DIR);

const validFiles = allFiles.filter((p) => p.endsWith('.valid.tsx'));
const beforeFiles = allFiles.filter((p) => p.endsWith('.before.tsx'));
const afterFiles = new Set(allFiles.filter((p) => p.endsWith('.after.tsx')));

for (const validFile of validFiles) {
    const id = relative(FIXTURES_DIR, validFile).replace(/\.valid\.tsx$/, '');
    test(`fixture: ${id} — already lint-clean (autofix is a no-op)`, async () => {
        const code = readFileSync(validFile, 'utf8');
        const { output, importOrderWarnings } = await runEslintFix(code);

        assert.equal(
            importOrderWarnings.length,
            0,
            `${id}.valid.tsx must trigger no import/order warnings. Got: ${JSON.stringify(
                importOrderWarnings.map((m) => m.message),
                null,
                2,
            )}`,
        );
        assert.equal(output, code, `autofix must not modify ${id}.valid.tsx`);
    });
}

for (const beforeFile of beforeFiles) {
    const afterFile = beforeFile.replace(/\.before\.tsx$/, '.after.tsx');
    if (!existsSync(afterFile) || !afterFiles.has(afterFile)) {
        throw new Error(
            `Fixture mismatch: ${relative(FIXTURES_DIR, beforeFile)} has no matching .after.tsx`,
        );
    }
    const id = relative(FIXTURES_DIR, beforeFile).replace(/\.before\.tsx$/, '');

    test(`fixture: ${id} — autofix turns .before.tsx into .after.tsx`, async () => {
        const before = readFileSync(beforeFile, 'utf8');
        const after = readFileSync(afterFile, 'utf8');
        const { output } = await runEslintFix(before);

        assert.equal(output, after, `autofixed ${id}.before.tsx does not match ${id}.after.tsx`);
    });
}

// Sanity check: every .after.tsx must have a matching .before.tsx.
for (const afterFile of afterFiles) {
    const beforeFile = afterFile.replace(/\.after\.tsx$/, '.before.tsx');
    if (!existsSync(beforeFile)) {
        throw new Error(
            `Fixture mismatch: ${relative(FIXTURES_DIR, afterFile)} has no matching .before.tsx`,
        );
    }
}

test('import/order — options have the documented shape', () => {
    const [, importOrderOptions] = importOrderConfigBlock.rules['import/order'];

    assert.equal(importOrderOptions.alphabetize?.order, 'asc');
    assert.equal(importOrderOptions['newlines-between'], 'always');
    assert.equal(importOrderOptions.warnOnUnassignedImports, true);

    const cssPathGroup = importOrderOptions.pathGroups.find(
        (g) => g.pattern === '*.{css,scss,sass,less}',
    );
    assert.ok(cssPathGroup, 'matchBase CSS pathGroup is registered');
    assert.equal(cssPathGroup.group, 'object');
    assert.equal(
        cssPathGroup.patternOptions?.matchBase,
        true,
        'matchBase option is enabled so the pattern catches every CSS depth',
    );

    const typeIdx = importOrderOptions.groups.indexOf('type');
    const objectIdx = importOrderOptions.groups.indexOf('object');
    assert.ok(
        typeIdx >= 0 && objectIdx >= 0 && typeIdx < objectIdx,
        'type group must come before object group so type imports sit above the CSS block',
    );
});
