import { getAge } from '../src/packages';

describe('getAge', () => {
  it('should ', () => {
    expect(getAge('450616199905206666')).toBe(24);
    expect(getAge('450616199908206666')).toBe(24);
    expect(getAge('450616299908206666')).toBe(-1);
    expect(getAge('450616199907266666')).toBe(24);
  });
});
