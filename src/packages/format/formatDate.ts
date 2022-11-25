/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-18 11:17:57
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-25 14:40:45
 */

/**
 * 时间日期格式化
 * @param date 1668741829000
 * @param format yyyy-MM-dd
 * @returns 2022-11-18
 */
export const formatDate = (date: number | string | Date, format = 'yyyy-MM-dd'): string => {
  if (!date) return `${date}`;
  // 处理在IOS上对 2022-11-16 20:47:50格式会显示NAN的情况
  const _d = new Date(typeof date === 'string' ? date.replace(/-/, '/') : date);
  if (_d instanceof Date) {
    const dateDict: Record<string, string> = {
      yyyy: `${_d.getFullYear()}`,
      M: `${_d.getMonth() + 1}`,
      d: `${_d.getDate()}`,
      H: `${_d.getHours()}`,
      m: `${_d.getMinutes()}`,
      s: `${_d.getSeconds()}`,
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

/**
 * 计算日期时间与当前日期时间的差值
 * @param date 比较日期时间
 * @param resDefault 当比较时间大于当前时间时，设置的默认返回值，如无设置，默认返回格式化后时间
 * @returns 比较差值时间：几（年、月、天、时、分、秒）前
 */
export const beforeDate = (
  date: number | string | Date,
  resDefault: string | number | null = ''
) => {
  // 获取日期时间戳
  const _date = formatDate(date, 'yyyy/M/dd HH:mm:ss');
  const dateTimeStamp = new Date(_date).getTime();
  // 获取当前时间戳
  const nowTimeStamp = new Date().getTime();
  // 单位换算：
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const weekdays = days * 7;
  const months = days * 30;
  const year = months * 12;
  // 时间间隔（时间戳）
  const timeStamp = nowTimeStamp - dateTimeStamp;
  if (timeStamp < 0) return resDefault ?? _date;
  if (timeStamp / year >= 1) return `${parseInt(`${timeStamp / year}`, 10)}年前`;
  if (timeStamp / months >= 1) return `${parseInt(`${timeStamp / months}`, 10)}月前`;
  if (timeStamp / weekdays >= 1) return `${parseInt(`${timeStamp / weekdays}`, 10)}周前`;
  if (timeStamp / days >= 1) return `${parseInt(`${timeStamp / days}`, 10)}天前`;
  if (timeStamp / hours >= 1) return `${parseInt(`${timeStamp / hours}`, 10)}小时前`;
  if (timeStamp / minutes >= 1) return `${parseInt(`${timeStamp / minutes}`, 10)}分钟前`;
  return `${parseInt(`${timeStamp / seconds}`, 10)}秒前`;
};
