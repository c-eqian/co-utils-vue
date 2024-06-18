/**
 * 判断密码是否包含大小写字母、数字和特殊字符（@$!%*?&）组成，且长度在min-max之间
 * @param value
 * @param max 默认值 16
 * @example
 * ``` js
 * useValPassword('Passw0rd!') // true
 * useValPassword('PASSWORD123!') // false
 * useValPassword('PAaaWORD123!') // true
 * useValPassword('P0rd!') // false
 * // max=6
 * useValPassword('PAaaWO396636RD123!', 6) // false;
 * useValPassword('Pa33@!', 6) // true;
 * // 超出长度的
 * useValPassword('PASSWO396636RD123!') // false
 * useValPassword('PAaaWO396636RD123!', 6, 20) // true
 * ```
 */
export function useValPassword(value: string, max?: number): boolean;
/**
 * 判断密码是否包含大小写字母、数字和特殊字符（@$!%*?&）组成，且长度在min-max之间
 * @param value
 * @param min 默认值 6
 * @param max 默认值 16
 * @example
 * ``` js
 * useValPassword('Passw0rd!') // true
 * useValPassword('PASSWORD123!') // false
 * useValPassword('PAaaWORD123!') // true
 * useValPassword('P0rd!') // false
 * // 超出长度的
 * useValPassword('PASSWO396636RD123!') // false
 * useValPassword('PAaaWO396636RD123!', 6, 20) // true
 * ```
 */
export function useValPassword(value: string, min?: number, max?: number): boolean;
/**
 * 判断密码是否包含大小写字母、数字和特殊字符（@$!%*?&）组成，且长度在min-max之间
 * @param value
 * @param min 默认值 6
 * @param max 默认值 16
 * @example
 * ``` js
 * useValPassword('Passw0rd!') // true
 * useValPassword('PASSWORD123!') // false
 * useValPassword('PAaaWORD123!') // true
 * useValPassword('P0rd!') // false
 * // 超出长度的
 * useValPassword('PASSWO396636RD123!') // false
 * useValPassword('PAaaWO396636RD123!', 6, 20) // true
 * ```
 */
export function useValPassword(value: string, min?: number, max?: number) {
  let _max: number, _min: number;
  if (arguments.length === 2) {
    _max = min as number;
    _min = 1;
  } else if (arguments.length === 3) {
    _min = min as number;
    _max = max as number;
  } else {
    _max = 16;
    _min = 6;
  }
  const regex = new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${_min},${_max}}$`
  );
  return regex.test(value);
}
