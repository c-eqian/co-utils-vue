import { useEncPhone } from '../src';

describe('useEncPhone', () => {
  it(`useEncPhone`, () => {
    expect(useEncPhone('19994402235')).toEqual('199****2235');
    expect(useEncPhone('199994402')).toEqual('199994402');
  });
});
