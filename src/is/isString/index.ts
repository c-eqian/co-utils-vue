import { getTag } from '../../helper/getTag';
import { isArray } from '../isArray';

/**
 * 判断一个值是否是字符串
 * @param value
 * @return boolean
 */
export const isString = (value: any): value is string => {
  const type = typeof value;
  return (
    type === 'string' ||
    (type === 'object' && value !== null && !isArray(value) && getTag(value) === '[object String]')
  );
};
