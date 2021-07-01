import deepClone from './deepClone';

describe('Unit(deepClone)', () => {
  it('should clone deep a object', () => {
    const sparseArray = [];
    sparseArray[10] = { name: 'test1' };
    sparseArray[50] = {};

    const obj = {
      str: 'string',
      num: 0,
      bool: false,
      null: null,
      und: undefined,
      numbers: [0, 1, 2, 3],
      reg: /test/i,
      date: new Date('2021-07-01 00:00:00'),
      fn: () => 'test',
      sparseArray,
      subOne: {
        subTwo: {
          name: 'one',
          subThree: {
            number: 123,
          },
        },
      },
    };

    const copy = deepClone(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);

    // Change obj sub-property must not change the copy
    obj.subOne.subTwo.name = 'two';

    expect(copy).not.toEqual(obj);
  });

  it('should clone a Date object', () => {
    const date = new Date('2021-07-01 00:00:00');

    const copy = deepClone(date);

    expect(copy).toEqual(date);
    expect(copy).not.toBe(date);
  });

  it('should clone a RegExp object', () => {
    const regex = /test/i;

    const copy = deepClone(regex);

    expect(copy).toEqual(regex);
    expect(copy).not.toBe(regex);
  });
});
