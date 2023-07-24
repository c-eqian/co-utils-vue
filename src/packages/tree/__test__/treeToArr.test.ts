import { treeToArr } from '../index';
import { useSortByKey } from '@/packages/hooks';

describe('treeToArr', () => {
  const three = [
    {
      parent: null,
      id: 1,
      name: '北京',
      children: [
        {
          parent: 1,
          id: 11,
          name: '朝阳',
          children: [
            {
              parent: 11,
              id: 111,
              name: '朝阳1号'
            }
          ]
        },
        {
          parent: 1,
          id: 12,
          name: '海淀',
          children: [
            {
              parent: 12,
              id: 121,
              name: '海淀1号'
            }
          ]
        }
      ]
    },
    {
      parent: null,
      id: 2,
      name: '上海',
      children: [
        {
          parent: 2,
          id: 21,
          name: '浦东',
          children: [
            {
              parent: 21,
              id: 211,
              name: '浦东1号'
            }
          ]
        },
        {
          parent: 2,
          id: 22,
          name: '虹口',
          children: [
            {
              parent: 22,
              id: 221,
              name: '虹口1号'
            }
          ]
        }
      ]
    }
  ];
  const arr = [
    { parent: null, id: 1, name: '北京' },
    { parent: 1, id: 11, name: '朝阳' },
    { parent: 11, id: 111, name: '朝阳1号' },
    { parent: 1, id: 12, name: '海淀' },
    { parent: 12, id: 121, name: '海淀1号' },
    { parent: null, id: 2, name: '上海' },
    { parent: 2, id: 21, name: '浦东' },
    { parent: 21, id: 211, name: '浦东1号' },
    { parent: 2, id: 22, name: '虹口' },
    { parent: 22, id: 221, name: '虹口1号' }
  ];
  const _arr = useSortByKey(arr, {
    key: 'id'
  });
  it('数组扁平化', () => {
    const res = useSortByKey(treeToArr(three), {
      key: 'id'
    });
    expect(res).toEqual(_arr);
  });
});