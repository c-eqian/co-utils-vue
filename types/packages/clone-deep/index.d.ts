/**
 * 如果是基础数据类型，直接return
 * 如果是引用数据类型，处理Object、Array等
 * @param target
 */
export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
/**
 * 深拷贝
 * @param source
 * @param hash
 * @returns
 */
export declare const cloneDeep: <T extends unknown>(source: T, hash?: WeakMap<object, any>) => T;
