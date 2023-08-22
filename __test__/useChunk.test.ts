import { useChunk } from '../src/packages/hooks/use-chunk';
/**
 * useChunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * useChunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
describe('useChunk', () => {
  it('shoud', () => {
    expect(useChunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd']
    ]);
    expect(useChunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(useChunk(['a', 'b', 'c', 'd'], 0)).toEqual([]);
    expect(useChunk(['a', 'b', 'c', 'd'], -1)).toEqual([]);
    expect(useChunk(['a', 'b', 'c', 'd'], -1 / 0)).toEqual([]);
    expect(useChunk(['a', 'b', 'c', 'd'], 3.5)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(useChunk(['a', 'b', 'c', 'd'], 1 / 0)).toEqual([['a'], ['b'], ['c'], ['d']]);
    // expect(useChunk(['a', 'b', 'c', 'd'], '3.5')).toEqual([[['a', 'b', 'c'], ['d']]]);
  });
});
