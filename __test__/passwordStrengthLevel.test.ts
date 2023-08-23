import { passwordStrengthLevel } from '../src';
describe('passwordStrengthLevel', () => {
  const testGroup = [
    {
      value: '1234567',
      expect: 1
    },
    {
      value: '12345678',
      expect: 1
    },
    {
      value: 'a12345678',
      expect: 1
    },
    {
      value: 'A12345678',
      expect: 1
    },
    {
      value: '@12345678',
      expect: 1
    },
    {
      value: '@12345678aA',
      expect: 2
    },
    {
      value: '@12345678aaaaa',
      expect: 1
    },
    {
      value: '@12345678aaaAAa',
      expect: 3
    }
  ];
  it('should  level ', function () {
    testGroup.forEach(item => {
      expect(passwordStrengthLevel(item.value)).toBe(item.expect);
    });
  });
});
