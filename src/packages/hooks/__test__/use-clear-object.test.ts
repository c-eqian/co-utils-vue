import { useClearObject } from '@/packages/hooks/use-clear-object';
describe('useClearObject', () => {
  const data = {
    key: '8899797',
    nested: {
      ll: '123',
      deep: {
        nestedKey: 'nestedValue'
      }
    }
  };
  const defaultValue = {
    key: '',
    nested: {
      ll: '',
      deep: {
        nestedKey: ''
      }
    }
  };
  it('测试用例1', () => {
    expect(useClearObject(data)).toEqual(defaultValue);
  });
  it('测试用例2', () => {
    expect(
      useClearObject(data, {
        nested: {
          deep: {
            nestedKey: '8888'
          }
        }
      })
    ).toEqual({
      key: '',
      nested: {
        ll: '',
        deep: {
          nestedKey: '8888'
        }
      }
    });
  });
  it('测试用例3', () => {
    expect(
      useClearObject(data, {
        nested: {
          deep: {
            nestedKey: '8989'
          }
        }
      })
    ).toEqual({
      key: '',
      nested: {
        ll: '',
        deep: {
          nestedKey: '8989'
        }
      }
    });
  });
});
