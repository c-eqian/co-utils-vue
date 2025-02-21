import { magicObject } from '../src'
describe('magicObject', () => {
  // 基础空值测试
  test('should return empty object for null/undefined', () => {

    const undefinedResult = magicObject(undefined as any);
    expect(undefinedResult).toEqual({});
    expect(undefinedResult.name).toBeUndefined();
    expect(Object.getPrototypeOf(undefinedResult)).toBeNull();

  });

  // 非空对象测试
  test('should return original object when not nullish', () => {
    const obj = { name: 'test' };
    expect(magicObject(obj)).toBe(obj); // 严格相等测试

    const arr = [1, 2, 3];
    expect(magicObject(arr)).toBe(arr);

    const fn = () => {};
    expect(magicObject(fn)).toBe(fn);
  });


  // 边界条件测试
  test('should handle edge cases', () => {
    // 空对象
    const emptyObj = {};
    expect(magicObject(emptyObj)).toBe(emptyObj);

    // 已有 null 原型的对象
    const nullProtoObj = Object.create(null);
    expect(magicObject(nullProtoObj)).toBe(nullProtoObj);

  });
});
