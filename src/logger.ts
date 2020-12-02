import * as core from '@actions/core';

export interface Logger {
  log: (msg: string) => void;
  warn: (msg: string | Error) => void;
  error: (msg: string | Error) => void;
}

export const buildActionLogger = (): Logger => ({
  log: (msg: string) => core.info(msg),
  warn: (msg: string | Error) => core.warning(msg),
  error: (msg: string | Error) => core.error(msg)
});

export const buildConsoleLogger = (): Logger => ({
  log: (msg: string) => console.log(msg),
  warn: (msg: string | Error) => console.warn(msg),
  error: (msg: string | Error) => console.error(msg)
});

export const buildTestLogger = (
  logs?: string[],
  warnings?: (string | Error)[],
  errors?: (string | Error)[]
): Logger => ({
  log: (msg: string) => logs?.push(msg),
  warn: (msg: string | Error) => warnings?.push(msg),
  error: (msg: string | Error) => errors?.push(msg)
});
