import { useMerge } from '../useMerge';
export type IProps<T = any> = T & {
  children: T[];
};
export interface IOptions {
  /**
   * 认为父节点的键名称
   * @default parent
   */
  parentKey?: string;
  /**
   * 节点的ID的键
   */
  pidKey?: string;
  /**
   * 作为父节点的依据值
   * @default null
   */
  pidValue?: string | number | null;
}

/**
 * 数组转换树形结构，与useTransformList互换
 * @param arrData
 * @param options
 */
export const useTransformTree = <T>(arrData: T[], options?: IOptions) => {
  const res: IProps<T>[] = [];
  const defaultValues: IOptions = {
    parentKey: 'parent',
    pidKey: 'id',
    pidValue: null
  };
  const _options = useMerge(defaultValues, options || {});
  arrData.forEach(item => {
    if (item[_options.parentKey!] === _options.pidValue) {
      const children = useTransformTree(
        arrData.filter(v => v[_options.parentKey ?? 'parent'] !== _options.pidValue),
        {
          parentKey: _options.parentKey,
          pidKey: _options.pidKey,
          pidValue: item[_options.pidKey!]
        }
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item, children: [] });
    }
  });
  return res;
};
