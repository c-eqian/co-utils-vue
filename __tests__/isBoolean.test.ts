import { isBoolean } from '../src';
describe('isBoolean', () => {
  it('测试 isBoolean', () => {
    expect(isBoolean(null)).toBeFalsy();
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
    expect(isBoolean('1')).toBeFalsy();
    expect(isBoolean(1)).toBeFalsy();
    expect(isBoolean(false)).toBeTruthy();
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(Boolean(false))).toBeTruthy();
  });
});
