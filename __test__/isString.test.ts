import { isString } from '../src';
describe('isString', () => {
  it('测试 isString', () => {
    expect(isString(null)).toBeFalsy();
    expect(isString('')).toBeTruthy();
    expect(isString({})).toBeFalsy();
  });
});
