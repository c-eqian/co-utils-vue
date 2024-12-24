import { getTag } from '../../helper/getTag';
import { isObjectLike } from '../isObjectLike';
/**
 * 是否是数值类型
 * @param value 校验值
 * @returns Boolean
 */
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]');
};

/**
 * 判断一个字符串是否是数字，包括小数点和其他符号
 * @param value
 * isNumeric('123') //true
 * isNumeric('-45.67'); // 输出: true
 * isNumeric('3.14e-10'); // 输出: true
 * isNumeric('abc'); // 输出: false
 */
export const isNumeric = (value: any): value is number => {
  if (isNumber(value)) return isNumber(value);
  return typeof value !== 'symbol' && /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(value);
};
