import { useDebounce } from '../src';
describe('useDebounce', () => {
  let mockDebounceFn: jest.Mock; // 用于模拟被节流的函数

  beforeEach(() => {
    jest.useFakeTimers(); // 使用假定时器，以便于控制时间
    mockDebounceFn = jest.fn(); // 创建一个空函数，用来模拟用户提供的函数
  });

  afterEach(() => {
    jest.clearAllTimers(); // 清除所有设定的定时器
    jest.useRealTimers(); // 恢复真实的时间环境
  });
  it('只有在最后一次调用后经过等待期才会调用函数', () => {
    const wait = 100; // 设置等待时间为 100 毫秒
    const debouncedFn = useDebounce(mockDebounceFn, wait); // 创建防抖后的函数

    // 在短时间内多次调用防抖后的函数
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // 预期原函数尚未被调用
    expect(mockDebounceFn).not.toHaveBeenCalled();

    // 模拟时间前进 50 毫秒（小于等待时间）
    jest.advanceTimersByTime(50);

    // 再次调用防抖后的函数
    debouncedFn();

    // 模拟时间再前进 50 毫秒（总共 100 毫秒）
    jest.advanceTimersByTime(50);

    // 预期原函数仍然没有被调用，因为最后一次调用发生在 50 毫秒前
    expect(mockDebounceFn).not.toHaveBeenCalled();

    // 模拟时间再前进 50 毫秒（总共 150 毫秒，超过了等待时间）
    jest.advanceTimersByTime(50);

    // 预期原函数现在应该被调用了一次
    expect(mockDebounceFn).toHaveBeenCalledTimes(1);
  });
  it('确保最后一次调用后经过等待期调用一次函数', () => {
    const wait = 100; // 设置等待时间为 100 毫秒
    const debouncedFn = useDebounce(mockDebounceFn, wait); // 创建防抖后的函数

    // 调用防抖后的函数
    debouncedFn();

    // 模拟时间前进 100 毫秒
    jest.advanceTimersByTime(wait);

    // 预期原函数被调用了一次
    expect(mockDebounceFn).toHaveBeenCalledTimes(1);

    // 再次调用防抖后的函数
    debouncedFn();

    // 模拟时间前进 100 毫秒
    jest.advanceTimersByTime(wait);

    // 预期原函数再次被调用了一次
    expect(mockDebounceFn).toHaveBeenCalledTimes(2);
  });
});
