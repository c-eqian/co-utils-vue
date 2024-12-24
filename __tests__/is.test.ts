import { isNumber, isNumeric, isObjectLike } from '../src';
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
    value: '3.14e-10',
    expect: true
  },
  {
    value: 'abc',
    expect: false
  },
  {
    value: Infinity,
    expect: true
  },
  {
    value: '122e',
    expect: false
  },
  {
    value: '458.a',
    expect: false
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

const testIsNumber = [
  {
    value: -12.22,
    expect: true
  },
  {
    value: '-12.22',
    expect: false
  }
];
describe('isNumber', () => {
  testIsNumber.forEach(item => {
    it(`输入 ${item.value} 期待返回${item.expect}`, () => {
      item.expect
        ? expect(isNumber(item.value)).toBeTruthy()
        : expect(isNumber(item.value)).toBeFalsy();
    });
  });
});
const testIsObjectLike = [
  {
    value: {},
    expect: true
  },
  {
    value: [1, 2, 3],
    expect: true
  },
  {
    value: Function,
    expect: false
  },
  {
    value: null,
    expect: false
  }
];
describe('isObjectLike', () => {
  testIsObjectLike.forEach(item => {
    it(`输入 ${item.value} 期待返回${item.expect}`, () => {
      item.expect
        ? expect(isObjectLike(item.value)).toBeTruthy()
        : expect(isObjectLike(item.value)).toBeFalsy();
    });
  });
});
