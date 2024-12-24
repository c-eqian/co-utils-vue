/**
 * 是否为大陆手机号
 * @param phone
 * @returns
 */
export const isPhone = (phone: string) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phone);
};
