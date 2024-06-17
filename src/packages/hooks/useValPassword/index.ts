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
export const useValPassword = (value: string, min = 6, max = 16) => {
  const regex = new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${min},${max}}$`
  );
  return regex.test(value);
};
