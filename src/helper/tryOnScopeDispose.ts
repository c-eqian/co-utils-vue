import { getCurrentScope, onScopeDispose } from 'vue';

/**
 * 如果有的话，返回当前活跃的 effect 作用域。
 * 在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。
 * @see https://cn.vuejs.org/api/reactivity-advanced.html#getcurrentscope
 * @param fn
 */
export function tryOnScopeDispose(fn: any) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
