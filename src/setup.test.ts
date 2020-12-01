import {validateEnvironment} from './setup';
describe('validateEnvironment', () => {
  it('passes when a binary is found', () =>
    expect(validateEnvironment(['node'])).resolves.toBeInstanceOf(Array));
  it('fails when a binary is missing', () =>
    expect(validateEnvironment(['ghjkhjghjggf'])).rejects.toBe(
      'ghjkhjghjggf is required'
    ));
});
