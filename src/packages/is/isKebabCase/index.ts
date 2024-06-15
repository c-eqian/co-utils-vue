/**
 * 校验是否是短杠拼接且非是开头或者结尾的字符
 * @param str
 * @returns boolean
 * @example
 * ```js
 * isKebabCase('hello-world') // true
 * isKebabCase('HelloWorld') // false
 * isKebabCase('hello-world_') // false
 * isKebabCase('-hello-world-') // false
 * isKebabCase('hello') // true
 * isKebabCase('hello--world') // false
 * ```
 */
export const isKebabCase = (str: string) => {
  // 使用正则表达式判断字符串是否仅由字母、数字以及短横线组成，并且不以短横线开头或结尾
  return /^[a-z]+(-[a-z]+)*$/.test(str);
};
