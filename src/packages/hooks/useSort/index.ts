import { isObjectLike } from '../../is/isObjectLike';
import { isFunction } from '../../is/isFunction';
import { isNumeric } from '../../is/isNumber';
import { isString } from '../../is/isString';
import { useMerge } from '../useMerge';

export interface ISort<T> {
  order?: 'dec' | 'asc';
  key?: keyof T;
  compareFn?: (a: T, b: T) => number;
}
export const useSortByKey = <T = any>(data: T[], options?: ISort<T>): T[] => {
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
