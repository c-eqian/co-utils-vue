/**
 *
 * @param price 格式化目标数字
 * @param decimal 保留几位小数，默认2位
 * @param split 千分位分隔符，默认为,
 * @returns
 */
export const formatPrice = (price: number, decimal = 2, split = ',') => {
  if (isFinite(price)) {
    // num是数字
    if (price === 0) {
      // 为0
      return price.toFixed(decimal);
    } else {
      // 非0
      let res = '';
      let dotIndex = String(price).indexOf('.');
      if (dotIndex === -1) {
        // 整数
        res =
          String(price).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + '.' + '0'.repeat(decimal);
      } else {
        // 非整数
        // js四舍五入 Math.round()：正数时4舍5入，负数时5舍6入
        // Math.round(1.5) = 2
        // Math.round(-1.5) = -1
        // Math.round(-1.6) = -2
        // 保留decimals位小数
        const numStr = String(
          (Math.round(price * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)
        ); // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1); // 截取小数位
        res =
          String(numStr.slice(0, dotIndex)).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) +
          decimals;
      }
      return res;
    }
  } else {
    return '--';
  }
};
