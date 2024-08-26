/**
 * @Author: 十三
 * @Date: 2024-17-11 05:04:54
 * @email: 2429120006@qq.com
 * @Description: desc
 */
import { useFormatDate } from '../useFormatDate';
/**
 * 计算日期时间与当前日期时间的差值
 * @param date 比较日期时间
 * @param target 与目标时间比较，默认为空，则选取当前时间
 * @param resDefault 当比较时间大于当前时间时，设置的默认返回值，如无设置，默认返回格式化后时间
 * @returns
 * @example
 * ```js
 * useBeforeDate('2023-07-18 19:50:52', '2023-07-25 20:19:52') // 1周前
 * useBeforeDate('2023-07-25 19:50:52', '2023-07-25 21:19:52') // 1小时前
 * useBeforeDate('2023-07-25 20:15:52', '2023-07-25 20:19:52') // 4分钟前
 * useBeforeDate('2023-07-25 20:15:52', '2023-07-25 20:15:55') // 3秒前
 * useBeforeDate('2023-07-25 20:15:58', '2023-07-25 20:15:55', '-') // -
 * ```
 */
export const useBeforeDate = (
  date: number | string | Date,
  target: number | string | Date = '',
  resDefault: string | number | null = ''
) => {
  if (!date) return date;
  // 获取日期时间戳
  const _date = useFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
  const dateTimeStamp = new Date(_date).getTime();
  let nowTimeStamp = 0;
  if (!target) {
    // 获取当前时间戳
    nowTimeStamp = new Date().getTime();
  } else {
    // 获取目标时间日期时间戳
    const _date = useFormatDate(target, 'yyyy-MM-dd HH:mm:ss');
    nowTimeStamp = new Date(_date).getTime();
  }
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
  if (timeStamp < 0) return resDefault;
  if (timeStamp / year >= 1) return `${parseInt(`${timeStamp / year}`, 10)}年前`;
  if (timeStamp / months >= 1) return `${parseInt(`${timeStamp / months}`, 10)}个月前`;
  if (timeStamp / weekdays >= 1) return `${parseInt(`${timeStamp / weekdays}`, 10)}周前`;
  if (timeStamp / days >= 1) return `${parseInt(`${timeStamp / days}`, 10)}天前`;
  if (timeStamp / hours >= 1) return `${parseInt(`${timeStamp / hours}`, 10)}小时前`;
  if (timeStamp / minutes >= 1) return `${parseInt(`${timeStamp / minutes}`, 10)}分钟前`;
  return `${parseInt(`${timeStamp / seconds}`, 10)}秒前`;
};
