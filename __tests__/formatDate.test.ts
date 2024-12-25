import { useBeforeDate, useFormatDate } from '../src';
describe('useFormatDate', () => {
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
      expect(useFormatDate(item.value)).toBe(item.expect);
    });
  });
  data1.forEach(item => {
    it('should ', () => {
      expect(useFormatDate(item.value, 'yyyy-MM-dd')).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(useFormatDate('', 'yy-MM-dd HH:mm:ss')).toBe('');
    expect(useFormatDate('2022-11-24 19:50:52', 'yy-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(useFormatDate('2022-11-24 19:50:52', 'YY-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(useFormatDate('2022-11-24 19:50:52', 'YYYY-MM-dd HH:mm:ss')).toBe('2022-11-24 19:50:52');
    expect(useFormatDate('2022-11-24 19:50:52', 'YYYY-M-d HH:mm:ss')).toBe('2022-11-24 19:50:52');
    expect(useFormatDate('2022-11-24 19:50:52', 'YYYY/M/d HH:mm:ss')).toBe('2022/11/24 19:50:52');
    // expect(useBeforeDate('2022-07-24 19:50:52')).toBe('1年前');
    // expect(useBeforeDate('2022-11-24 19:50:52')).toBe('8个月前');
    expect(useBeforeDate('')).toBe('');
    expect(useBeforeDate('2023-07-18 19:50:52', '2023-07-25 20:19:52')).toBe('1周前');
    expect(useBeforeDate('2023-07-25 19:50:52', '2023-07-25 21:19:52')).toBe('1小时前');
    expect(useBeforeDate('2023-07-25 20:15:52', '2023-07-25 20:19:52')).toBe('4分钟前');
    expect(useBeforeDate('2023-07-25 20:15:52', '2023-07-25 20:15:55')).toBe('3秒前');
    expect(useBeforeDate('2023-07-25 20:15:58', '2023-07-25 20:15:55')).toBe('');
    expect(useBeforeDate('2023-07-25 20:15:58', '2023-07-25 20:15:55', '-')).toBe('-');
  });
  it('测试字符串 ', () => {
    const date = new Date('2024-01-07T15:30:45.678Z').toISOString();
    expect(useFormatDate(date, 'HH:mm:ss:SS')).toBe('15:30:45:678');
  })
});
