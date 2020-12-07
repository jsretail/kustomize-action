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
      ignoreWarningsErrorsRegex: undefined
    }
  );

const setupLogger = (logger: Logger, settings: Settings): Logger => {
  const possSuppressed = (
    msg: string | Error,
    log: (msg: string | Error) => void
  ) => {
    if (
      !settings.ignoreWarningsErrorsRegex ||
      !settings.ignoreWarningsErrorsRegex.test(msg.toString())
    ) {
      log(msg);
    } else {
      logger.log('Suppressed: ' + msg);
    }
  };
  return {
    log: (msg: string) => logger.log(msg),
    warn: (msg: string | Error) =>
      settings.reportWarningsAsErrors
        ? possSuppressed(msg, logger.error)
        : possSuppressed(msg, logger.warn),
    error: (msg: string | Error) => possSuppressed(msg, logger.error)
  };
};
