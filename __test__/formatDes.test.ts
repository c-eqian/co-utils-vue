import { useEncryptedIdCard, useEncryptedPhone } from '../src';
describe('desIdCard', () => {
  // 1G=1024M=1048576KB
  const test = [
    {
      value: '450616199905206666',
      expect: '450616****6666'
    }
  ];
  test.forEach(item => {
    it('should ', () => {
      expect(useEncryptedIdCard(item.value)).toBe(item.expect);
    });
  });
  it('should ', () => {
    expect(useEncryptedPhone('19994402236')).toBe('199****2236');
  });
  it('测试异常 ', () => {
    expect(useEncryptedPhone('199944026')).toBe('199944026');
    expect(useEncryptedIdCard('199944026')).toBe('199944026');
  });
});
