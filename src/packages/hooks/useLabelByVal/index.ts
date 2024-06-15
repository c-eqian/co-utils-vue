export interface ILabelByValOptions<T> {
  /**
   * 如果提取的状态值字段非value可通过该字段自定义
   * @default value
   */
  valueKey?: keyof T;
  /**
   * 如果提取的标签值字段非label可通过该字段自定义
   * @default label
   */
  labelKey?: keyof T;
}
/**
 * 根据val值提取对应的label标签
 * @param list 一个数组数据
 * @param value 状态值
 * @param options 额外参数
 * @example
 * ```js
 *   const testConfig1 = [
 *     {
 *       label: '苹果',
 *       value: 'apple'
 *     },
 *     {
 *       label: '香蕉',
 *       value: 'banana'
 *     },
 *     {
 *       label: '梨',
 *       value: 'pear'
 *     }
 *   ];
 *   useLabelByVal(testConfig1, 'banana') // 香蕉
 *   useLabelByVal(testConfig1, 'glass') // ''
 *   // 没有label 或者 value字段
 *     const testConfig2 = [
 *     {
 *       label1: '苹果',
 *       value1: 'apple'
 *     },
 *     {
 *       label1: '香蕉',
 *       value1: 'banana'
 *     },
 *     {
 *       label1: '梨',
 *       value1: 'pear'
 *     }
 *   ];
 *  useLabelByVal(testConfig2, 'banana', {
 *         valueKey: 'value1',
 *         labelKey: 'label1'
 *       }); // 香蕉
 * ```
 */
export const useLabelByVal = <T = any>(
  list: T[],
  value: string | number,
  options?: ILabelByValOptions<T>
) => {
  const { valueKey = 'value', labelKey = 'label' } = options || ({} as ILabelByValOptions<T>);
  const _item = list.find(item => String(item[valueKey as string]) === String(value)) || ({} as T);
  return _item[labelKey as string] || '';
};
