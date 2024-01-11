/**
 * @Author: 十三
 * @Date: 2024-17-11 05:09:20
 * @email: 2429120006@qq.com
 * @Description: desc
 */

import { isIdCard } from '../../is/isIdCard';
/**
 * 身份证脱敏处理
 * @param idCard 身份证
 * @returns '450616199905206666'-> '450616****6666'
 */
export const useEncryptedIdCard = (idCard: string) => {
  if (!isIdCard(idCard)) {
    return idCard;
  }
  return idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2');
};
