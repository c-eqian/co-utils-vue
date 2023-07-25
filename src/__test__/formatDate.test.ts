import { formatDate } from '@/packages/format';
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
      expect: '2022-11-24 19:50:52'
    },
    {
      value: 'Tue Jul 25 2023 09:23:02 GMT+0800 (中国标准时间)',
      expect: '2023-07-25 09:23:02'
    }
  ];
  data.forEach(item => {
    it('should ', () => {
      expect(formatDate(item.value)).toBe(item.expect);
    });
  });
  data1.forEach(item => {
    it('should ', () => {
      expect(formatDate(item.value, 'yyyy-MM-dd HH:mm:ss')).toBe(item.expect);
      expect(formatDate(item.value, 'yyyy-MM-dd HH:mm:ss')).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(formatDate(1669290652000, 'yy-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(formatDate(1669290652000, 'YY-MM-dd HH:mm:ss')).toBe('22-11-24 19:50:52');
    expect(formatDate(1669290652000, 'YYYY-MM-dd HH:mm:ss')).toBe('2022-11-24 19:50:52');
    expect(formatDate(1669290652000, 'YYYY-M-d HH:mm:ss')).toBe('2022-11-24 19:50:52');
  });
});
