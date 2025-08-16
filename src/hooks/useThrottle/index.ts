export type IThrottleFn = (...args: any[]) => void;
/**
 * 节流函数
 * @param func 需要进行节流方法
 * @param delay 延迟执行 默认：1000ms
 */
export const useThrottle = <T extends IThrottleFn>(func: T, delay = 1000): T => {
  let isThrottle: any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!isThrottle) {
      func.apply(this, args);
      isThrottle = true;
      setTimeout(() => (isThrottle = false), delay);
    }
  } as T;
};
