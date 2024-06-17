import { isNumeric } from '../../is/isNumber';

/***
 * 将数值转换为整数
 * @param value
 * @example
 * ``` js
 * // 非数值 返回0
 * useToInteger('abc') // 0
 * // 数值
 * useToInteger('123.23') // 123
 * useToInteger(56.6) // 56
 * useToInteger(56.36) // 56
 * ```
 */
export const useToInteger = (value: number | string) => {
  if (!isNumeric(value)) return 0;
  const result = +value;
  const remainder = result % 1;
  return remainder ? result - remainder : result;
};
