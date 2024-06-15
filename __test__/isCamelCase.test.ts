import { isCamelCase } from '../src';

describe('isCamelCase', () => {
  it(`isCamelCase`, () => {
    expect(isCamelCase('abc')).toBeTruthy();
    expect(isCamelCase('abc-d')).toBeFalsy();
  });
});
