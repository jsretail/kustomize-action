import fs from 'fs';
import path from 'path';
import {execSync} from 'child_process';
import tmp = require('tmp');
import YAML from 'yaml';
import kustomize from './kustomize';
import {getBinPath} from './utils';
import {buildTestLogger, Logger} from './logger';
import {createKustomizeFolder, defaultKustomizeArgs, Settings} from './setup';

let tmpDir: string, kPath: string | undefined;
let cleanup: (() => void)[] = [];
const cleanUpGetName = (toCleanup: tmp.FileResult | tmp.DirResult): string => {
  cleanup.push(toCleanup.removeCallback);
  return toCleanup.name;
};
const getSettings = (
  kustomizePath: string,
  extraResources: string[],
  kustomizeArgs: string
): Settings => ({
  kustomizePath,
  allowedSecrets: [],
  verbose: true,
  outputActions: [],
  extraResources,
  customValidation: [],
  requiredBins: [],
  kustomizeArgs,
  validateWithKubeVal: true,
  reportWarningsAsErrors: false,
  ignoreWarningsErrorsRegex: undefined
});

let logger: Logger, loggerErrors: (string | Error)[];
beforeEach(() => {
  loggerErrors = [];
  logger = buildTestLogger(undefined, [], [], loggerErrors);
});
afterAll(() => cleanup.forEach(f => f()));

beforeAll(async () => {
  await createKustomizeFolder();
  tmpDir = cleanUpGetName(tmp.dirSync({unsafeCleanup: true}));
  kPath = await getBinPath('kustomize');
  if (!kPath) {
    downloadKustomizeBin(tmpDir);
    kPath = path.join(tmpDir, 'kustomize');
  }
  createTestData(tmpDir);
});

test('throws on error', async () => {
  const handleError = (p: any) => {
    expect(p).toBeDefined();
    expect(loggerErrors).not.toHaveLength(0);
  };
  await kustomize(
    getSettings(tmpDir, [], defaultKustomizeArgs),
    logger,
    'dukhsdkjsdhkj'
  ).catch(handleError);
  await kustomize(
    getSettings('this is invalid', [], defaultKustomizeArgs),
    logger,
    kPath
  ).catch(handleError);
  await kustomize(
    getSettings(
      cleanUpGetName(tmp.dirSync({unsafeCleanup: true})),
      [],
      defaultKustomizeArgs
    ),
    logger,
    kPath
  ).catch(handleError);
  await kustomize(
    getSettings(tmpDir, ['/IDontExist'], defaultKustomizeArgs),
    logger,
    kPath
  ).catch(handleError);
  expect.assertions(8);
});

test('outputs warnings', async () => {
  const tmpScript = tmp.fileSync({mode: 0o744, discardDescriptor: true});
  fs.writeFileSync(
    tmpScript.name,
    '#!/bin/sh\nprintf "warning\\nwarning!!" >&2;'
  );
  const output = await kustomize(
    getSettings(tmpDir, [], defaultKustomizeArgs),
    logger,
    tmpScript.name
  );
  expect(output.warnings).toEqual(['warning', 'warning!!']);
  tmpScript.removeCallback();
});

test('outputs yaml', async () => {
  const output = await kustomize(
    getSettings(tmpDir, [], defaultKustomizeArgs),
    logger,
    kPath
  );
  expect(output.docs.map(d => d.toJSON())).toEqual([
    YAML.parseDocument(getNsYaml('a')).toJSON(),
    YAML.parseDocument(getNsYaml('b')).toJSON()
  ]);
  expect(loggerErrors).toHaveLength(0);
  expect(output.warnings).toHaveLength(0);
});
test('outputs extra resources', async () => {
  const extraResourcePath = cleanUpGetName(tmp.fileSync({postfix: '.yaml'}));
  fs.writeFileSync(extraResourcePath, getNsYaml('c'));
  const output = await kustomize(
    getSettings(tmpDir, [extraResourcePath], defaultKustomizeArgs),
    logger,
    kPath
  );
  expect(output.docs.map(d => d.toJSON())).toEqual([
    YAML.parseDocument(getNsYaml('a')).toJSON(),
    YAML.parseDocument(getNsYaml('b')).toJSON(),
    YAML.parseDocument(getNsYaml('c')).toJSON()
  ]);
  expect(loggerErrors).toHaveLength(0);
  expect(output.warnings).toHaveLength(0);
});

const downloadKustomizeBin = (dir: string) => {
  const url =
    'https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv3.5.4/kustomize_v3.5.4_linux_amd64.tar.gz';
  execSync(`curl -Lo ${dir}/kustomize.tgz '${url}'`);
  execSync(`tar xzf ${dir}/kustomize.tgz -C ${dir}`);
};

function createTestData(dir: string, names: string[] = ['a', 'b']) {
  fs.writeFileSync(
    path.join(dir, '/kustomization.yaml'),
    `resources:\n${names.map(n => `  - ${n}.yaml`).join('\n')}`
  );
  names.forEach(n =>
    fs.writeFileSync(path.join(dir, `${n}.yaml`), getNsYaml(n))
  );
}

function getNsYaml(name: string) {
  return `
apiVersion: v1
kind: Namespace
metadata:
  name: ${name}
`.trim();
}
