import { deepObjectValue } from '../src';

describe('deepObjectValue', () => {
  it('deepObjectValue returns value', () => {
    const data = {
      data: {
        a: 'b'
      }
    };
    expect(deepObjectValue(data, 'data.a')).toEqual('b');
  });
});
