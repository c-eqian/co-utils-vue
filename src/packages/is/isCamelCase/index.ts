/**
 * 判断是否是驼峰命名
 * 包含大、小驼峰
 * @param str
 * @returns boolean
 * @example
 * ```js
 * isCamelCase("helloWorld") // true
 * isCamelCase("HelloWorld") // true
 * isCamelCase("hello_world") // false
 * ```
 */
export const isCamelCase = (str: string) => {
  const camelCaseRegex = /^(?:[a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*)$/;
  return camelCaseRegex.test(str);
};
