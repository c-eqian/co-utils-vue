import {beforeDate, formatDate} from '../src/packages/format';
describe('formatDate', () => {
  // 1G=1024M=1048576KB
  const data = [
    {
      value: 1669290652000,
      expect: '2022-11-24'
    },
    {
      value: 'Tue Jul 25 2023 09:23:02 GMT+0800 (中国标准时间)',
      expect: '2023-07-25'
    }
  ];
  const data1 = [
    {
      value: 1669290652000,
      expect: '2022-11-24'
    },
    {
      value: 'Tue Jul 25 2023 09:23:02 GMT+0800 (中国标准时间)',
      expect: '2023-07-25'
    }
  ];
  data.forEach(item => {
    it('should ', () => {
      expect(formatDate(item.value)).toBe(item.expect);
    });
  });
  data1.forEach(item => {
    it('should ', () => {
      expect(formatDate(item.value, 'yyyy-MM-dd')).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(formatDate('', 'yy-MM-dd HH:mm:ss')).toBe('');
    expect(formatDate('2022-11-24 19:50:52', 'yy-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(formatDate('2022-11-24 19:50:52', 'YY-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(formatDate('2022-11-24 19:50:52', 'YYYY-MM-dd HH:mm:ss')).toBe('2022-11-24 19:50:52');
    expect(formatDate('2022-11-24 19:50:52', 'YYYY-M-d HH:mm:ss')).toBe('2022-11-24 19:50:52');
    expect(formatDate('2022-11-24 19:50:52', 'YYYY/M/d HH:mm:ss')).toBe('2022/11/24 19:50:52');
    // expect(beforeDate('2022-07-24 19:50:52')).toBe('1年前');
    // expect(beforeDate('2022-11-24 19:50:52')).toBe('8个月前');
    // expect(beforeDate('2023-07-23 19:50:52')).toBe('2天前');
    expect(beforeDate('2023-07-18 19:50:52', '2023-07-25 20:19:52')).toBe('1周前');
    expect(beforeDate('2023-07-25 19:50:52', '2023-07-25 21:19:52')).toBe('1小时前');
    expect(beforeDate('2023-07-25 20:15:52', '2023-07-25 20:19:52')).toBe('4分钟前');
    expect(beforeDate('2023-07-25 20:15:52', '2023-07-25 20:15:55')).toBe('3秒前');
    expect(beforeDate('2023-07-25 20:15:58', '2023-07-25 20:15:55')).toBe('');
    expect(beforeDate('2023-07-25 20:15:58', '2023-07-25 20:15:55', '-')).toBe('-');
  });
});
