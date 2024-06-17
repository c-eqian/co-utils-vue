/**
 * @Author: 十三
 * @Date: 2024-17-11 05:11:16
 * @email: 2429120006@qq.com
 * @Description: desc
 */
import { isNumeric } from '../../is/isNumber';
import { useToFixedFix } from '../useToFixedFix';
/**
 * 转换千分位
 * @param price 金额
 * @param decimals 需要保留小数点 默认2
 * @param separator 千分位符号 默认","
 * @param round 是否四舍五入
 * @returns
 * @example
 * ``` js
 * usePriceToThousand(201314) // 201,314.00
 * // 不保留小数位
 * usePriceToThousand(201314, 0) // 201,314
 * usePriceToThousand(201314.1314, 0) // 201,314
 * // 四舍五入 并保留2位小数
 * usePriceToThousand(201314.5354, 2) // 201,314.54
 * usePriceToThousand(201314.5354, 2, ',', false) // 201,314.53
 * usePriceToThousand(201314.36568, Infinity, '-', false) // 201-314.36
 * usePriceToThousand('tt201314.36568', 3, '-', false) // 00.00
 * ```
 */
export const usePriceToThousand = (
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
