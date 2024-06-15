import { isKebabCase } from '../src';

describe('isKebabCase', () => {
  it(`checks kebab-case correctly`, () => {
    expect(isKebabCase('hello-world')).toBeTruthy();
    expect(isKebabCase('HelloWorld')).toBeFalsy();
    expect(isKebabCase('hello-world_')).toBeFalsy();
    expect(isKebabCase('-hello-world-')).toBeFalsy();
    expect(isKebabCase('hello--world')).toBeFalsy();
    expect(isKebabCase('hello')).toBeTruthy();
  });
});
