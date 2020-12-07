import * as core from '@actions/core';
import {defaultKustomizeArgs, Settings} from './setup';

export interface Logger {
  log: (msg: string) => void;
  warn: (msg: string | Error) => void;
  error: (msg: string | Error) => void;
}

export const buildActionLogger = (settings: Settings): Logger =>
  setupLogger(
    {
      log: (msg: string) => core.info(msg),
      warn: (msg: string | Error) => core.warning(msg),
      error: (msg: string | Error) => core.error(msg)
    },
    settings
  );

export const buildConsoleLogger = (settings: Settings): Logger =>
  setupLogger(
    {
      log: (msg: string) => console.log(msg),
      warn: (msg: string | Error) => console.warn(msg),
      error: (msg: string | Error) => console.error(msg)
    },
    settings
  );

export const buildTestLogger = (
  settings?: Settings,
  logs?: string[],
  warnings?: (string | Error)[],
  errors?: (string | Error)[]
): Logger =>
  setupLogger(
    {
      log: (msg: string) => logs?.push(msg),
      warn: (msg: string | Error) => warnings?.push(msg),
      error: (msg: string | Error) => errors?.push(msg)
    },
    settings || {
      kustomizePath: '',
      allowedSecrets: [],
      verbose: true,
      outputActions: [],
      extraResources: [],
      customValidation: [],
      requiredBins: [],
      kustomizeArgs: defaultKustomizeArgs,
      validateWithKubeVal: true,
      reportWarningsAsErrors: false,
      ignoreErrorsRegex: undefined
    }
  );

const setupLogger = (logger: Logger, settings: Settings): Logger => {
  const logError = (msg: string | Error) => {
    if (
      !settings.ignoreErrorsRegex ||
      !settings.ignoreErrorsRegex.test(msg.toString())
    ) {
      logger.error(msg);
    } else {
      logger.log('Suppressed error: ' + msg);
    }
  };
  return {
    log: (msg: string) => logger.log(msg),
    warn: (msg: string | Error) =>
      settings.reportWarningsAsErrors ? logError(msg) : logger.warn(msg),
    error: (msg: string | Error) => logError(msg)
  };
};
