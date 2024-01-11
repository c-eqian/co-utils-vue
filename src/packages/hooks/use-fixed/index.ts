import { isNumeric } from '@/packages/is/is-number';

export const useToFixedFix = (value: number, decimals = 2, round = true) => {
  // return isNumber(value) && isFinite(value)
  //   ? Math.floor(value * Math.pow(10, Math.abs(decimals))) / Math.pow(10, Math.abs(decimals))
  //   : value;
  if (!isNumeric(value)) return value;
  const multiplier = 10 ** decimals; // 计算 10 的 decimals 次幂作为倍数
  if (round) {
    // 进行四舍五入，并乘以倍数后再取整，最后再除以倍数来保留指定小数点位数
    return Math.round(value * multiplier) / multiplier;
  } else {
    // 乘以倍数后再取整，最后再除以倍数来保留指定小数点位数
    return Math.floor(value * multiplier) / multiplier;
  }
};
