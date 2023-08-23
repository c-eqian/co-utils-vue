import { useLabelByVal } from '../src';
describe('useLabelByVal', () => {
  const testConfig1 = [
    {
      label: '苹果',
      value: 'apple'
    },
    {
      label: '香蕉',
      value: 'banana'
    },
    {
      label: '梨',
      value: 'pear'
    }
  ];
  const testConfig2 = [
    {
      label1: '苹果',
      value1: 'apple'
    },
    {
      label1: '香蕉',
      value1: 'banana'
    },
    {
      label1: '梨',
      value1: 'pear'
    }
  ];
  it('格式一', () => {
    expect(useLabelByVal(testConfig1, 'banana')).toEqual('香蕉');
    expect(useLabelByVal(testConfig1, 'glass')).toEqual('');
  });
  it('格式二', () => {
    expect(
      useLabelByVal(testConfig2, 'banana', {
        valueKey: 'value1',
        labelKey: 'label1'
      })
    ).toEqual('香蕉');
    expect(useLabelByVal(testConfig2, 'glass')).toEqual('');
  });
});
