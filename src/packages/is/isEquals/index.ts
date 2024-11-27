import { getTag } from '../../helper/getTag';
import { isNaN } from '../isNaN';
import { isObjectLike } from '../isObjectLike';
function isBaseEquals(value1: unknown, value2: unknown) {
  if (value1 === value2) return true;
  else if (isNaN(value1) && isNaN(value2)) return true;
  return false;
}

export function isDeepEquals(
  value1: any,
  value2: any,
  seen: WeakMap<any, boolean> = new WeakMap()
): boolean {
  const value1Tag = getTag(value1);
  const value2Tag = getTag(value2);
  if (value1Tag !== value2Tag) return false;
  const _is = Object.is(value1, value2);
  if (_is) return true;
  const baseEquals = isBaseEquals(value1, value2);
  if (!baseEquals) {
    if (!isObjectLike(value1)) {
      const baseEquals = isBaseEquals(value1, value2);
      if (!baseEquals) return false;
    }
    // 检查是否已经比较过这对对象
    const key = [value1, value2];
    // 记录这对对象已经比较过
    if (seen.has(key)) return !!seen.get(key);
    // 获取对象的键
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    // 键的数量必须相同
    if (keys1.length !== keys2.length) return false;
    // 比较每个键对应的值
    for (let key of keys1) {
      const _val1 = value1[key];
      const _val2 = value2[key];
      if (!isObjectLike(_val1)) {
        const baseEquals = isBaseEquals(_val1, _val2);
        if (baseEquals) return true;
      }
      if (!keys2.includes(key) || !isDeepEquals(_val1, _val2, seen)) return false;
    }
    // 记录比较结果
    seen.set(key, true);
  }
  return true;
}
/**
 * 比较两个值是否相等
 * 比较步骤：
 * 1. 如果类型不等，返回false，否则下一步
 * 2. 如果是原始类型，使用严格相等（===），否则下一步
 * 3. 如果是数组，判断长度不等，返回false，否则按顺序使用1、2步骤比较里面每一项，如果是数组重复3步骤
 * 4. 如果是对象，使用Object.is()比较，不等-》比较属性集合长度不等返回false，否则使用1、2、3比较属性的值，如果值是对象，使用4步骤
 * 5. 如果是对象数据，不会按照顺序比较，只比较属性值是否一致
 * @since v3.1.2
 * @param value1 比较值1
 * @param value2 比较值2
 */
export function isEquals(value1: unknown, value2: unknown): boolean {
  return isDeepEquals(value1, value2);
}
