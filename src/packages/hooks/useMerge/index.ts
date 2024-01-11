import { isObjectLike } from '../../is/isObjectLike';
import { DeepPartial } from '../../helper/utils';

/**
 * useMerge 函数使用了递归的方式，可以深度合并多个对象。
 * 对于相同的键名，后面的对象会覆盖前面的对象。
 * 如果键对应的值是对象，则会递归合并其内部的键值对。
 * 示例中的 target 对象将被修改并返回。
 * @param target
 * @param sources
 */
export const useMerge = <T>(target: T, ...sources: DeepPartial<T>[]): T => {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (source && isObjectLike(source)) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
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
