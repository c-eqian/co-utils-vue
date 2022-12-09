/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:58:50
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-09 19:10:59
 */
import { isIdCard, isNumber } from '../is';

export interface ICard {
  birth: string;
  gender: string;
}
export const getCardInfo = (card: string): ICard => {
  if (!isIdCard(card)) {
    throw new Error(`${card} 不是正确的15或18位身份证格式`);
  }
  return {
    birth: `${card.substring(6, 10)}-${card.substring(10, 12)}-${card.substring(12, 14)}`,
    gender: parseInt(card.substring(16, 17), 10) % 2 === 1 ? '男' : '女'
  };
};

/**
 * 获取数据的toString类型
 * @param value
 * @returns
 */
export const getTag = <T>(value: T) => {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
};

/**
 * 处理小数点
 * @param value 处理值
 * @param decimals 小数位
 * @returns
 */
export const toFixedFix = (value: number, decimals: number) => {
  return isNumber(value) && isFinite(value)
    ? Math.floor(value * Math.pow(10, Math.abs(decimals))) / Math.pow(10, Math.abs(decimals))
    : value;
};
