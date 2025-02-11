/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:58:50
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 17:24:04
 */

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

export type Arrayable<T> = T | T[];
/**
 * 空函数
 */
export type CallbackVoid<T = any> = (...args: T[]) => void;
