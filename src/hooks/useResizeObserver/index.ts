import {
  computed,
  getCurrentScope,
  onScopeDispose,
  ref,
  toValue,
  unref,
  watch,
  type Ref
} from 'vue';
import { isArray } from '../../is/isArray';

export type UseResizeObserverOptions = {
  /**
   * 是否立即执行
   * @default true
   */
  immediate: boolean;
  /**
   * 是否主动取消观察
   * @default true
   */
  autoStop?: boolean;
} & ResizeObserverOptions;
export type ResizeObserverTargets =
  | HTMLElement
  | HTMLElement[]
  | Ref<HTMLElement>
  | Ref<HTMLElement>[];
export type ResizeObserverReturn = {
  /**
   * 被动启用
   */
  start: () => void;
  /**
   * 停止
   */
  stop: () => void;
};
/**
 * 观察一个或多个元素的尺寸变化，并在变化时执行指定的回调函数。
 * @param target 需要观察的行为目标元素
 * @param callback 执行回调的函数
 * @param options 配置项
 * @example
 * ``` vue
 * <script setup lang="ts">
 * import { useResizeObserver } from "@eqian/utils-vue";
 * import {Ref, ref} from "vue";
 * const div1 = ref<HTMLElement>()
 * const {stop, start} = useResizeObserver(div1 as Ref<HTMLElement>, ({entries})=> {
 *   console.log('尺寸变化', entries)
 * })
 * </script>
 *
 * <template>
 *   <div>
 *     <div style="min-height: 100px;min-width: 100px" contenteditable ref="div1" />
 *     <button @click="()=>start()">开始</button>
 *     <button @click="()=>stop()">关闭</button>
 *   </div>
 * </template>
 *
 * ```
 */
export const useResizeObserver = (
  target: ResizeObserverTargets,
  callback: ResizeObserverCallback,
  options?: UseResizeObserverOptions
): ResizeObserverReturn => {
  let observer: ResizeObserver | undefined;
  const currentObserverFlag = ref(false); // 当前观察状态
  const {
    immediate = true,
    autoStop = true,
    box = 'content-box'
  } = options ?? ({} as unknown as UseResizeObserverOptions);
  const targets = computed(() => {
    const values = toValue(target);
    if (values && isArray(values)) {
      return values.map((el: any) => toValue(el)).filter(el => el);
    }
    if (values) {
      return [values];
    }
    return [];
  });
  /**
   * 清理观察
   */
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
  const observerElements = () => {
    const unrefTargets = unref(targets);
    if (unrefTargets.length && !currentObserverFlag.value) {
      observer = new ResizeObserver(callback);
      unrefTargets.forEach(el => observer?.observe(el, { box }));
    }
  };
  watch(
    () => targets.value,
    () => {
      cleanup();
      observerElements();
    },
    {
      immediate,
      flush: 'post'
    }
  );
  const stop = () => {
    cleanup();
    currentObserverFlag.value = false;
  };
  const start = () => {
    cleanup();
    observerElements();
    currentObserverFlag.value = true;
  };
  if (autoStop) {
    window.addEventListener('beforeunload', () => stop());
    if (getCurrentScope()) {
      onScopeDispose(stop);
    }
  }
  return {
    start,
    stop
  };
};
