import { isPhone } from '../../is/isPhone';
/**
 * 手机号脱敏处理
 * @param phone
 * @returns
 */
export const useEncryptedPhone = (phone: string) => {
  if (!isPhone(phone)) {
    return phone;
  }
  return phone.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');
};
