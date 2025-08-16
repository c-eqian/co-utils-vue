export type IDebounceFn = (...args: any[]) => void;
/**
 * 防抖函数
 * @param func 需要执行的防抖方法
 * @param delay 默认值：1000
 * @return IDebounceFn
 */
export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
): T => {
  let timeoutId: NodeJS.Timeout;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
};
