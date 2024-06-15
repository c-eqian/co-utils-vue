import { isNumeric } from '../../is/isNumber';
import { useToInteger } from '../useToInteger';
import { isArray } from '../../is/isArray';

/**
 * 将数组数据进行分片
 * @param value
 * @param size
 * @example
 * ```js
 * useChunk(['a', 'b', 'c', 'd'], 3) // [['a', 'b', 'c'], ['d']]
 * useChunk(['a', 'b', 'c', 'd'], 0) // [];
 * useChunk(['a', 'b', 'c', 'd'], -1) // [];
 * useChunk(['a', 'b', 'c', 'd'], -1 / 0) // [];
 * useChunk(['a', 'b', 'c', 'd'], 3.5) // [['a', 'b', 'c'], ['d']];
 * useChunk(['a', 'b', 'c', 'd'], 1 / 0) // [['a'], ['b'], ['c'], ['d']];
 * ```
 */
export const useChunk = <T = any>(value: T[], size = 1) => {
  if (!isArray(value)) return [];
  if (size === 1 / 0 || size === -1 / 0) {
    size = size === 1 / 0 ? 1 : -1;
  }
  if (!Array.isArray(value) || !isNumeric(size))
    // 如果传入的不是一个数组，或者size不是一个有效数值则返回空数组
    return [] as T[];
  // 处理size
  const _size = useToInteger(+size);
  if (Math.max(_size, 0) < 1) return [] as T[];
  // 根据数组长度和size的比较进行计算需要分几个二维数组
  const result: T[][] = new Array(Math.ceil(value.length / size));
  let index = 0;
  let resIndex = 0;
  while (index < value.length) {
    result[resIndex++] = value.slice(index, (index += size));
  }
  return result;
};
