import { useCloneDeep } from '../src';

describe('cloneDeep', () => {
  const test1 = [
    {
      value: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉'
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ],
      expect: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉'
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ]
    },
    {
      value: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉',
          e: {
            a: 5220,
            b: 'cc',
            d: '苹果'
          }
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ],
      expect: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉',
          e: {
            a: 5220,
            b: 'cc',
            d: '苹果'
          }
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ]
    }
  ];
  const test2 = [
    {
      value: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉'
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ],
      expect: [
        {
          a: 122,
          b: 'cc',
          d: '香蕉'
        },
        {
          a: 5220,
          b: 'cc',
          d: '苹果'
        }
      ]
    }
  ];
  test1.forEach((item, index) => {
    it(`cloneDeep 测试用例 ${index}`, () => {
      expect(useCloneDeep(item.value)).toEqual(item.expect);
    });
  });
  test2.forEach((item, index) => {
    it('should ', () => {
      expect(() => {
        const _deep = useCloneDeep(item.value);
        _deep[0].b = '0';
        return _deep;
      }).not.toEqual(item.expect);
    });
  });
  it('测试Symbol类型 ', function () {
    const a = Symbol('a');
    expect(
      useCloneDeep({
        [a]: 1
      })
    ).toEqual({
      [a]: 1
    });
  });
  it('测试循环引用 ', function () {
    const data: any = {
      name: '11',
      age: 18,
      info: [1, 2, 3]
    };
    data.e = data;
    expect(useCloneDeep(data)).toEqual(data);
  });
  it('测试时间', () => {
    const _d = new Date();
    const data: any = {
      data: _d,
      aa: {
        data: _d
      }
    };
    expect(useCloneDeep(data)).toEqual(data);
  });
});
