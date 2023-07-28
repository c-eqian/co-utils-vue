import { formatBytes } from '../src/packages/format';
describe('formatBytes', () => {
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
      expect(formatBytes(item.value)).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(formatBytes(1048576, -1)).toBe('1 MB');
  });
});
