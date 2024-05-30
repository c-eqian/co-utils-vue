/**
 * 判断一个值是否是数组
 * @param value
 * @return boolean
 * @example
 * isArray(null)
 * // false
 * isArray([])
 * // true
 */
export const isArray = (value: any): value is Array<any> => {
  return value && Array.isArray(value);
};
