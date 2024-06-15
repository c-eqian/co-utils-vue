import { useFirstToUpper } from '../src';

describe('useFirstToUpper', () => {
  it(`useFirstToUpper`, () => {
    expect(useFirstToUpper('abc')).toEqual('Abc');
    expect(useFirstToUpper('aBc-d')).toEqual('ABc-d');
    expect(useFirstToUpper('ABc-d')).toEqual('ABc-d');
  });
});
