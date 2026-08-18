// Fixture-based tests for the testing-library preset shipped by this package.
//
// What they pin down: *where* the preset applies. `src/eslint/rules/test.ts`
// declares a `files:` glob and then spreads
// `testingLibrary.configs['flat/react']` after it. If a future version of the
// plugin ships its own `files` inside that preset, the spread silently
// overwrites ours and the rules stop covering the intended files — no build
// error, no lint error. These tests are the alarm for exactly that.
//
// Layout:
//   tests/eslint/fixtures/testing-library/<scenario>.violation.tsx
//     → source that must be flagged when linted as a test file, and left
//       alone when linted as an ordinary source file.
//
// The tests read the *built* config (`eslint/index.mjs`), i.e. what consumers
// actually install, and isolate the block carrying the testing-library plugin
// so no type-aware rule needs a real tsconfig.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';

import sharedConfig from '../../eslint/index.mjs';

const FIXTURES_DIR = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'testing-library');

const testingLibraryBlock = sharedConfig.find((block) => block?.plugins?.['testing-library']);
if (!testingLibraryBlock) {
    throw new Error('Could not locate the testing-library config block in the built shared config.');
}

const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
        {
            languageOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                parser: tseslint.parser,
            },
        },
        testingLibraryBlock,
    ],
});

const violation = readFileSync(join(FIXTURES_DIR, 'async-query.violation.tsx'), 'utf8');

async function testingLibraryErrorsFor(filePath) {
    const [result] = await eslint.lintText(violation, { filePath });
    return result.messages.filter((m) => m.ruleId?.startsWith('testing-library/'));
}

const IN_SCOPE_PATHS = [
    'src/__tests__/greeting.tsx',
    'src/__tests__/nested/greeting.tsx',
    'src/greeting.spec.tsx',
    'src/greeting.test.tsx',
    'src/greeting.test.ts',
];

for (const filePath of IN_SCOPE_PATHS) {
    test(`testing-library preset applies to ${filePath}`, async () => {
        const errors = await testingLibraryErrorsFor(filePath);

        assert.ok(
            errors.some((m) => m.ruleId === 'testing-library/await-async-queries'),
            `${filePath} must be covered by the testing-library preset. Reported: ${JSON.stringify(
                errors.map((m) => m.ruleId),
            )}`,
        );
    });
}

const OUT_OF_SCOPE_PATHS = ['src/greeting.tsx', 'src/testing/helpers.ts'];

for (const filePath of OUT_OF_SCOPE_PATHS) {
    test(`testing-library preset does not apply to ${filePath}`, async () => {
        const errors = await testingLibraryErrorsFor(filePath);

        assert.deepEqual(
            errors.map((m) => m.ruleId),
            [],
            `${filePath} is not a test file and must not be subject to testing-library rules.`,
        );
    });
}
