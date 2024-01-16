import { isCamelCase } from '../../is/isCamelCase';
/**
 * 驼峰命名转短杆或者下划线命名
 * @param str userName
 * @param mark 默认 '-'
 * @returns user-name
 */
import { useFirstLetterToUpperCase } from '../useFirstLetterToUpperCase';
export const useCamelizeToKebabCase = (str: string, mark: '-' | '_' = '-') => {
  if (!isCamelCase(str)) return str;
  str = useFirstLetterToUpperCase(str);
  const r = str.replace(/[A-Z]/g, item => {
    return mark + item.toLowerCase();
  });
  return r.startsWith(mark) ? r.slice(1) : r;
};
