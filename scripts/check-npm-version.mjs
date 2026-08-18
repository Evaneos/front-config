import { spawnSync } from 'node:child_process';

const MINIMUM_NPM_VERSION = '11.10.0';

// `npm_config_user_agent` is only a fallback: it is inherited from the
// environment, so a nested run reports the outer npm. The `npm` on PATH during
// a lifecycle script is the one actually resolving dependencies.
const readNpmVersion = () => {
    const { status, stdout } = spawnSync('npm', ['--version'], {
        encoding: 'utf8',
        shell: process.platform === 'win32',
    });

    if (status === 0) return stdout.trim();

    const userAgent = process.env.npm_config_user_agent ?? '';
    const [, version] = /(?:^|\s)npm\/(\S+)/.exec(userAgent) ?? [];

    return version;
};

const isOlderThanMinimum = (version) => {
    const parse = (value) => value.split('.').map(Number);
    const [major, minor, patch] = parse(version);
    const [minMajor, minMinor, minPatch] = parse(MINIMUM_NPM_VERSION);

    if (major !== minMajor) return major < minMajor;
    if (minor !== minMinor) return minor < minMinor;

    return patch < minPatch;
};

const version = readNpmVersion();

if (version !== undefined && isOlderThanMinimum(version)) {
    console.error(
        [
            `This repository requires npm >= ${MINIMUM_NPM_VERSION}, but npm ${version} is running.`,
            '',
            'Its .npmrc refuses packages published in the last 7 days (min-release-age),',
            `a supply chain protection that npm < ${MINIMUM_NPM_VERSION} ignores silently.`,
            '',
            'Upgrade with: npm i -g npm@^11.10.0',
        ].join('\n'),
    );
    process.exit(1);
}
