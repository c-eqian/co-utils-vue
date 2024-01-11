import { isObjectLike } from '../../is/isObjectLike';
import { DeepPartial } from '../../helper/utils';

/**
 * 定义了一个 useClearObject 函数，它接收两个参数 data 和 defaultValue，
 * 其中 data 是一个泛型，表示要清空的对象，defaultValue 是一个部分类型 DeepPartial<T>，
 * 它与 data 的类型一致，用于设置每个属性的初始值。
 * 在内部，我们使用之前提到的清空对象的方式来清空 data 对象。
 * 在设置属性的初始值时，使用 defaultValue 对应字段的值来替换原有的属性值。
 * 最后，返回清空后的 data 对象。
 * @param data
 * @param defaultValue
 */
export const useEmptyObject = <T>(data: T, defaultValue?: DeepPartial<T>) => {
  const generateInitialValue = (value: any) => {
    if (typeof value === 'string') {
      return '';
    } else if (typeof value === 'number') {
      return 0;
    } else if (typeof value === 'boolean') {
      return false;
    } else if (Array.isArray(value)) {
      return [];
    } else {
      return null;
    }
  };
  const diffClear = (obj: any, defaultObj: any, visited = new WeakSet()) => {
    if (visited.has(obj)) {
      return data;
    }
    const clearData = {} as T;
    visited.add(obj);
    const keys = Object.keys(obj);
    keys.forEach(key => {
      const value = obj[key];
      if (isObjectLike(value)) {
        clearData[key] = diffClear(value, defaultObj?.[key], visited);
      } else {
        clearData[key] = defaultObj?.[key] ?? generateInitialValue(value);
      }
    });
    return clearData;
  };
  return diffClear(data, defaultValue);
};
