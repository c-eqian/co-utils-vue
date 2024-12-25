import {  ref } from 'vue';
import { useResizeObserver, type ResizeObserverReturn} from '../src';

// 模拟ResizeObserver
window.ResizeObserver = window.ResizeObserver ||  jest.fn().mockImplementation((cb:any) => {
  cb()
  return {
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }
});
describe('useResizeObserver', () => {
  const callback = jest.fn(); // 创建一个模拟的回调函数
  let result:ResizeObserverReturn;

  beforeEach(() => {
    // 清除之前可能设置的 mock 实例
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 确保每次测试后都清理 ResizeObserver
    if (result.stop) result.stop();
  });

  it('应该创建一个ResizeObserver，并在启动时观察目标元素', () => {
    // 创建一个模拟的目标元素
    const target = ref(document.createElement('div'));
    // 调用 useResizeObserver
    result = useResizeObserver(target, callback, {
      immediate: false,
    });
    expect(window.ResizeObserver).not.toHaveBeenCalled(); // 确认 ResizeObserver 尚未被调用
    // 手动开启
    result.start();
    expect(window.ResizeObserver).toHaveBeenCalledTimes(1); // 确认 ResizeObserver 已被调用
  });
  it('改变元素大小 resize',  () => {
    // 创建一个模拟的目标元素
    const target = ref(document.createElement('div'));
    // 调用 useResizeObserver
    result = useResizeObserver(target, callback, {
      immediate: false,
    });
    expect(window.ResizeObserver).not.toHaveBeenCalled(); // 确认 ResizeObserver 尚未被调用
    // 手动开启
    result.start();
    expect(window.ResizeObserver).toHaveBeenCalledTimes(1); // 确认 ResizeObserver 已被调用
    // 改变元素大小
    target.value.style.width = '100px';
    target.value.style.height = '50px';
    target.value.innerHTML = '改变元素大小';

    expect(callback).toHaveBeenCalledTimes(1); // 确认 ResizeObserver 已被调用
  });
  it('立即执行 immediate',  () => {
    // 创建一个模拟的目标元素
    const target = ref(document.createElement('div'));
    // 调用 useResizeObserver
    result = useResizeObserver(target, callback, {
      immediate: true,
    });
    expect(window.ResizeObserver).toHaveBeenCalledTimes(1); // 确认 ResizeObserver 已被调用
    // 改变元素大小
    target.value.style.width = '100px';
    target.value.style.height = '100px';
    target.value.innerHTML = '改变元素大小';

    expect(callback).toHaveBeenCalledTimes(1); // 确认 ResizeObserver 已被调用
  });
});
