import {execFile} from 'child_process';
import * as core from '@actions/core';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import YAML from 'yaml';
import {Logger} from './logger';
import {Settings} from './setup';
import {aggregateCount} from './utils';

const osTmpDir = process.env['RUNNER_TEMP'] || tmp.tmpdir;

const runKustomize = async (
  rootPath: string,
  settings: Settings,
  logger: Logger,
  binPath?: string
) =>
  new Promise<{stdOut: string; stdErr: string}>((res, rej) => {
    const args = ['build', rootPath, ...settings.kustomizeArgs.split(/\ +/g)];
    logger.log('Running: ' + [binPath || 'kustomize', ...args].join(' '));
    execFile(
      binPath || 'kustomize',
      args,
      {maxBuffer: 1024 * 1024 * 1024 * 10}, // If the YAML is bigger than this then we should probably write to disk
      (err, stdOut, stdErr) => {
        if (settings.verbose) {
          core.startGroup('STDOUT');
          logger.log(stdOut);
          core.endGroup();
          core.startGroup('STDERR');
          logger.log(stdErr);
          core.endGroup();
        }
        if (stdErr && stdErr.length) {
          aggregateCount(stdErr.split(/\n/g)).forEach(logger.warn);
        }
        if (err) {
          logger.error(err);
          return rej({err, stdOut, stdErr});
        }
        res({stdOut, stdErr});
      }
    );
  });

const prepDirectory = async (
  rootPath: string,
  extraResources: string[] = []
): Promise<{dir: string; cleanUp: () => void}> => {
  await validatePaths(rootPath, extraResources);
  const {dir, cleanUp} = await new Promise<{dir: string; cleanUp: () => void}>(
    (res, rej) =>
      tmp.dir({tmpdir: osTmpDir, unsafeCleanup: true}, (err, dir, cleanUp) =>
        err ? rej(err) : res({dir, cleanUp})
      )
  );

  await Promise.all([
    ...referenceFiles(dir, rootPath, extraResources),
    createKustomization(dir, extraResources)
  ]);
  return {dir, cleanUp};
};

const validatePaths = async (rootPath: string, extraResources: string[]) => {
  const stats = await fs.promises.stat(rootPath);
  if (!stats.isDirectory()) {
    throw new Error(rootPath + ' is not a directory');
  }
  await Promise.all(
    extraResources.map(p =>
      fs.promises.stat(p).then(stats => {
        if (stats.isDirectory()) {
          throw new Error(p + ' is a directory');
        }
      })
    )
  );
};

const referenceFiles = (
  dir: string,
  rootPath: string,
  extraResources: string[]
) =>
  extraResources
    .map(p => fs.promises.copyFile(p, path.join(dir, path.basename(p))))
    .concat(fs.promises.symlink(rootPath, path.join(dir, 'root')));

const createKustomization = (dir: string, extraResources: string[]) =>
  fs.promises.writeFile(
    path.join(dir, 'kustomization.yaml'),
    `
bases:
- root
resources:
${extraResources.map(p => '- ' + path.basename(p)).join('\n')}
`
  );

export default async (
  settings: Settings,
  logger: Logger,
  binPath?: string
): Promise<{docs: YAML.Document.Parsed[]; warnings: string[]}> => {
  const {dir: tmpPath, cleanUp} = await prepDirectory(
    settings.kustomizePath,
    settings.extraResources
  );
  const {stdOut, stdErr} = await runKustomize(
    tmpPath,
    settings,
    logger,
    binPath
  );
  cleanUp();
  const warnings = stdErr.split(/\n/g).filter(l => l.length > 0);
  return {docs: YAML.parseAllDocuments(stdOut, {prettyErrors: true}), warnings};
};
