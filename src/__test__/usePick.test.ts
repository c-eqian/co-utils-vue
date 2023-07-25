import { usePick } from '@/packages/hooks';
describe('usePick', () => {
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
  it('usePick', () => {
    expect(usePick(data, ['age', 'address'])).toEqual({
      address: '深圳',
      age: 18
    });
  });
  // it('useDeepPick', () => {
  //   expect(
  //     useDeepPick(
  //       {
  //         name: '张三',
  //         gender: '女',
  //         address: '深圳',
  //         age: 18,
  //         info: [
  //           {
  //             name: '张三',
  //             gender: '女',
  //             address: '深圳',
  //             age: 18
  //           }
  //         ]
  //       },
  //       ['age', 'address', 'info']
  //     )
  //   ).toEqual({
  //     address: '深圳',
  //     age: 18,
  //     info: [
  //       {
  //         address: '深圳',
  //         age: 18
  //       }
  //     ]
  //   });
  // });
});
