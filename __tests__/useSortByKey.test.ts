import { useSort } from '../src';
describe('useSortByKey', () => {
  it('should ', function () {
    expect(
      useSort([4, 8, 3, 4, 5, 7, 9, 40, 520], {
        order: 'dec'
      })
    ).toEqual([520, 40, 9, 8, 7, 5, 4, 4, 3]);
    expect(
      useSort([4, 8, 3, 4, 5, 7, 9, 40, 520], {
        order: 'asc'
      })
    ).toEqual([3, 4, 4, 5, 7, 8, 9, 40, 520]);
    expect(
      useSort(
        [
          {
            name: '2',
            age: 19
          },
          {
            name: '1',
            age: 18
          }
        ],
        {
          order: 'dec',
          key: 'age'
        }
      )
    ).toEqual([
      {
        name: '2',
        age: 19
      },
      {
        name: '1',
        age: 18
      }
    ]);
    expect(
      useSort(
        [
          {
            name: '2',
            age: '19'
          },
          {
            name: '1',
            age: '18'
          }
        ],
        {
          order: 'dec',
          key: 'age'
        }
      )
    ).toEqual([
      {
        name: '2',
        age: '19'
      },
      {
        name: '1',
        age: '18'
      }
    ]);
    expect(
      useSort(
        [
          {
            name: '2',
            age: 19
          },
          {
            name: '1',
            age: 18
          }
        ],
        {
          order: 'dec',
          key: 'name'
        }
      )
    ).toEqual([
      {
        name: '2',
        age: 19
      },
      {
        name: '1',
        age: 18
      }
    ]);
    expect(
      useSort(
        [
          {
            name: '2',
            age: 19
          },
          {
            name: '1',
            age: 18
          }
        ],
        {
          order: 'dec',
          key: 'age',
          compareFn: (a, b) => {
            return b.age - a.age;
          }
        }
      )
    ).toEqual([
      {
        name: '2',
        age: 19
      },
      {
        name: '1',
        age: 18
      }
    ]);
    expect(useSort([[], []])).toEqual([[], []]);
    expect(
      useSort([9, 8, 6, 8, 7, 2], {
        order: 'asc'
      })
    ).toEqual([2, 6, 7, 8, 8, 9]);
  });
});
