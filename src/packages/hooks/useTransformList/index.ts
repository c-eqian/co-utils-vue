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
/**
 *
 * @param data 树形结构扁平化
 * @param options
 * @returns
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
