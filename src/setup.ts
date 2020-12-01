import {getBinPath, resolveEnvVars} from './utils';
import core from '@actions/core';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {OutputAction, parseActions} from './outputs';

export const validateEnvironment = async (
  required: string[] = ['kustomize', 'kubeval', 'helm']
): Promise<unknown> =>
  Promise.all(
    required
      .map(
        b =>
          new Promise((res, rej) => {
            getBinPath(b).then(path => {
              if (path) {
                res(undefined);
              } else {
                rej(b + ' is required');
              }
            });
          })
      )
      .concat(createKustomizeFolder())
  );
export const createKustomizeFolder = () =>
  new Promise<void>(r => {
    let dir;
    if (process.env['KUSTOMIZE_PLUGIN_HOME']) {
      dir = process.env['KUSTOMIZE_PLUGIN_HOME'];
    } else if (process.env['XDG_CONFIG_HOME']) {
      dir = path.join(process.env['XDG_CONFIG_HOME'], 'kustomize', 'plugin');
    } else {
      dir = path.join(
        process.env['XDG_CONFIG_HOME'] || '~',
        'kustomize',
        'plugin'
      );
    }
    fs.promises.mkdir(dir, {recursive: true}).finally(r);
  });

export type Settings = {
  kustomizePath: string;
  allowedSecrets: {namespace: string; name: string}[];
  verbose: boolean;
  outputActions: OutputAction[];
  extraResources: string[];
  shouldDeploy: boolean;
  requiredBins: string[];
  //environment: string; //TODO: I think that this has basically been replaced by kustomizePath and outputPath?
  //token: string;//TODO: Required? Only if running outside of github
  //sessionSeed: string | undefined; //TODO: Set up seperately in workflow
  //TODO: Setup seperately in workflow
  // azure: {
  //   tenantId: string;
  //   clientId: string;
  //   clientSecret: string;
  // };
};

export const parseAllowedSecrets = (secretString: string) =>
  secretString
    .split(/,/g)
    .filter(i => i.indexOf('/') > -1)
    .map(i => ({namespace: i.split(/\//)[0], name: i.split(/\//)[1]}));

export const getSettings = (isAction: boolean): Settings => {
  if (!isAction) {
    dotenv.config();
  }
  const getRequiredFromEnv = (name: string) => {
    const val = process.env[name];
    if (val === undefined) {
      throw new Error(`${name} is required`);
    }
    return val;
  };
  const getFromEnv = (name: string) => process.env[name];
  const getSetting = (
    actionSettingName: string,
    envVarName: string,
    required = false
  ) =>
    isAction
      ? core.getInput(actionSettingName, {required: required})
      : (required ? getRequiredFromEnv : getFromEnv)(envVarName);

  const kustomizePath = getSetting('kustomize-path', 'KUSTOMIZE_PATH', true);
  const outputActions = getSetting('output-actions', 'OUTPUT_ACTIONS', true);
  const extraResources = getSetting('extra-resources', 'EXTRA_RESOURCES');
  const shouldDeploy = getSetting('should-deploy', 'SHOULD_DEPLOY', true);
  const allowedSecrets = getSetting('allowed-secrets', 'ALLOWED_SECRETS');
  const requiredBins = getSetting('required-bins', 'REQUIRED_BINS');
  const verbose = getSetting('verbose', 'VERBOSE');
  
  const getPath = (p: string) =>
    path.isAbsolute(p) ? p : path.join(__dirname, p);

  const defaultActions = `[
      { type: "LoggerOutputAction", logErrors: true, logYaml: false },
      {
        type: "VariableOutputAction",
        outputVariableName: "output",
        errorsVariableName: "errors",
      }
    ]
    `;
  return {
    kustomizePath: getPath(resolveEnvVars(kustomizePath || '.')),
    outputActions: parseActions(outputActions || defaultActions),
    extraResources: extraResources
      ? resolveEnvVars(extraResources).split(',').map(getPath)
      : [],
    shouldDeploy: resolveEnvVars(shouldDeploy).toLowerCase() === 'true',
    allowedSecrets: parseAllowedSecrets(resolveEnvVars(allowedSecrets || '')),
    verbose: resolveEnvVars(verbose || '').toLowerCase() === 'true',
    requiredBins: requiredBins
      ? resolveEnvVars(requiredBins).split(/,/g)
      : ['kustomize', 'kubeval', 'helm']
  };
};

const statFile = async (p: fs.PathLike) =>
  fs.promises.stat(p).then(r => {
    if (!r.isFile()) {
      throw new Error(p + ' is not a file');
    }
  });

const statDir = async (p: fs.PathLike) =>
  fs.promises.stat(p).then(r => {
    if (!r.isDirectory()) {
      throw new Error(p + ' is not a directory');
    }
  });

export const validateSettings = (settings: Settings) =>
  Promise.all([
    statDir(settings.kustomizePath).then(() =>
      statFile(path.join(settings.kustomizePath, 'kustomization.yaml'))
    ),
    ...(settings.extraResources || []).map(statFile)
  ]);
