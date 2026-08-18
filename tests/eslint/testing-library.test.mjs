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
//   tests/eslint/fixtures/testing-library/<rule-name>.violation.tsx
//     → source that must be flagged when linted as a test file, and left
//       alone when linted as an ordinary source file. The file name carries
//       the rule the fixture violates: `await-async-queries.violation.tsx`
//       must be reported by `testing-library/await-async-queries`.
//
// Every fixture found in that folder is crossed with every path of the
// in-scope and out-of-scope matrices below, so adding a case = dropping a
// file in the folder. No code change to this runner.
//
// The tests read the *built* config (`eslint/index.mjs`), i.e. what consumers
// actually install, and isolate the block carrying the testing-library plugin
// so no type-aware rule needs a real tsconfig.

import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
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

const VIOLATION_SUFFIX = '.violation.tsx';

const fixtures = readdirSync(FIXTURES_DIR)
    .filter((name) => name.endsWith(VIOLATION_SUFFIX))
    .map((name) => ({
        name,
        expectedRuleId: `testing-library/${name.slice(0, -VIOLATION_SUFFIX.length)}`,
        code: readFileSync(join(FIXTURES_DIR, name), 'utf8'),
    }));

if (fixtures.length === 0) {
    throw new Error(
        `No *${VIOLATION_SUFFIX} fixture found in ${FIXTURES_DIR}. This suite would silently test nothing.`,
    );
}

async function testingLibraryErrorsFor(fixture, filePath) {
    const [result] = await eslint.lintText(fixture.code, { filePath });
    return result.messages.filter((m) => m.ruleId?.startsWith('testing-library/'));
}

const IN_SCOPE_PATHS = [
    'src/__tests__/greeting.tsx',
    'src/__tests__/nested/greeting.tsx',
    'src/greeting.spec.tsx',
    'src/greeting.test.tsx',
    'src/greeting.test.ts',
];

for (const fixture of fixtures) {
    for (const filePath of IN_SCOPE_PATHS) {
        test(`${fixture.name}: testing-library preset applies to ${filePath}`, async () => {
            const errors = await testingLibraryErrorsFor(fixture, filePath);

            assert.ok(
                errors.some((m) => m.ruleId === fixture.expectedRuleId),
                `${filePath} must be covered by the testing-library preset and report ${
                    fixture.expectedRuleId
                }. Reported: ${JSON.stringify(errors.map((m) => m.ruleId))}`,
            );
        });
    }
}

const OUT_OF_SCOPE_PATHS = ['src/greeting.tsx', 'src/testing/helpers.ts'];

for (const fixture of fixtures) {
    for (const filePath of OUT_OF_SCOPE_PATHS) {
        test(`${fixture.name}: testing-library preset does not apply to ${filePath}`, async () => {
            const errors = await testingLibraryErrorsFor(fixture, filePath);

            assert.deepEqual(
                errors.map((m) => m.ruleId),
                [],
                `${filePath} is not a test file and must not be subject to testing-library rules.`,
            );
        });
    }
}
