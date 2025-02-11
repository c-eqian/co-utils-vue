/**
 * 将一个值转为数组
 * @param value
 * @example
 * ```js
 * toArray(1) // [1]
 * toArray([1]) // [1]
 * toArray([[1]]) // [[1]]
 * ```
 */
export function toArray<T>(value: T): T extends readonly any[] ? T : [T] {
  return Array.isArray(value) ? (value as any) : ([value] as [T]);
}
