/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:45:42
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-09 13:40:42
 */

import { getTag } from '@/packages/helper';
/**
 * 校验身份证
 * @param card 身份证
 * @returns boolean
 */
export const isIdCard = (card: string): boolean => {
  return /^[1-9]\d{5}(19|20)\d{2}((0[1-9]|1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    card
  );
};

/**
 * 是否是伪对象
 * @param value 校验值
 * @returns Boolean
 */
export const isObjectLike = <T>(value: T) => {
  return typeof value === 'object' && value !== null;
};

/**
 * 是否是数值类型
 * @param value 校验值
 * @returns Boolean
 */
export const isNumber = <T>(value: T): boolean => {
  return typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]');
};
