import { toArray } from '../src';

describe('toArray', () => {
  it('should return the same array if input is an array', () => {
    const input = [1, 2, 3];
    const result = toArray(input);
    expect(result).toEqual(input);
  });

  it('should wrap a single value in an array', () => {
    const input = 42;
    const result = toArray(input);
    expect(result).toEqual([input]);
  });

  it('should handle readonly arrays correctly', () => {
    const input: readonly number[] = [1, 2, 3];
    const result = toArray(input);
    expect(result).toEqual(input);
  });

  it('should handle complex objects', () => {
    const input = { key: 'value' };
    const result = toArray(input);
    expect(result).toEqual([input]);
  });
});
