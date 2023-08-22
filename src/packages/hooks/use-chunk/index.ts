import { isNumeric, toInteger } from '@/packages';

/**
 * 将数组数据进行分片
 * @param value
 * @param size
 */
export const useChunk = <T>(value: T[], size = 1) => {
  if (size === 1 / 0 || size === -1 / 0) {
    size = size === 1 / 0 ? 1 : -1;
  }
  if (!Array.isArray(value) || !isNumeric(size))
    // 如果传入的不是一个数组，或者size不是一个有效数值则返回空数组
    return [] as T[];
  // 处理size
  const _size = toInteger(+size);
  if (Math.max(_size, 0) < 1) return [] as T[];
  /**
   * 小知识点：
   * new Array(2) => [[],[]]
   * new Array(2, 3) => [[2,3]
   * Math.ceil 去掉小数部分向上取整
   * Math.floor 去掉小数部分向下取整
   * Math.round 去四舍五入
   */
  // 根据数组长度和size的比较进行计算需要分几个二维数组
  const result: T[][] = new Array(Math.ceil(value.length / size));
  let index = 0;
  let resIndex = 0;
  while (index < value.length) {
    result[resIndex++] = value.slice(index, (index += size));
  }
  return result;
};
