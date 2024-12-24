export type IThrottleFn = (...args: any) => void;
/**
 * 节流函数
 * @param func 需要进行节流方法
 * @param delay 延迟执行 默认：1000ms
 */
export const useThrottle = (func: IThrottleFn, delay = 1000) => {
  let isThrottle: any;
  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (!isThrottle) {
      func.apply(context, args);
      isThrottle = true;
      setTimeout(() => (isThrottle = false), delay);
    }
  };
};
