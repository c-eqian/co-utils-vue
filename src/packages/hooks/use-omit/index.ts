import { cloneDeep } from '@/packages/clone-deep';
import { isObjectLike } from '@/packages/is';

/**
 * 排除属性
 * @param obj
 * @param keys
 */
export type OmitKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const useOmit = <T extends object, K extends keyof T>(obj: T, keys: K[]): OmitKeys<T, K> => {
  const result: Partial<T> = {};
  const keySet = new Set(keys);
  for (const key in obj) {
    if (!keySet.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result as Omit<T, K>;
};

/**
 * 深度剔除属性
 * @param obj
 * @param keys
 */

export const useDeepOmit = <T, K extends keyof T>(obj: T, keys: K[]): OmitKeys<T, K> => {
  const newObj = cloneDeep(obj);
  const deepOmit = (source: any, omitKeys: K[]) => {
    if (Array.isArray(source)) {
      return source.map(item => deepOmit(item, omitKeys));
    }
    if (isObjectLike(source)) {
      const result: any = {};
      for (const key in source) {
        if (source.hasOwnProperty(key) && !omitKeys.includes(key as K)) {
          result[key] = deepOmit(source[key], omitKeys);
        }
      }
      return result;
    }

    return source;
  };
  return deepOmit(newObj, keys);
};
