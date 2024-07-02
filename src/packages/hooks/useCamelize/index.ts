import { useFirstToUpper } from '../useFirstToUpper';
import { isKebabCase } from '../../is/isKebabCase';

/**
 * 短杆拼接转驼峰
 * @param str 字符
 * @param pascal
 * @returns
 * @example
 * ```js
 * useCamelize('name') // name
 * useCamelize('user-name') // userName
 * useCamelize('-user-name') // -user-name
 * useCamelize('user-name', true) // UserName
 * ```
 */
export const useCamelize = (str: string, pascal = false): string => {
  if (!isKebabCase(str)) return str;
  const value = str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  return pascal ? useFirstToUpper(value) : value;
};
