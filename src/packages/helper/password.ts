/**
 * 校验密码强度
 * @param password
 * @return {1 | 2 | 3}
 * @example
 * ``` js
 * passwordLevel(1234567) // 1
 * passwordLevel(12345678) // 1
 * passwordLevel(a12345678) // 1
 * passwordLevel(A12345678) // 1
 * passwordLevel(@12345678) // 1
 * //包含大小写，长度小于12
 * passwordLevel(@12345678aA) // 2
 * passwordLevel(@12345678aaaaa) // 1
 * //包含大小写，长度大于等于12
 * passwordLevel(@12345678aaaAAa) // 3
 * ```
 */
export const passwordLevel = (password: string): number => {
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
