export type IDebounceFn = (...args: any) => void;
/**
 * 防抖函数
 * @param func 需要执行的防抖方法
 * @param delay 默认值：1000
 * @return IDebounceFn
 */
export const useDebounce = (func: IDebounceFn, delay = 1000) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
