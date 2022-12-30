/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-09-24 11:56:13
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-29 09:31:57
 */

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
/**
 * 深拷贝
 * @param source
 * @param hash
 * @returns
 */
export const cloneDeep = <T>(source: T, hash = new WeakMap()): T => {
  // 如果不是引用类型，直接return
  if (typeof source !== 'object' || source === null) return source;
  // 使用hash判断循环引用问题,如果存在，则获取这个值，并返回
  if (hash.has(source)) return hash.get(source);
  // 判断是否是数组
  const target: T = Array.isArray(source) ? ([] as T) : ({} as T);
  // 哈希保存
  hash.set(source, target);
  // 解决Symbol类型
  const symKeys = Object.getOwnPropertySymbols(source);
  // 解决存在Symbol类型
  if (symKeys.length) {
    // 遍历
    symKeys.forEach(symKey => {
      if (isValidKey(symKey, symKeys)) {
        // 再判断是否是引用类型
        if (typeof source[symKey] !== 'object' || source[symKey] === null) {
          target[symKey] = source[symKey];
        } else {
          // 是引用类型，使用递归
          target[symKey] = cloneDeep(source[symKey], hash);
        }
      }
    });
  }
  for (const key in source) {
    // 判断原型上是否存在自身属性
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // 在判断是是引用类型
      if (typeof source[key] === 'object' && source[key] !== null) {
        // 是引用类型-> 递归
        target[key] = cloneDeep(source[key], hash);
      } else {
        // 不是，直接赋值
        target[key] = source[key];
      }
    }
  }
  // 最后返回深拷贝内容
  return target;
};
