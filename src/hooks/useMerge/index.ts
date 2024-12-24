import { isObjectLike } from '../../is/isObjectLike';
import type { DeepPartial } from '../../helper';

/**
 * useMerge 深度合并多个对象。
 * @param target
 * @param sources
 */
export const useMerge = <T>(target: T, ...sources: DeepPartial<T>[]): T => {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (source && isObjectLike(source)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (source[key] && isObjectLike(source[key]) && !Array.isArray(source[key])) {
          if (!target[key] || !isObjectLike(target[key])) {
            target[key] = {} as any;
          }
          useMerge(target[key as any], source[key as any]);
        } else {
          target[key as any] = source[key as keyof typeof source];
        }
      }
    }
  }
  return useMerge(target, ...sources);
};
