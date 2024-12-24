import { useEncCard } from '../src';

describe('useEncCard', () => {
  it(`useEncCard`, () => {
    expect(useEncCard('450616199905206666')).toEqual('450616****6666');
    expect(useEncCard('450616199905')).toEqual('450616199905');
  });
});
