import { isObjectLike } from '@/packages/is';

export type ObjectType<T = any> = {
  [key: string | number]: T | ObjectType<T>;
};

/**
 * useMerge 函数使用了递归的方式，可以深度合并多个对象。
 * 对于相同的键名，后面的对象会覆盖前面的对象。
 * 如果键对应的值是对象，则会递归合并其内部的键值对。
 * 示例中的 target 对象将被修改并返回。
 * @param target
 * @param sources
 */
export const useMerge = <T>(target: T, ...sources: T[]): T => {
  for (const source of sources) {
    for (const key in source) {
      if (isObjectLike(source[key]) && isObjectLike(target[key])) {
        useMerge(target[key], source[key]);
      } else {
        target[key as keyof typeof target] = source[key];
      }
    }
  }
  return target;
};
