import { cloneDeep } from '@/packages/clone-deep';

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
      expect(cloneDeep(item.value)).toEqual(item.expect);
    });
  });
  test2.forEach((item, index) => {
    it('should ', () => {
      expect(() => {
        const _deep = cloneDeep(item.value);
        _deep[0].b = '0';
        return _deep;
      }).not.toEqual(item.expect);
    });
  });
});
