import { isObjectLike } from '../../is/isObjectLike';
import { isFunction } from '../../is/isFunction';
import { isNumeric } from '../../is/isNumber';
import { isString } from '../../is/isString';
import { useMerge } from '../useMerge';

export interface ISort<T> {
  /**
   * 排序方式
   * @default dec
   */
  order?: 'dec' | 'asc';
  /**
   * 需要排序的键，如果数据是一个对象的情况下使用指定键
   */
  key?: keyof T;
  /**
   * 自定义排序，同sort一致
   * @param a
   * @param b
   */
  compareFn?: (a: T, b: T) => number;
}

/**
 * 数据排序
 * @param data
 * @param options
 * @example
 * ``` js
 * // 排序数组
 * useSort([4, 8, 3, 4, 5, 7, 9, 40, 520], {
 *         order: 'dec'
 *       }) // [520, 40, 9, 8, 7, 5, 4, 4, 3]
 * useSort([4, 8, 3, 4, 5, 7, 9, 40, 520], {
 *         order: 'asc'
 *       }) // [3, 4, 4, 5, 7, 8, 9, 40, 520]
 * // 排序对象数组
 *       useSort(
 *         [
 *           {
 *             name: '2',
 *             age: 19
 *           },
 *           {
 *             name: '1',
 *             age: 18
 *           }
 *         ],
 *         {
 *           order: 'dec',
 *           key: 'age'
 *         }
 *       ) // [
 *       //{
 *        // name: '2',
 *        // age: 19
 *      // },
 *      // {
 *      //   name: '1',
 *       //  age: 18
 *      // }
 *    // ]
 * ```
 */
export const useSort = <T = any>(data: T[], options?: ISort<T>): T[] => {
  const DEFAULT: ISort<T> = {
    order: 'dec'
  };
  const _options: ISort<T> = useMerge(DEFAULT, options || {});
  return data.sort((a, b) => {
    if (isFunction(options?.compareFn)) {
      return _options.compareFn ? _options?.compareFn(a, b) : 0;
    }
    const _a = isObjectLike(a) ? a[_options.key!] : a;
    const _b = isObjectLike(b) ? b[_options.key!] : b;
    if (isNumeric(_a) && isNumeric(_b)) {
      return _options.order === 'asc' ? +_a - +_b : +_b - +_a;
    }
    if (isString(_a) && isString(_b)) {
      return _options.order === 'asc'
        ? (_a as string).localeCompare(_b as string)
        : (_b as string).localeCompare(_a as string);
    }
    return 0;
  });
};
