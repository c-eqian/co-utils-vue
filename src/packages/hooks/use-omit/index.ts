/**
 * 这里使用了 TypeScript 的一些高级类型特性，如 Pick、Exclude 和 keyof。
 * 通过 Pick<T, K>，我们可以从类型 T 中选取某些属性并组成一个新类型。
 * 而 Exclude<T, U> 可以从类型 T 中排除所有出现在类型 U 中的属性。
 * 最后，keyof T 可以获取类型 T 的所有属性名，这里用于遍历对象的属性。
 * 在实现时，我们首先定义了一个类型 Omit<T, K>，它代表从类型 T 中排除属性集合 K 后的新类型。
 * 接着，我们定义了一个函数 omit，它接受一个对象 obj 和一些需要排除的属性名 keys。
 * 函数内部使用了一个 Partial<T> 类型来定义一个结果对象 result，它初始为空对象。
 * 接着，我们使用一个循环遍历对象的属性，如果当前属性不在排除列表中，则将其添加到结果对象中。最后，我们将结果对象转换成类型 Omit<T, K> 并返回。
 * 需要注意的是，由于 TypeScript 的类型系统并不完美，我们需要在代码中添加一些类型断言来避免一些边界问题。
 * 例如，我们需要将结果对象转换成类型 Omit<T, K>，并且需要将属性名强制转换成泛型参数 K。
 */

/**
 *
 * @param obj
 * @param keys
 */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export const useOmit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  const result: Partial<T> = {};
  const keySet = new Set(keys);
  for (const key in obj) {
    if (!keySet.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result as Omit<T, K>;
};
