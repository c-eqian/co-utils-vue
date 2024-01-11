/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:58:50
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 17:24:04
 */
/**
 * 短杆拼接转驼峰
 * @param str
 * @returns
 * test-icon => testIcon
 */
export const camelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};

/**
 * 驼峰命名转短杆或者下划线命名
 * @param str userName
 * @param mark 默认 '-'
 * @returns user-name
 */
export const camelizeToKebabCase = (str: string, mark: '-' | '_' = '-') => {
  str = firstLetterToLowerCase(str);
  return str.replace(/[A-Z]/g, item => {
    return mark + item.toLowerCase();
  });
};
/**
 * 首字母转大写
 * @param str
 * @returns
 */
export function firstLetterToUpperCase(str: string): string {
  return str.replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase());
}
/**
 * 首字母大写转小写
 * @param str
 * @returns
 */
export function firstLetterToLowerCase(str: string): string {
  return str.replace(/^[A-z]/, firstLetter => firstLetter.toLowerCase());
}

/**
 * 处理小数点
 * @param value 处理值
 * @param decimals 小数位
 * @param round 是否四舍五入
 * @returns
 */

/***
 * 将数值转换为整数
 * @param value
 */
export const toInteger = (value: number | string) => {
  const result = +value;
  const remainder = result % 1;
  return remainder ? result - remainder : result;
};
/**
 * 剔除某些属性，然后返回一个新类型
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * 选取指定一组属性，返回一个新的类型定义
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * 将类型中所有选项变为可选
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * 将类型中所有选项变为必选
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * 从T中剔除可以赋值给U的类型
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * 提取T中可以赋值给U的类型
 */
export type Extract<T, U> = T extends U ? T : never;

/**
 * 将 K 中的所有属性值都转换为 T 类型，并返回新的对象类型
 */
export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * 深度递归对象变为可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
