/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 15:18:43
 */
import { Omit } from '@/packages/helper';
import { cloneDeep } from '@/packages/clone-deep';

export type IProps<T = any> = T & {
  children: T[];
};
export interface IOptions {
  parent: string;
  key: string;
  pid: string | number | null;
}

/**
 * 树形结构转换
 * @param arrData 原数组数据
 * @param parent 关联父节点的字段
 * @param key 每条目唯一标识
 * @param pid 作为父节点值
 * @returns
 */
export const arrToTree = <T>(
  arrData: T[],
  options: IOptions = {
    parent: 'parent',
    key: 'id',
    pid: null
  }
) => {
  const res: IProps<T>[] = [];
  options.key = options.key || 'id';
  options.parent = options.parent || 'parent';
  options.pid = options.pid === undefined ? null : options.pid;
  arrData.forEach(item => {
    if (item[options.parent] === options.pid) {
      const children = arrToTree(
        arrData.filter(v => v[options.parent ?? 'parent'] !== options.pid),
        {
          parent: options.parent,
          key: options.key,
          pid: item[options.key]
        }
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item, children: [] });
    }
  });
  return res;
};

/**
 * 树形结构扁平化
 * @param data 
 * @returns 
 */
export const treeToArr = <T>(data: T[]) => {
  const res: Omit<T, 'children'>[] = [];
  for (let i = 0; i < data.length; i++) {
    const cloneData = cloneDeep(data[i]);
    if (data[i]['children']?.length) {
      delete cloneData['children'];
      res.push(cloneData);
      treeToArr(data[i]['children']);
    } else {
      res.push(cloneData);
    }
  }
  return res;
};
