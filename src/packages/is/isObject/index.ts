/**
 * 检查是否是一个对象
 * @param value
 *  @example
 *   isObject({}) // true
 *   isObject([1, 2, 3]) // true
 *   isObject(Function) // true
 *   isObject(null) // false
 */
export const isObject = <T = unknown>(value: T) => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};
