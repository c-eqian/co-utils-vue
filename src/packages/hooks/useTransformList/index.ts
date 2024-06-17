export interface ITreeOptions {
  /**
   * 子节点的键
   * @default children
   */
  children?: string;
  /**
   * 节点的ID的键
   * @default id
   */
  pidKey?: string;
  /**
   * 设置认为是父节点的值
   * @default null
   */
  pidValue?: string | number | null;
  /**
   * 设置父节点的键
   * @default parent
   */
  parentKey?: string;
  /**
   * 是否需要设置父节点标志
   * @default true
   */
  pidFlag?: boolean;
}
/**
 *
 * @param data 树形结构扁平化成数组
 * @param options
 * @returns
 * @example
 * ``` js
 *   const three = [
 *     {
 *       id: 1,
 *       name: '北京',
 *       children: [
 *         {
 *           id: 11,
 *           name: '朝阳',
 *           children: [
 *             {
 *               id: 111,
 *               name: '朝阳1号'
 *             }
 *           ]
 *         },
 *         {
 *           id: 12,
 *           name: '海淀',
 *           children: [
 *             {
 *               id: 121,
 *               name: '海淀1号'
 *             }
 *           ]
 *         }
 *       ]
 *     },
 *     {
 *       id: 2,
 *       name: '上海',
 *       children: [
 *         {
 *           id: 21,
 *           name: '浦东',
 *           children: [
 *             {
 *               id: 211,
 *               name: '浦东1号'
 *             }
 *           ]
 *         },
 *         {
 *           id: 22,
 *           name: '虹口',
 *           children: [
 *             {
 *               id: 221,
 *               name: '虹口1号'
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ];
 *   //    [
 *   //     { parent: null, id: 1, name: '北京' },
 *   //     { parent: 1, id: 11, name: '朝阳' },
 *   //     { parent: 11, id: 111, name: '朝阳1号' },
 *   //     { parent: 1, id: 12, name: '海淀' },
 *   //     { parent: 12, id: 121, name: '海淀1号' },
 *   //     { parent: null, id: 2, name: '上海' },
 *   //     { parent: 2, id: 21, name: '浦东' },
 *   //     { parent: 21, id: 211, name: '浦东1号' },
 *   //     { parent: 2, id: 22, name: '虹口' },
 *   //     { parent: 22, id: 221, name: '虹口1号' }
 *   //   ]
 * ```
 */

export const useTransformList = <T>(
  data: T[],
  options: ITreeOptions = {
    children: 'children',
    pidKey: 'id',
    parentKey: 'parent',
    pidValue: null,
    pidFlag: true
  }
): Omit<T, 'children'>[] => {
  const {
    children = 'children',
    pidKey = 'id',
    parentKey = 'parent',
    pidValue = null,
    pidFlag = true
  } = options;
  let res: Omit<T, 'children'>[] = [];

  const transform = (node: T, pid: string | number | null = null): void => {
    const cloneData = pidFlag ? { ...node, [parentKey]: pid } : { ...node };
    delete cloneData[children];
    res.push(cloneData);

    if (node[children] && node[children].length) {
      for (const child of node[children]) {
        transform(child, node[pidKey]);
      }
    }
  };

  for (const node of data) {
    transform(node, pidValue);
  }

  return res;
};
