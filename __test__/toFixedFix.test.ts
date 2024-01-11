import { useToFixedFix } from '../src';
describe('toFixedFix', () => {
  it('should ', () => {
    expect(useToFixedFix(5201314)).toBe(5201314.0);
    expect(useToFixedFix(5201314, 0)).toBe(5201314);
    expect(useToFixedFix(5201314.1314, 0)).toBe(5201314);
    expect(useToFixedFix(5201314.1044)).toEqual(5201314.10);
    expect(useToFixedFix(5201314.1314, 2, true)).toBe(5201314.13);
    expect(useToFixedFix(5201314.5554, 2, true)).toBe(5201314.56);
    expect(useToFixedFix(5201314.5554, 3, true)).toBe(5201314.555);
    expect(useToFixedFix(5201314.5554, 3, false)).toBe(5201314.555);
    expect(useToFixedFix(5201314.5554, 2, false)).toBe(5201314.55);
  });
});
