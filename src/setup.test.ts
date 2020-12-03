import {buildTestLogger} from './logger';
import {validateEnvironment} from './setup';

it('passes when a binary is found', () =>
  expect(
    validateEnvironment(['node'], buildTestLogger())
  ).resolves.toBeInstanceOf(Array));
it('fails when a binary is missing', () =>
  expect(validateEnvironment(['ghjkhjghjggf'], buildTestLogger())).rejects.toBe(
    'ghjkhjghjggf is required'
  ));
