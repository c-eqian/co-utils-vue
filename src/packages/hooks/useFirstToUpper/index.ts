/**
 * @Author: 十三
 * @Date: 2024-17-11 05:20:21
 * @email: 2429120006@qq.com
 * @Description: desc
 */
/**
 * 首字母转大写
 * @param str
 * @returns
 * @example
 * ```ts
 * useCamel2kebab('abc') // Abc
 * useCamel2kebab('abc-d') // Abc-d
 * useCamel2kebab('aBc-d') // ABc-d
 * useCamel2kebab('ABc-d') // ABc-d
 * ```
 */
export function useFirstToUpper(str: string): string {
  return str.replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase());
}
