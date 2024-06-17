import { useToInteger } from '../src';

describe('测试-useToInteger', () => {
  it(`useToInteger-测试字符串`, () => {
    expect(useToInteger('abc')).toBe(0);
    expect(useToInteger('123.23')).toBe(123);
  });
  it(`useToInteger-测试数值`, () => {
    expect(useToInteger(56.6)).toBe(56);
    expect(useToInteger(56.36)).toBe(56);
  });
});
