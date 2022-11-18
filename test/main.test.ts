/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-18 20:00:56
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-18 20:49:54
 */
import { cloneDeep } from '../src';

describe('Name of the group', () => {
  test('should ', () => {
    console.log = jest.fn();
    cloneDeep({
      a: 1,
      b: 2
    });
    // The first argument of the first call to the function was 'hello'
    expect(console.log).toHaveBeenCalledWith('hello world');
  });
});
