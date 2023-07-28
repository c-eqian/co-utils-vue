import { isNumeric } from '../src/packages/is';
const testConfig = [
  {
    value: '1222',
    expect: true
  },
  {
    value: '+1222',
    expect: true
  },
  {
    value: '-1222',
    expect: true
  },
  {
    value: '12.22',
    expect: true
  },
  {
    value: '+12.22',
    expect: true
  },
  {
    value: +12.22,
    expect: true
  },
  {
    value: 12.2,
    expect: true
  },
  {
    value: -12.22,
    expect: true
  },
  {
    value: Infinity,
    expect: true
  }
];
describe('isNumeric', () => {
  testConfig.forEach(item => {
    it(`输入 ${item.value} 期待返回${item.expect}`, () => {
      item.expect
        ? expect(isNumeric(item.value)).toBeTruthy()
        : expect(isNumeric(item.value)).toBeFalsy();
    });
  });
});
