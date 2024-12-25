import { isObject } from '../src';
describe('isObject', () => {
  it('测试 isObject', () => {
    expect(isObject(null)).toBeFalsy();
    expect(isObject('')).toBeFalsy();
    expect(isObject('1')).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject({})).toBeTruthy();
    expect(isObject([])).toBeTruthy();
    expect(isObject(Function)).toBeTruthy();
    expect(isObject(Object.create(null))).toBeTruthy();
  });
});
