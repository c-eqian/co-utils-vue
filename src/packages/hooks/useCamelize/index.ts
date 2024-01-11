/**
 * 短杆拼接转驼峰
 * @param str
 * @returns
 * test-icon => testIcon
 */
export const useCamelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};
