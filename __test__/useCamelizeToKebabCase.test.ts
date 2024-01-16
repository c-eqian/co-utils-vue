import { useCamelizeToKebabCase } from '../src';
describe('useCamelizeToKebabCase', () => {
  it('测试 useCamelizeToKebabCase ', () => {
    expect(useCamelizeToKebabCase('cName')).toEqual('c-name');
    expect(useCamelizeToKebabCase('userName')).toEqual('user-name');
    expect(useCamelizeToKebabCase('CName')).toEqual('c-name');
    expect(useCamelizeToKebabCase('UserName')).toEqual('user-name');
    expect(useCamelizeToKebabCase('user-name')).toEqual('user-name');
  });
});
