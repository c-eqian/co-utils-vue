/**
 * @Author: 十三
 * @Date: 2024-17-11 05:09:20
 * @email: 2429120006@qq.com
 * @Description: desc
 */

import { isIdCard } from '../../is/isIdCard';
/**
 * 身份证脱敏处理
 * @param card 身份证
 * @returns
 * @example
 * ```js
 * useEncCard('450616199905206666') // 450616****6666
 * // 非身份证 返回自身
 * useEncCard('450616199905') // 450616199905
 * ```
 */
export const useEncCard = (card: string) => {
  if (!isIdCard(card)) {
    return card;
  }
  return card.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2');
};
