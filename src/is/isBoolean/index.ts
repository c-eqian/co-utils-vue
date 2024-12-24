import { getTag } from '../../helper/getTag';
import { isObjectLike } from '../isObjectLike';

/**
 * 检查是否为布尔值或对象。
 * @param value
 * @example
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
export const isBoolean = <T = unknown>(value: T) => {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) === '[object Boolean]')
  );
};
