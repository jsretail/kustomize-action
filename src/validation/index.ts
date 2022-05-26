import tmp from 'tmp';
import {execFile} from 'child_process';
import fs from 'fs';
import {Logger} from '../logger';
import server from './server';
import { aggregateCount } from '../utils';

const osTmpDir = process.env['RUNNER_TEMP'] || tmp.tmpdir;

const runKubeVal = (
  path: string,
  port: number,
  logger: Logger,
  kubeValBin?: string,
  kubernetesVersion?: string
) =>
  new Promise<{stdOut: string; stdErr: string}>((res, rej) => {

    const kubeValArgs = [
      '--strict',
      '--schema-location', 'http://localhost:' + port,
      path]

    if (kubernetesVersion) {
      kubeValArgs.push('--kubernetes-version', kubernetesVersion)
    }

    execFile(
      kubeValBin || 'kubeval',
      kubeValArgs,
      (err, stdOut, stdErr) => {
        logger.log(stdOut);
        if (stdErr && stdErr.length) {
          logger.warn(stdErr);
        }
        if (err) {
          return rej({err, stdOut, stdErr});
        }
        res({stdOut, stdErr});
      }
    );
  });

const getErrors = (text: string) =>
aggregateCount(text
    .split(/\n/g)
    .map(line => (line.match(/^(WARN|ERR)\s/) ? line : undefined))
    .filter(err => err && err.length > 0) as string[]);

const main = async (
  yaml: string,
  logger: Logger,
  {
    kubeValBin,
    kubernetesVersion,
    schemaLocation
  }: { kubeValBin?: string, kubernetesVersion?: string, schemaLocation?: string } = {}
): Promise<string[]> => {
  const port = 1025 + (Math.floor(Math.random() * 100000) % (65535 - 1025));
  const stop = await server.start(port, schemaLocation);
  const {name: tmpYaml} = tmp.fileSync({tmpdir:osTmpDir});
  await fs.promises.writeFile(tmpYaml, yaml);
  let retVal;
  try {
    retVal = await runKubeVal(tmpYaml, port, logger, kubeValBin, kubernetesVersion);
  } catch (errData) {
    if (errData instanceof Error) {
      logger.warn(errData);
      throw errData;
    }
    retVal = errData;
  }
  await stop();
  const {stdOut, stdErr, err} = retVal;
  const errors = getErrors(stdOut + '\n' + stdErr);

  errors.forEach(logger.warn);
  if (err) {
    logger.error(err);
    if (errors.length === 0) {
      throw err;
    }
  }

  return errors;
};

export default main;
