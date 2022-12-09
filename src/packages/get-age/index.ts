/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:50:26
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-19 21:38:42
 */
import { isIdCard } from '../is';
import { getCardInfo } from '../helper';
import { formatDate } from '../format/formatDate';

/**
 * 计算年龄
 * @param birth 出生日期或身份证
 * @returns 年龄
 */
export const getAge = (birth: string) => {
  // 判断是否是身份证格式
  if (isIdCard(birth)) {
    birth = getCardInfo(birth).birth;
  }
  // 格式统一转换，1999/05/20
  const birthArr = formatDate(birth, 'yyyy/MM/dd').split('/');
  const [birthYear, birthMonth, birthDay] = birthArr;
  // 获取当前日期
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  // 同一年，0
  if (`${nowYear}` === birthYear) return 0;
  // 年差值
  const year = nowYear - parseInt(birthYear, 10);
  if (year > 0) {
    if (`${nowMonth}` === birthMonth) {
      return nowDay - parseInt(birthDay, 10) < 0 ? year - 1 : year;
    }
    return nowMonth - parseInt(birthMonth, 10) < 0 ? year - 1 : year;
  }
  // 格式错误或出生日期晚于当前时间
  return -1;
};
