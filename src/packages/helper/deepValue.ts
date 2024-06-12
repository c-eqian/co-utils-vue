/**
 * 获取对象里深层值
 * @param data 数据对象
 * @param prop 参数键
 * @example
 * ```typescript
 *  const data = {
 *  data: {
 *      a: 'b'
 *      }
 *    }
 *  deepObjectValue(data, 'data.a') // b
 * ```
 */
export const deepObjectValue = <T = object>(data: T, prop: string): any => {
  if (!prop) return prop;
  const keys = prop.split('.');
  const _data = data || {};
  return keys.reduce((obj, k) => (obj || {})[k], _data);
};
