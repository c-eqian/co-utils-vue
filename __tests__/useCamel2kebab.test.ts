import { useCamel2kebab } from '../src';
describe('useCamel2kebab', () => {
  it('测试 useCamel2kebab ', () => {
    expect(useCamel2kebab('cName')).toEqual('c-name');
    expect(useCamel2kebab('userName')).toEqual('user-name');
    expect(useCamel2kebab('CName')).toEqual('c-name');
    expect(useCamel2kebab('UserName')).toEqual('user-name');
    expect(useCamel2kebab('user-name')).toEqual('user-name');
    expect(useCamel2kebab('userName', '_')).toEqual('user_name');
    expect(useCamel2kebab('username')).toEqual('username');
  });
});
