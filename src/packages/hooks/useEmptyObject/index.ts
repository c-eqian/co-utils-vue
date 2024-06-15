import { isObjectLike } from '../../is/isObjectLike';
import { isArray } from '../../is/isArray';
import { DeepPartial } from '../../helper/utils';

/**
 * 根据数据类型返回清空后的数据对象
 * @param data
 * @param defaultValue 需要设置的默认值
 * @example
 * ```js
 *   const data = {
 *     key: '8899797',
 *     nested: {
 *       ll: '123',
 *       deep: {
 *         nestedKey: 'nestedValue'
 *       }
 *     }
 *   };
 *   const emptyValue = useEmptyObject(data)
 *  // const emptyValue = {
 *    //  key: '',
 *   //   nested: {
 *     //   ll: '',
 *     //   deep: {
 *     //     nestedKey: ''
 *     //   }
 *   //   }
 *  //  };
 * ```
 */
export const useEmptyObject = <T>(data: T, defaultValue?: DeepPartial<T>) => {
  const generateInitialValue = (value: any) => {
    if (typeof value === 'string') {
      return '';
    } else if (typeof value === 'number') {
      return 0;
    } else if (typeof value === 'boolean') {
      return false;
    } else if (isArray(value)) {
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
