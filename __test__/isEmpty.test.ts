import { isEmpty } from '../src';
describe('test isEmpty', () => {
  it('测试数组-无值', () => {
    expect(isEmpty([])).toBe(true);
  });
  it('测试数组-有值', () => {
    expect(isEmpty([1])).toBe(false);
  });
  it('测试字符串', () => {
    expect(isEmpty('')).toBe(true);
  });
  it('测试 null', () => {
    expect(isEmpty(null)).toBe(true);
  });
  it('测试 undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
  it('测试对象-无值', () => {
    expect(isEmpty({})).toBe(true);
  });
  it('测试对象-有值', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });
  it('测试map-无值', () => {
    expect(isEmpty(new Map())).toBe(true);
  });
  it('测试map-有值', () => {
    expect(isEmpty(new Map().set('a', 1))).toBe(false);
  });
});
