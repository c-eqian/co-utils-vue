/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-23 13:35:33
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-23 14:15:07
 */
import { isIdCard, isPhone } from '../is';

/**
 * 身份证脱敏处理
 * @param idCard 身份证
 * @returns '450616199905206666'-> '450616****6666'
 */
export const desIdCard = (idCard: string) => {
  if (!isIdCard(idCard)) {
    throw new Error(`${idCard} is invalid idCard`);
  }
  return idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2');
};
/**
 * 手机号脱敏处理
 * @param phone
 * @returns
 */
export const desPhone = (phone: string) => {
  if (!isPhone(phone)) {
    throw new Error(`${phone} is invalid phone number`);
  }
  return phone.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');
};
