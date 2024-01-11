/**
 * 根据val值提取对应的label标签
 * @param list 一个数组数据
 * @param value 状态值
 * @param options 额外参数，
 * valueKey：如果提取的状态值字段非value可通过该字段自定义
 * labelKey： 如果提取的标签值字段非label可通过该字段自定义
 * e.g: list: [{label: 'label', value: 'value'}, {label: 'label11', value: 'value11'}]
 *      value: 'value'
 *      return: 'label'
 */
export const useLabelByVal = <T>(
  list: T[],
  value: string | number,
  options?: {
    valueKey?: keyof T;
    labelKey?: keyof T;
  }
) => {
  const defaultValueKey = {
    valueKey: 'value',
    labelKey: 'label'
  };
  const _options = Object.assign({}, defaultValueKey, options);
  const _item = list.find(item => String(item[_options.valueKey]) === String(value)) || ({} as T);
  return _item[_options.labelKey] || '';
};
