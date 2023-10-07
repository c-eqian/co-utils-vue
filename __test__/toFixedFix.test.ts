import { toFixedFix } from '../src';
describe('toFixedFix', () => {
  it('should ', () => {
    expect(toFixedFix(5201314)).toBe(5201314.0);
    expect(toFixedFix(5201314, 0)).toBe(5201314);
    expect(toFixedFix(5201314.1314, 0)).toBe(5201314);
    expect(toFixedFix(5201314.1044)).toEqual(5201314.10);
    expect(toFixedFix(5201314.1314, 2, true)).toBe(5201314.13);
    expect(toFixedFix(5201314.5554, 2, true)).toBe(5201314.56);
    expect(toFixedFix(5201314.5554, 3, true)).toBe(5201314.555);
    expect(toFixedFix(5201314.5554, 3, false)).toBe(5201314.555);
    expect(toFixedFix(5201314.5554, 2, false)).toBe(5201314.55);
  });
});
