/**
 * 判断是否为函数
 * @param value
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 */
export const isFunction = (value: any): value is (...args: any[]) => any => {
  return typeof value === 'function';
};
