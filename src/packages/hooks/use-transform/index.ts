/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 17:07:21
 */
import { Omit } from '../../helper';
import { useMerge } from '../../hooks';

export type IProps<T = any> = T & {
  children: T[];
};
export interface IOptions {
  /**
   * 父节点的键名称
   */
  parent?: string;
  /**
   * 数据节点标识
   */
  key?: string;
  /**
   * 作为父节点的依据值
   */
  pid?: string | number | null;
}

/**
 * 树形结构转换
 * @param arrData 原数组数据
 * @param options
 * @returns
 */
export const useTransformTree = <T>(arrData: T[], options?: IOptions) => {
  const res: IProps<T>[] = [];
  const defaultValues: IOptions = {
    parent: 'parent',
    key: 'id',
    pid: null
  };
  const _options = useMerge(defaultValues, options || {});
  arrData.forEach(item => {
    if (item[_options.parent!] === _options.pid) {
      const children = useTransformTree(
        arrData.filter(v => v[_options.parent ?? 'parent'] !== _options.pid),
        {
          parent: _options.parent,
          key: _options.key,
          pid: item[_options.key!]
        }
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item, children: [] });
    }
  });
  return res;
};

/**
 *
 * @param data 树形结构扁平化
 * @param options
 * @returns
 */
interface ITreeOptions {
  /**
   * 子节点的键 默认值【children】
   */
  children?: string;
  /**
   * 父节点ID的键 默认值【id】
   */
  pidKey?: string;
  /**
   * 设置父节点的属性值 默认值【null】
   */
  pidValue?: string | number | null;
  /**
   * 设置父节点键 默认值【parent】
   */
  parentKey?: string;
  /**
   * 是否需要设置父节点标志 默认值【true】
   */
  pidFlag?: boolean;
}

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
