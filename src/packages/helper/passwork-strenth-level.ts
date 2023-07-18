/**
 * 校验密码强度
 * @param password
 */
export const passwordStrengthLevel = (password: string): number => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|;:',.<>/?]/.test(password);

  if (password.length < 8 || !hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
    // 密码强度等级1
    return 1;
  } else if (password.length < 12) {
    // 密码强度等级2
    return 2;
  } else {
    // 密码强度等级3
    return 3;
  }
};
