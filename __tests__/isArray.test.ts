import { isArray } from '../src';

describe('isArray', () => {
  it(`false`, () => {
    expect(isArray(null)).toBeFalsy();
  });
  it(`true`, () => {
    expect(isArray([])).toBeTruthy();
  });
});
