import { useSortByKey } from '../src';
describe('useSortByKey', () => {
  it('should ', function () {
    expect(
      useSortByKey([4, 8, 3, 4, 5, 7, 9, 40, 574], {
        order: 'dec'
      })
    ).toEqual([574, 40, 9, 8, 7, 5, 4, 4, 3]);
    expect(
      useSortByKey([4, 8, 3, 4, 5, 7, 9, 40, 574], {
        order: 'asc'
      })
    ).toEqual([574, 40, 9, 8, 7, 5, 4, 4, 3].sort((a, b) => a - b));
    expect(
      useSortByKey(
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
      useSortByKey(
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
      useSortByKey(
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
      useSortByKey(
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
    expect(useSortByKey([[], []])).toEqual([[], []]);
    expect(
      useSortByKey([9, 8, 6, 8, 7, 2], {
        order: 'asc'
      })
    ).toEqual([2, 6, 7, 8, 8, 9]);
  });
});
