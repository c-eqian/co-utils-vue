/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-20 14:35:53
 */
export interface ITree {
  // 父节点字段
  parent: string;
  // 标识值
  value: null | number | string;
  key: string;
}
export const arr2Tree = (
  arrData: object[],
  config: ITree = {
    parent: 'parent',
    value: null,
    key: 'id'
  }
) => {
  const res: object[] = [];
  arrData.forEach(item => {
    if (item[config.parent] === config.value) {
      const children = arr2Tree(
        arrData.filter(v => v[config.parent] !== config.value),
        (config.value = item[config.key])
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item });
    }
  });
  return res;
};
