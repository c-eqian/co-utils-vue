/**
 * 获取数据的toString类型
 * @param value
 * @returns
 */
export const getTag = <T>(value: T) => {
  if (value === null) {
    return '[object Null]';
  }
  return toString.call(value);
};
