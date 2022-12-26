/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 13:39:45
 */

/**
 * 树形结构转换
 * @param arrData 原数组数据
 * @param parent 关联父节点的字段
 * @param key 每条目唯一标识
 * @param pid 作为父节点值
 * @returns
 */
export type IProps<T = any> = T & {
  children: T[];
};
export interface IOptions {
  parent: string;
  key: string;
  pid: string | number | null;
}
//
export const arr2Tree = <T>(
  arrData: T[],
  options: IOptions = {
    parent: 'parent',
    key: 'id',
    pid: null
  }
) => {
  const res: IProps<T>[] = [];
  arrData.forEach(item => {
    if (item[options.parent] === options.pid) {
      const children = arr2Tree(
        arrData.filter(v => v[options.parent] !== options.pid),
        { parent: options.parent, key: options.key, pid: item[options.key] }
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item, children: [] });
    }
  });
  return res;
};
