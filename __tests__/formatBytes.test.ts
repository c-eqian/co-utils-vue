import { useFormatBytes } from '../src';
describe('useFormatBytes', () => {
  // 1G=1024M=1048576KB
  const bytes = [
    {
      value: 123456789012345,
      expect: '112.28 TB'
    },
    {
      value: 1048576,
      expect: '1 MB'
    },
    {
      value: 0,
      expect: '0 Bytes'
    },
    {
      value: 104857610485761048576104857610485761048576,
      expect: 'Number too large'
    }
  ];
  bytes.forEach(item => {
    it('should ', () => {
      expect(useFormatBytes(item.value)).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(useFormatBytes(1048576, -1)).toBe('1 MB');
    expect(useFormatBytes(0.53)).toBe('0.53');
  });
});
