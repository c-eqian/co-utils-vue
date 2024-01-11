/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-09 13:21:18
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-09 19:41:00
 */

import { isNumeric } from '../is';
import { useToFixedFix } from '@/packages/hooks/use-fixed';

/**
 * 金额转换千分位
 * @param price 金额
 * @param decimals 需要保留小数点 默认2
 * @param separator 千分位符号 默认","
 * @param round 是否四舍五入
 * @returns
 */
export const formatPriceToThousand = (
  price: string | number,
  decimals = 2,
  separator = ',',
  round = true
) => {
  // 是否是原始数值类型，isFinite处理Infinity、NaN
  if (isNumeric(+price) && isFinite(+price)) {
    // 校验decimals
    if (!(isNumeric(decimals) && isFinite(decimals))) {
      decimals = 2;
    }
    // 处理小数
    let _price = `${useToFixedFix(+price, decimals, round)}`.split('.');
    const re = /(-?\d+)(\d{3})/;
    while (re.test(_price[0])) {
      _price[0] = _price[0].replace(re, '$1' + separator + '$2');
    }
    // 处理小数不满足指定位数时
    if ((_price[1] || '').length < Math.abs(decimals)) {
      _price[1] = _price[1] || '';
      _price[1] += new Array(Math.abs(decimals) - _price[1].length + 1).join('0');
    }
    return _price.join('.');
  }
  return '00.00';
};
