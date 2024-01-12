import { customRef, ref } from 'vue-demi';

/**
 * 数据防抖更新
 * @param data
 * @param delay
 */
export const useDebounceRef = <T>(data: T, delay: number | null = 1000) => {
  // 创建定时器
  let timer = null;
  // 如果delay为null不使用防抖，而是普通方法
  return delay === null
    ? ref(data)
    : /**
       * customRef 中会返回两个函数参数。
       * track 在获取数据时收集依赖的；
       * trigger 在修改数据时进行通知派发更新的。
       */
      customRef((track, trigger) => {
        return {
          get() {
            //    收集依赖
            track();
            return data;
          },
          set(v) {
            timer && clearTimeout(timer);
            timer = null;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            timer = setTimeout(() => {
              // 修改数据
              data = v;
              // 派发更新
              trigger();
            }, delay);
          }
        };
      });
};

/**
 * 防抖函数
 * @param fn
 * @param delay
 */
export type IFn = (...args: any) => void;
export const useDebounce = (fn: IFn, delay = 1000) => {
  let timer = null;
  return function (...args: any) {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
};
