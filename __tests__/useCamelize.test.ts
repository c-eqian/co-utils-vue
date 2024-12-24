import { useCamelize } from '../src';

describe('useCamelize', () => {
  it(`useCamelize`, () => {
    expect(useCamelize('name')).toEqual('name');
    expect(useCamelize('user-name')).toEqual('userName');
    expect(useCamelize('-user-name')).toEqual('-user-name');
    expect(useCamelize('user-name', true)).toEqual('UserName');
  });
});
