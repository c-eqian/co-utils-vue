import { isCamelCase } from '../../is/isCamelCase';
import { useFirstToUpper } from '../useFirstToUpper';
/**
 * 驼峰命名转短杆或者下划线命名
 * @param str
 * @param mark 默认 '-'
 * @returns
 * @example
 * ```js
 * useCamel2kebab('cName') // c-name
 * useCamel2kebab('userName') // user-name
 * useCamel2kebab('CName') // c-name
 * useCamel2kebab('UserName') // user-name
 * useCamel2kebab('user-name') // user-name
 * useCamel2kebab('userName', '_') // user_name
 * useCamel2kebab('username') // username
 * ```
 */

export const useCamel2kebab = (str: string, mark: '-' | '_' = '-') => {
  if (!isCamelCase(str)) return str;
  str = useFirstToUpper(str);
  const r = str.replace(/[A-Z]/g, item => {
    return mark + item.toLowerCase();
  });
  return r.startsWith(mark) ? r.slice(1) : r;
};
