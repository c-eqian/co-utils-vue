/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-18 11:17:57
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-18 18:57:32
 */
/**
 * 时间日期格式化
 * @param date 1668741829000
 * @param format yyyy-MM-dd
 * @returns 2022-11-18
 */
export const formatDate = (date: number | string | Date, format = 'yyyy-MM-dd') => {
  if (!date) return date;
  // 处理在IOS上对 2022-11-16 20:47:50格式会显示NAN的情况
  const _d = new Date(typeof date === 'string' ? date.replace(/-/, '/') : date);
  if (_d instanceof Date) {
    const dateDict = {
      yyyy: _d.getFullYear(),
      M: _d.getMonth() + 1,
      d: _d.getDate(),
      H: _d.getHours(),
      m: _d.getMinutes(),
      s: _d.getSeconds(),
      MM: `${_d.getMonth() + 101}`.substring(1),
      dd: `${_d.getDate() + 100}`.substring(1),
      HH: `${_d.getHours() + 100}`.substring(1),
      mm: `${_d.getMinutes() + 100}`.substring(1),
      ss: `${_d.getSeconds() + 100}`.substring(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, (...args) => {
      return dateDict[args[0]];
    });
  }
  return _d;
};
