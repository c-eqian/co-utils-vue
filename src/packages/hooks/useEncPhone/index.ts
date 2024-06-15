import { isPhone } from '../../is/isPhone';
/**
 * 手机号脱敏处理
 * @param phone
 * @returns
 * @example
 * ```js
 * useEncPhone(19994402235) // 199****2235
 * // 非身份证 返回自身
 * useEncPhone(199994402) // 199994402
 * ```
 */
export const useEncPhone = (phone: string) => {
  if (!isPhone(phone)) {
    return phone;
  }
  return phone.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');
};
