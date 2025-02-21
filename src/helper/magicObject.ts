/**
 * 魔法对象，当尝试从一个可选对象中获取某个属性时，或许有用。或者说将可选项设置为必选项
 * @param obj
 */
export function magicObject<T>(obj: T): NonNullable<T> {
  return obj ?? (Object.create(null) as unknown as NonNullable<T>);
}
