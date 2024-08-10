import { isFunction } from '../../is/isFunction';
import { isNumber } from '../../is/isNumber';
/**
 * 回调执行函数
 */
export type UseRafTimeoutFn = () => void;
/**
 * 配置参数
 */
export type UseRafTimeoutOptions = {
  /**
   * 延迟执行，默认为0，表示不会延迟执行,即立即执行
   * @default 0 单位ms
   */
  delay?: number;
  /**
   * 是否间隔执行，如果设置为true,则在第一次执行过后将会以delay ms间隔执行
   * @default false
   */
  isInterval?: boolean;
};
/**
 * 返回值
 */
export type UseRafTimeoutReturn = {
  /**
   * 执行取消requestAnimationFrame
   */
  closeRafTimeout: () => void;
  /**
   * 重置函数，相当于重新开始执行一次useRafTimeout
   */
  reset: () => void;
};
/**
 * 使用requestAnimationFrame实现的延迟setTimeout或间隔setInterval调用函数。
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
 * @param execFn 执行回调函数
 * @param options 配置项
 * @param options.delay{number} 延迟时间
 * @param options.isInterval{boolean} 是否间隔执行回调
 * @example
 * ``` typescript
 * const { closeRafTimeout, reset } = index(()=> {
 *   // do something
 * }, {
 *   delay: 1000,// 延迟1s执行回调
 *   isInterval: true // 使用间隔执行
 * })
 * ```
 */
export const useRafTimeout = (
  execFn: UseRafTimeoutFn,
  options?: UseRafTimeoutOptions
): UseRafTimeoutReturn => {
  const { delay = 0, isInterval = false } = options ?? ({} as UseRafTimeoutOptions);
  let rafId: number;
  let startTime = 0; // 记录开始时间
  /**
   * 动画帧回调函数
   * requestAnimationFrame()的回调参数，表示上一帧渲染的结束时间
   * @param timestamp
   */
  const timeElapsed = (timestamp: number) => {
    // 如果没有开始时间，以当前时间为开始时间
    if (!startTime) {
      startTime = timestamp;
    }
    // 当前动画所需的时间
    const elapsedTime = timestamp - startTime;
    // 动画所需的时间是否大于等于delay的延迟时间，如果是，默认为一个周期
    if (elapsedTime >= delay) {
      if (isFunction(execFn)) {
        execFn.call(null);
      }
      // 需要间隔执行
      if (isInterval) {
        // 重置开始时间，相当于在达到delay之后，重新计时，并准备下一次动画
        startTime = timestamp;
        rafId = requestAnimationFrame(timeElapsed);
      }
    } else {
      rafId = requestAnimationFrame(timeElapsed);
    }
  };
  const start = () => {
    // 创建一个对象用于存储动画帧的ID，并初始化动画帧
    rafId = requestAnimationFrame(timeElapsed);
  };

  /**
   * 关闭动画帧
   */
  const closeRafTimeout = () => {
    if (isNumber(rafId)) {
      cancelAnimationFrame(rafId);
    }
  };
  const reset = () => {
    // 创建一个对象用于存储动画帧的ID，并初始化动画帧
    start();
  };
  start();
  return {
    reset,
    closeRafTimeout
  };
};
