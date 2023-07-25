/**
 * 在这个示例中，pick函数接收一个对象和一个键数组作为参数，返回一个新的对象，该对象只包含指定的键值对。
 * 在实现pick函数时，需要使用泛型来定义参数类型。这里使用了Pick类型来定义函数的返回值类型，以确保返回的对象只包含指定的键值对。
 * 在遍历键数组时，需要注意边界问题。如果对象中不存在指定的键，则需要跳过该键。
 * 同时，需要使用hasOwnProperty方法来确保只遍历对象自身的属性，而不是继承自原型链的属性。
 * 最后，使用reduce方法将遍历得到的键值对添加到新对象中，并将该新对象作为返回值返回。
 * 这样，就使用TypeScript实现了类似于Lodash中pick方法，同时注意了边界问题。
 */

// import { isObjectLike } from '@/packages/is';

/**
 * usePick函数接收一个对象和一个键数组作为参数，返回一个新的对象，该对象只包含指定的键值对
 * @param obj 提取的对象
 * @param keys 需要提取的key-value
 */
export const usePick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, curr) => {
    if (Object.prototype.hasOwnProperty.call(obj, curr)) {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {} as Pick<T, K>);
};
export type PickKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};

// /**
//  * useDeepPick是基于usePick深度函数接收一个对象和一个键数组作为参数，
//  * 返回一个新的对象，该对象只包含指定的键值对
//  * @param obj
//  * @param keys
//  */
// export const useDeepPick = <T, K extends keyof T>(obj: T, keys: K[]): PickKeys<T, K> => {
//   const deepPick = (source: any, pickKeys: K[]): any => {
//     if (Array.isArray(source)) {
//       return source.map(item => deepPick(item, pickKeys));
//     }
//     if (isObjectLike(source)) {
//       const result: any = {};
//       for (const key of pickKeys) {
//         if (source.hasOwnProperty(key)) {
//           result[key] = deepPick(source[key], pickKeys);
//         }
//       }
//       // 处理嵌套对象的属性提取
//       for (const nestedKey in source) {
//         if (!result.hasOwnProperty(nestedKey) && source.hasOwnProperty(nestedKey)) {
//           result[nestedKey] = deepPick(source[nestedKey], pickKeys);
//         }
//       }
//
//       return result;
//     }
//     return source;
//   };
//   return deepPick(obj, keys);
// };
