import { useThrottle } from '../src';
describe('useThrottle', () => {
  let mockFn: jest.Mock; // 用于模拟被节流的函数

  beforeEach(() => {
    jest.useFakeTimers(); // 使用假定时器，以便于控制时间
    mockFn = jest.fn(); // 创建一个空函数，用来模拟用户提供的函数
  });

  afterEach(() => {
    jest.clearAllTimers(); // 清除所有设定的定时器
    jest.useRealTimers(); // 恢复真实的时间环境
  });
  it('在等待期内只调用一次函数 ', () => {
    const throttledFn = useThrottle(mockFn, 100);
    throttledFn();
    throttledFn();
    throttledFn();
    // 预期原函数只被调用了一次
    expect(mockFn).toHaveBeenCalledTimes(1);
    // 模拟时间前进 100 毫秒
    jest.advanceTimersByTime(100);
    // 再次调用节流后的函数
    throttledFn();
    // 预期原函数又被调用了一次
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('首次调用时立即执行函数', () => {
    const wait = 100; // 设置等待时间为 100 毫秒
    const throttledFn = useThrottle(mockFn, wait); // 创建节流后的函数

    // 首次调用节流后的函数
    throttledFn();

    // 预期原函数立即被调用
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it('确保前一次调用完成之前不会再次调用', () => {
    const wait = 100; // 设置等待时间为 100 毫秒
    const throttledFn = useThrottle(mockFn, wait); // 创建节流后的函数

    // 在等待期内多次调用节流后的函数
    throttledFn();
    throttledFn();
    throttledFn();

    // 模拟时间前进 50 毫秒（小于等待时间）
    jest.advanceTimersByTime(wait / 2);
    throttledFn();
    // 预期原函数仍然只被调用了一次
    expect(mockFn).toHaveBeenCalledTimes(1);

    // 模拟时间再前进 50 毫秒（总共 100 毫秒）
    jest.advanceTimersByTime(wait / 2);
    throttledFn();
    // 预期原函数又被调用了一次
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
