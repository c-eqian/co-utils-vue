import { isNaN } from '../src';
describe('isNaN', () => {
  it('测试 isNaN', () => {
    expect(isNaN(null)).toBeFalsy();
    expect(isNaN('')).toBeFalsy();
    expect(isNaN({})).toBeFalsy();
    expect(isNaN([])).toBeFalsy();
    expect(isNaN('1')).toBeFalsy();
    expect(isNaN(1)).toBeFalsy();
    expect(isNaN(NaN)).toBeTruthy();
    expect(isNaN(new Number(NaN))).toBeTruthy();
  });
});
