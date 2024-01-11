/***
 * 将数值转换为整数
 * @param value
 */
export const useToInteger = (value: number | string) => {
  const result = +value;
  const remainder = result % 1;
  return remainder ? result - remainder : result;
};
