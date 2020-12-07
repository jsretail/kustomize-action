import {buildTestLogger} from './logger';
import {Settings} from './setup';

it('logs normally', () => {
  const warnings = [] as string[];
  const errors = [] as string[];
  const logger = buildTestLogger(
    getSettings(false, undefined),
    undefined,
    warnings,
    errors
  );
  const foo = 'foo';
  logger.warn(foo);
  expect(errors).not.toContain(foo);
  expect(warnings).toContain(foo);
});

it('logs warnings as errors', () => {
  const warnings = [] as string[];
  const errors = [] as string[];
  const logger = buildTestLogger(
    getSettings(true, undefined),
    undefined,
    warnings,
    errors
  );
  const foo = 'foo';
  logger.warn(foo);
  expect(errors).toContain(foo);
  expect(warnings).not.toContain(foo);
});

it('ignores errors', () => {
  const logs = [] as string[];
  const warnings = [] as string[];
  const errors = [] as string[];
  let logger = buildTestLogger(
    getSettings(true, new RegExp('foo|bar')),
    logs,
    warnings,
    errors
  );
  logger.warn('foo');
  logger.error('bar');
  expect(errors).toHaveLength(0);
  expect(warnings).toHaveLength(0);
  expect(logs).toHaveLength(2);
  logger.error('baz');
  expect(errors).toContain('baz');
  expect(logs).toHaveLength(2);
  logger = buildTestLogger(
    getSettings(false, new RegExp('foo|bar')),
    logs,
    warnings,
    errors
  );
  logger.warn('foo');
  expect(warnings).toHaveLength(0);
  expect(logs).toHaveLength(3);
});

const getSettings = (
  reportWarningsAsErrors: boolean,
  ignoreWarningsErrorsRegex: RegExp | undefined
): Settings => ({
  kustomizePath: '',
  allowedSecrets: [],
  verbose: true,
  outputActions: [],
  extraResources: [],
  customValidation: [],
  requiredBins: [],
  kustomizeArgs: '',
  validateWithKubeVal: true,
  reportWarningsAsErrors: reportWarningsAsErrors,
  ignoreWarningsErrorsRegex: ignoreWarningsErrorsRegex
});
