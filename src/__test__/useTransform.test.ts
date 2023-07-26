import { useTransformList, useTransformTree } from '@/packages/hooks';
describe('测试树形结构转换', () => {
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
  const res = [
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
              name: '朝阳1号',
              children: []
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
              name: '海淀1号',
              children: []
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
              name: '浦东1号',
              children: []
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
              name: '虹口1号',
              children: []
            }
          ]
        }
      ]
    }
  ];
  it('useTransformTree ', function () {
    // console.log(useTransformList(res));
    expect(useTransformTree(arr)).toEqual(res);
  });
  it('useTransformList ', function () {
    expect(useTransformList(res)).toEqual(arr);
  });
  it('测试参数配置 ', function () {
    expect(
      useTransformTree(
        [
          { par: '-', pid: 1, name: '北京' },
          { par: 1, pid: 11, name: '朝阳' },
          { par: 11, pid: 111, name: '朝阳1号' },
          { par: 1, pid: 12, name: '海淀' },
          { par: 12, pid: 121, name: '海淀1号' },
          { par: '-', pid: 2, name: '上海' },
          { par: 2, pid: 21, name: '浦东' },
          { par: 21, pid: 211, name: '浦东1号' },
          { par: 2, pid: 22, name: '虹口' },
          { par: 22, pid: 221, name: '虹口1号' }
        ],
        {
          key: 'pid',
          pid: '-',
          parent: 'par'
        }
      )
    ).toEqual([
      {
        par: '-',
        pid: 1,
        name: '北京',
        children: [
          {
            par: 1,
            pid: 11,
            name: '朝阳',
            children: [
              {
                par: 11,
                pid: 111,
                name: '朝阳1号',
                children: []
              }
            ]
          },
          {
            par: 1,
            pid: 12,
            name: '海淀',
            children: [
              {
                par: 12,
                pid: 121,
                name: '海淀1号',
                children: []
              }
            ]
          }
        ]
      },
      {
        par: '-',
        pid: 2,
        name: '上海',
        children: [
          {
            par: 2,
            pid: 21,
            name: '浦东',
            children: [
              {
                par: 21,
                pid: 211,
                name: '浦东1号',
                children: []
              }
            ]
          },
          {
            par: 2,
            pid: 22,
            name: '虹口',
            children: [
              {
                par: 22,
                pid: 221,
                name: '虹口1号',
                children: []
              }
            ]
          }
        ]
      }
    ]);
  });
});
