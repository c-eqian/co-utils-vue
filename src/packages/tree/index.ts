/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-20 16:53:50
 */

/**
 * 树形结构转换
 * @param arrData 原数组数据
 * @param parent 关联父节点的字段
 * @param key 每条目唯一标识
 * @param pid 作为父节点值
 * @returns
 */
export const arr2Tree = (arrData: object[], parent = 'parent', key = 'id', pid = null) => {
  const res: object[] = [];
  arrData.forEach(item => {
    if (item[parent] === pid) {
      const children = arr2Tree(
        arrData.filter(v => v[parent] !== pid),
        parent,
        key,
        item[key]
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item });
    }
  });
  return res;
};
