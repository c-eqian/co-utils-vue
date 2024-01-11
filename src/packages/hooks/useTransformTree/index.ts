import { useMerge } from '../useMerge';
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
