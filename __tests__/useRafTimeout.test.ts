import { useRafTimeout, type UseRafTimeoutReturn } from '../src'
jest.setTimeout(2000); // 设置为10秒
describe('useRafTimeout', () => {
  let execFnMock: jest.Mock;
  let hook: UseRafTimeoutReturn;

  beforeEach(() => {
    // 在每个测试之前重置 mock 函数
    execFnMock = jest.fn();
    jest.useFakeTimers(); // 使用假定时器，以便于控制时间
  });

  afterEach(() => {
    // 确保每次测试后清除动画帧
    if (hook && hook.close){
      hook.close();
    }
    jest.clearAllTimers(); // 清除所有设定的定时器
    jest.useRealTimers(); // 恢复真实的时间环境
  });
  it('应该在达到指定的延迟后执行回调函数', () => {
    hook = useRafTimeout(execFnMock, { delay: 50 }); // 设置延迟为50ms
    expect(execFnMock).not.toHaveBeenCalled();
    // 启动定时器
    hook.start();
    jest.advanceTimersByTime(30);
    expect(execFnMock).not.toHaveBeenCalled();
    // 模拟时间再前进
    jest.advanceTimersByTime(50);
    expect(execFnMock).toHaveBeenCalled();

    // 停止后，回调不会再调用
    hook.close();
    jest.advanceTimersByTime(200); // 推进时间，执行完上次，下次时间不再执行
    expect(execFnMock).toHaveBeenCalledTimes(1);
  });
  it('当设置了 immediate 选项时，应该立即启动', () => {
    // 创建一个模拟jest的requestAnimationFrame
    const spy = jest.spyOn(window, 'requestAnimationFrame');
    const hook = useRafTimeout(execFnMock, { delay: 50, immediate: true });
    expect(spy).toHaveBeenCalled();
    jest.advanceTimersByTime(100); // 推进时间，执行完上次，下次时间不再执行
    expect(execFnMock).toHaveBeenCalled();
    hook.close();
  });
  it('当设置了 isInterval 选项时，应该周期性地调用回调函数', () => {
    const hook = useRafTimeout(execFnMock, { delay: 50, isInterval: true });
    hook.start();
    // 等等帧结束
    setTimeout(()=> {
      expect(execFnMock).toHaveBeenCalledTimes(1);
      // 第二帧结束
      setTimeout(()=> {
        expect(execFnMock).toHaveBeenCalledTimes(2);
      }, 50)
    }, 50)
  });
})
