// Tests for the npm version guard that runs on `npm install` in this repo
// (wired into the `prepare` lifecycle script).
//
// The guard exists because `.npmrc` uses `min-release-age`, a directive that
// npm < 11.10.0 ignores *silently*: the supply chain protection would vanish
// without anyone noticing. The guard turns that silence into a failure.
//
// The script is run as a child process — the way npm runs it — so these tests
// exercise it through its real interface: environment, exit code, stderr. The
// npm under test is a shim on PATH, since the version to detect is precisely
// what the test needs to control.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const script = join(repoRoot, 'scripts', 'check-npm-version.mjs');

const userAgentOf = (version) => `npm/${version} node/v24.19.0 darwin arm64 workspaces/false`;

const withNpmOnPath = (reportedVersion) => {
    const binDir = mkdtempSync(join(tmpdir(), 'front-config-npm-shim-'));
    const shim = join(binDir, 'npm');

    writeFileSync(shim, `#!/bin/sh\necho "${reportedVersion}"\n`);
    chmodSync(shim, 0o755);

    return { PATH: `${binDir}${delimiter}${process.env.PATH}` };
};

const runGuard = (env) =>
    spawnSync(process.execPath, [script], {
        cwd: repoRoot,
        encoding: 'utf8',
        env: { ...process.env, npm_config_user_agent: undefined, ...env },
    });

test('fails when npm is older than 11.10.0', () => {
    const result = runGuard(withNpmOnPath('11.9.0'));

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /npm i -g npm@\^11\.10\.0/);
});

// 11.9.0 rejected above while 11.10.0 passes here: the pair pins semantic
// ordering, which a string comparison would get backwards.
test('passes on the minimum supported npm', () => {
    const result = runGuard(withNpmOnPath('11.10.0'));

    assert.equal(result.status, 0, result.stderr);
});

// `npm_config_user_agent` is inherited from the environment, so a nested run
// (`npx npm@11.9.0 install`) hands the script the *outer* npm version. The npm
// on PATH during a lifecycle script is the one really resolving dependencies.
test('trusts the npm on PATH over an inherited user agent', () => {
    const result = runGuard({ ...withNpmOnPath('11.9.0'), npm_config_user_agent: userAgentOf('11.11.0') });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /npm i -g npm@\^11\.10\.0/);
});

test('falls back to the user agent when npm cannot be run', () => {
    const result = runGuard({ PATH: '', npm_config_user_agent: userAgentOf('11.9.0') });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /npm i -g npm@\^11\.10\.0/);
});

// The guard only protects anyone if npm actually runs it. `prepare` is the one
// lifecycle script that runs on `npm install` here without running for the
// consumers of the published package.
test('is wired into the prepare lifecycle script', () => {
    const { scripts } = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));

    assert.match(scripts.prepare, /scripts\/check-npm-version\.mjs/);
    assert.match(scripts.prepare, /husky/);
});
