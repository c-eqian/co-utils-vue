import { useMerge } from '../src/packages/hooks/use-merge';

describe('useMerge', () => {
  const source = {
    name: '张三',
    gender: '女'
  };
  const source1 = {
    name: '张三',
    info: '信息'
  };
  it('should ', () => {
    expect(useMerge(source, source1)).toEqual({
      name: '张三',
      gender: '女',
      info: '信息'
    });
    expect(
      useMerge(
        {},
        {
          name: '张三',
          gender: '女'
        },
        {
          name: '张4',
          info: '信息'
        }
      )
    ).toEqual({
      name: '张4',
      gender: '女',
      info: '信息'
    });
    expect(
      useMerge(
        {},
        {
          name: '张三',
          gender: '女',
          info: {
            name: '张强'
          }
        },
        {
          name: '张4',
          info: {
            age: 18
          }
        }
      )
    ).toEqual({
      name: '张4',
      gender: '女',
      info: {
        name: '张强',
        age: 18
      }
    });
    expect(
      useMerge(
        {},
        {
          name: '张三',
          gender: '女',
          info: [1, 2]
        },
        {
          name: '张4',
          info: [3, 4]
        }
      )
    ).toEqual({
      name: '张4',
      gender: '女',
      info: [3, 4]
    });
    expect(useMerge<number[]>([], [1, 2], [3, 4])).toEqual([3, 4]);
    expect(
      useMerge(
        {},
        {
          name: '张三',
          gender: '女'
        },
        {
          name: '张三',
          gender: '女'
        },
        {
          name: '张三',
          gender: '女',
          info: [520]
        }
      )
    ).toEqual({
      name: '张三',
      gender: '女',
      info: [520]
    });
  });
});
