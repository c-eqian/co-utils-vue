import { customRef, ref } from 'vue-demi';
import { useDebounce } from '../useDebounce';

/**
 * 具有防抖功能的响应式ref
 * @param data
 * @param delay 500ms 如果delay为null不使用防抖，而是普通方法
 */
export const useDebounceRef = <T>(data: T, delay = 500) => {
  const debounceFn = useDebounce((v: any, trigger: any) => {
    // 修改数据
    data = v;
    // 派发更新
    trigger();
  }, delay);
  // 如果data为null不使用防抖，而是普通方法
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
            debounceFn(v, trigger);
          }
        };
      });
};
