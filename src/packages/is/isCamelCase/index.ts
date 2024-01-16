/**
 * 判断是否是驼峰命名
 * isCamelCase("helloWorld") 输出: true
 * isCamelCase("HelloWorld") 输出: true
 * isCamelCase("hello_world") 输出: false
 * @param str
 * @returns boolean
 */
export const isCamelCase = (str: string) => {
  const camelCaseRegex = /^(?:[a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*)$/;

  return camelCaseRegex.test(str);
};
