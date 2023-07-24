/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-09-24 11:56:13
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-29 09:31:57
 */

import { isObjectLike } from '@/packages/is';

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
/**
 * 深拷贝
 * @param source
 * @returns
 */
export const cloneDeep = <T>(source: T): T => {
  const diffClone = <T>(_source: T, hash = new WeakMap()) => {
    // 如果不是引用类型，直接return
    if (isObjectLike(_source)) return _source;
    // 使用hash判断循环引用问题,如果存在，则获取这个值，并返回
    if (hash.has(_source as object)) return hash.get(_source as object);
    // 判断是否是数组
    const target: T = Array.isArray(_source) ? ([] as T) : ({} as T);
    // 哈希保存
    hash.set(_source as any, target);
    // 解决Symbol类型
    const symKeys = Object.getOwnPropertySymbols(_source);
    // 解决存在Symbol类型
    if (symKeys.length) {
      // 遍历
      symKeys.forEach(symKey => {
        if (isValidKey(symKey, symKeys)) {
          // 再判断是否是引用类型
          if (!isObjectLike(_source[symKey])) {
            target[symKey] = _source[symKey];
          } else {
            // 是引用类型，使用递归
            target[symKey as any] = diffClone(_source[symKey], hash);
          }
        }
      });
    }
    for (const key in _source) {
      // 判断原型上是否存在自身属性
      if (Object.prototype.hasOwnProperty.call(_source, key)) {
        // 在判断是是引用类型
        if (isObjectLike(_source[key])) {
          // 是引用类型-> 递归
          target[key] = diffClone(_source[key], hash);
        } else {
          // 不是，直接赋值
          target[key] = _source[key];
        }
      }
    }
    // 最后返回深拷贝内容
    return target;
  };
  // 最后返回深拷贝内容
  return diffClone(source);
};
