/**
 * 校验身份证
 * @param card 身份证
 * @returns boolean
 */
export const isIdCard = (card: string): boolean => {
  return /^[1-9]\d{5}(19|20)\d{2}((0[1-9]|1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    card
  );
};
