/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:58:50
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-19 21:08:03
 */
import { isIdCard } from '../reg';

export interface ICard {
  birth: string;
  gender: string;
}
export const getCardInfo = (card: string): ICard => {
  if (!isIdCard(card)) {
    throw new Error(`${card} 不是正确的15或18位身份证格式`);
  }
  return {
    birth: `${card.substring(6, 10)}-${card.substring(10, 12)}-${card.substring(12, 14)}`,
    gender: parseInt(card.substring(16, 17), 10) % 2 === 1 ? '男' : '女'
  };
};
