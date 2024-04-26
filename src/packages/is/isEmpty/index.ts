/**
 * @Author: 十三
 * @Date: 2024/4/9
 * @email: 2429120006@qq.com
 * @Description: 判断值是否为空
 */

import { getTag } from '../../helper/getTag';

/**
 * 判断值是否为空
 * @param value
 */
export const isEmpty = (value: string | object | null) => {
  if (value === null) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !(value as any).size;
  }
  return !Reflect.ownKeys(value).length;
};
