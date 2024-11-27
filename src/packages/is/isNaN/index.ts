import { isNumber } from '../isNumber';

/**
 * 判断一个值是否为`NaN`
 * @since v3.1.2
 * @param value
 * @returns {boolean}
 * @example
 * ``` JavaScript
 * isNaN(NaN) // true
 * isNaN(undefined) // false
 * isNaN(1) // false
 * isNaN('1') // false
 * isNaN(new Number(NaN)) // true
 * ```
 */
export function isNaN(value: unknown): boolean {
  return isNumber(value) && value !== +value;
}
