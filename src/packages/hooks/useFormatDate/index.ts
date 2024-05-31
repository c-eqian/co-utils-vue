/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-18 11:17:57
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-23 14:28:40
 */

/**
 * 时间日期格式化
 * @param date 1668741829000
 * @param format yyyy-MM-dd
 * @returns 2022-11-18
 */
export const useFormatDate = (date: number | string | Date, format = 'yyyy-MM-dd'): string => {
  if (!date) return `${date}`;
  let _d: Date;
  // 处理带有时间的日期字符串
  if (typeof date === 'string') {
    const match = date.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}):(\d{4})/);
    if (match) {
      const [, year, month, day, hours, minutes, seconds, millisecond] = match;
      _d = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds),
        Number(millisecond)
      );
    } else {
      _d = new Date(date);
    }
  } else {
    _d = new Date(date);
  }
  const dateDict: Record<string, string> = {
    yyyy: `${_d.getFullYear()}`,
    yy: `${_d.getFullYear() % 100}`,
    YYYY: `${_d.getFullYear()}`,
    YY: `${_d.getFullYear() % 100}`,
    M: `${_d.getMonth() + 1}`,
    d: `${_d.getDate()}`,
    H: `${_d.getHours()}`,
    m: `${_d.getMinutes()}`,
    s: `${_d.getSeconds()}`,
    MM: `${_d.getMonth() + 101}`.substring(1),
    dd: `${_d.getDate() + 100}`.substring(1),
    HH: `${_d.getHours() + 100}`.substring(1),
    mm: `${_d.getMinutes() + 100}`.substring(1),
    ss: `${_d.getSeconds() + 100}`.substring(1),
    SS: `${_d.getMilliseconds()}`
  };
  return format.replace(/(yyyy|YYYY|YY|yy)|MM?|dd?|HH?|mm?|ss?|SS?/g, (...args) => {
    return dateDict[args[0]];
  });
};
