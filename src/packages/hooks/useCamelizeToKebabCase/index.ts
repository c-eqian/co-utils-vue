/**
 * 驼峰命名转短杆或者下划线命名
 * @param str userName
 * @param mark 默认 '-'
 * @returns user-name
 */
import { useFirstLetterToUpperCase } from '../useFirstLetterToUpperCase';
export const camelizeToKebabCase = (str: string, mark: '-' | '_' = '-') => {
  str = useFirstLetterToUpperCase(str);
  return str.replace(/[A-Z]/g, item => {
    return mark + item.toLowerCase();
  });
};
