/**
 * 是否是伪对象
 * @param value 校验值
 * @returns Boolean
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
export const isObjectLike = <T>(value: T) => {
  return typeof value === 'object' && value !== null;
};
