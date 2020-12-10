import * as core from '@actions/core';
import {defaultKustomizeArgs, Settings} from './setup';

export interface Logger {
  log: (msg: string) => void;
  warn: (msg: string | Error) => void;
  error: (msg: string | Error) => void;
}

const logPossError = (
  msg: string | Error,
  fn: (msg: string | Error) => void
) => {
  fn((<Error>msg).message ? (<Error>msg).message : msg);
  if (msg instanceof Error) {
    console.trace();
  }
};
export const buildActionLogger = (settings: Settings): Logger =>
  setupLogger(
    {
      log: (msg: string) => core.info(msg),
      warn: (msg: string | Error) => logPossError(msg, core.warning),
      error: (msg: string | Error) => logPossError(msg, core.error)
    },
    settings
  );

export const buildConsoleLogger = (settings: Settings): Logger =>
  setupLogger(
    {
      log: (msg: string) => console.log(msg),
      warn: (msg: string | Error) => logPossError(msg, console.warn),
      error: (msg: string | Error) => logPossError(msg, console.error)
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
  const previousMessages = new Set() as Set<string>;
  const possSuppressed = (
    msg: string | Error,
    fLog: (msg: string | Error) => void
  ) => {
    const key = msg + '_' + fLog.name;
    if (
      !previousMessages.has(key) &&
      (!settings.ignoreWarningsErrorsRegex ||
        !settings.ignoreWarningsErrorsRegex.test(msg.toString()))
    ) {
      previousMessages.add(key);
      fLog(msg);
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
