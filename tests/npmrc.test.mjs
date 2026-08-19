// Tests the supply chain policy of `.npmrc` through npm itself, rather than by
// re-reading the file: what matters is the cooldown npm actually enforces.
//
// npm exposes that cooldown in one of two shapes depending on its version:
// either as `min-release-age` (11.17.0), or already resolved into the `before`
// cutoff used when picking versions (11.11.0). Both are accepted here — what is
// asserted is the policy: no package published in the last 7 days.
//
// Neither shape is trustworthy on its own:
//
//   - npm < 11.10.0 echoes `min-release-age = 7` back while ignoring it, so the
//     running npm is checked first — under a version that does not honour the
//     directive, there is no cooldown to assert, only a false green;
//   - a frozen `before=<date>` answers the second shape, so the cutoff is
//     checked against the clock: a relative policy resolves to "now minus 7
//     days" on every run, a frozen date sits at a fixed UTC midnight and drifts
//     away as days pass.
//
// `ignore-scripts` carries neither caveat: it is a long-standing npm option
// that was never renamed nor reshaped across versions, and its effect was
// confirmed behaviourally (with it on, `npm install` no longer generates
// `.husky/_`, proof that no lifecycle script ran). Asking npm for it is enough.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_IN_MS = 5 * 60 * 1000;

const npmConfigGet = (key) => {
    const result = spawnSync('npm', ['config', 'get', key], {
        cwd: repoRoot,
        encoding: 'utf8',
        shell: process.platform === 'win32',
    });

    assert.equal(result.status, 0, result.stderr);

    return result.stdout.trim();
};

const cutoffTracksTheClock = (before) => {
    const cutoff = new Date(before);

    if (Number.isNaN(cutoff.getTime())) return false;

    return Math.abs(Date.now() - DAY_IN_MS * 7 - cutoff.getTime()) < TOLERANCE_IN_MS;
};

const npmVersion = () => {
    const result = spawnSync('npm', ['--version'], {
        cwd: repoRoot,
        encoding: 'utf8',
        shell: process.platform === 'win32',
    });

    assert.equal(result.status, 0, result.stderr);

    return result.stdout.trim();
};

const honoursMinReleaseAge = (version) => {
    const [major, minor] = version.split('.').map(Number);

    return major > 11 || (major === 11 && minor >= 10);
};

test('npm aborts the install when it is too old to honour the cooldown', () => {
    assert.equal(npmConfigGet('engine-strict'), 'true');

    const { engines } = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
    const [, floor] = /^>=\s*(\d+\.\d+\.\d+)$/.exec(engines.npm) ?? [];

    assert.ok(floor !== undefined, `engines.npm must declare a minimum version, got ${engines.npm}`);
    assert.ok(honoursMinReleaseAge(floor), `engines.npm allows npm ${floor}, which ignores min-release-age`);
});

test('npm runs no dependency lifecycle script on install', () => {
    assert.equal(npmConfigGet('ignore-scripts'), 'true');
});

test('npm refuses releases published in the last 7 days, counted from now', () => {
    const version = npmVersion();

    assert.ok(honoursMinReleaseAge(version), `npm ${version} ignores min-release-age: no cooldown is in effect`);

    const minReleaseAge = npmConfigGet('min-release-age');
    const before = npmConfigGet('before');

    assert.ok(
        minReleaseAge === '7' || cutoffTracksTheClock(before),
        `no relative 7-day cooldown in effect (min-release-age: ${minReleaseAge}, before: ${before})`,
    );
});
