import { usePriceToThousand } from '../src';
describe('usePriceToThousand', () => {
  /**
   * price – 金额
   * decimals – 需要保留小数点 默认2
   * separator – 千分位符号 默认”,”
   * round – 是否四舍五入
   */
  it('should ', () => {
    /**
     * 默认参数
     */
    expect(usePriceToThousand(201314)).toBe('201,314.00');
    expect(usePriceToThousand(201314, 0)).toBe('201,314');
    expect(usePriceToThousand(201314.1314, 0)).toBe('201,314');
    expect(usePriceToThousand(201314.5354, 2)).toBe('201,314.54');
    expect(usePriceToThousand(201314.5354, 2, ',', false)).toBe('201,314.53');
    expect(usePriceToThousand(201314.5354, 0, ',', true)).toBe('201,315');
    expect(usePriceToThousand(201314.5354, 0, ',', false)).toBe('201,314');
    expect(usePriceToThousand(201314.36548, 3)).toBe('201,314.365');
    expect(usePriceToThousand(201314.36548, 3, '-')).toBe('201-314.365');
    expect(usePriceToThousand(201314.36568, 3, '-', true)).toBe('201-314.366');
    expect(usePriceToThousand(201314.36568, 3, '-', false)).toBe('201-314.365');
    expect(usePriceToThousand(201314.36568, Infinity, '-', false)).toBe('201-314.36');
    expect(usePriceToThousand('tt201314.36568', 3, '-', false)).toBe('00.00');
  });
});
