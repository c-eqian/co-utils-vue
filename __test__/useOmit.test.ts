import { useDeepOmit, useOmit } from '../src/packages/hooks';
describe('useDeepOmit', () => {
  const data = {
    name: '张三',
    gender: '女',
    address: '深圳',
    age: 18,
    info: {
      name: '张三',
      gender: '女',
      address: '深圳',
      age: 18
    }
  };
  it('should ', function () {
    expect(useDeepOmit(data, ['gender', 'age'])).toEqual({
      name: '张三',
      address: '深圳',
      info: {
        name: '张三',
        address: '深圳'
      }
    });
  });
  it('useOmit ', function () {
    expect(useOmit(data, ['gender', 'age'])).toEqual({
      name: '张三',
      address: '深圳',
      info: {
        name: '张三',
        gender: '女',
        address: '深圳',
        age: 18
      }
    });
  });
});
