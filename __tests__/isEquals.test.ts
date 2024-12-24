import { isBaseEquals, isEquals } from '../src';

describe('isEquals', () => {
  it(`基本数据类型`, () => {
    expect(isEquals(null, null)).toBeTruthy();
    expect(isEquals(1, 1)).toBeTruthy();
    expect(isEquals(+0, -0)).toBeTruthy();
    expect(isEquals(+0, 0)).toBeTruthy();
    expect(isEquals(-0, 0)).toBeTruthy();
    expect(isEquals('null', 'null')).toBeTruthy();
    expect(isEquals(undefined, undefined)).toBeTruthy();
    expect(isEquals(NaN, NaN)).toBeTruthy();

    expect(isEquals(null, undefined)).toBeFalsy();
    expect(isEquals(1, undefined)).toBeFalsy();
    expect(isEquals('null', null)).toBeFalsy();
    expect(isEquals(undefined, '')).toBeFalsy();
    expect(isBaseEquals(1, '1')).toBeFalsy();
    expect(isBaseEquals(1, '1', true)).toBeTruthy();
  });
  it(`引用数据类型 数组`, () => {
    expect(isEquals([], [])).toBeTruthy();
    expect(isEquals([1], [1])).toBeTruthy();
    expect(isEquals([{}], [{}])).toBeTruthy();
    expect(isEquals([{ a: 1 }], [{ a: 2 }])).toBeFalsy();
    expect(isEquals([], {})).toBeFalsy();
  });
  it(`引用数据类型 对象`, () => {
    const obj1: any = { a: 1, b: { c: 2 } };
    const obj2: any = { a: 1, b: { c: 2 } };
    const obj3 = obj1;
    const obj4 = { a: 1, b: obj1 };
    obj1.self = obj1;
    obj2.self = obj2;
    expect(isEquals(obj1, obj2)).toBeTruthy();
    expect(isEquals(obj1, obj3)).toBeTruthy();
    expect(isEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy();
    expect(isEquals(obj1, obj4)).toBeFalsy();
  });
  it(`引用数据类型 继承关系`, () => {
    function Parent() {
      this.parentProp = 'parentValue';
    }
    Parent.prototype.protoProp = 'protoValue';
    function Child() {
      Parent.call(this); // 继承父类属性
      this.childProp = 'childValue';
    }
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.prototype.childProtoProp = 'childProtoValue';
    const parent1 = new Parent();
    const parent2 = new Parent();
    const child1 = new Child();
    const child2 = new Child();
    expect(isEquals(parent1, parent2)).toBeTruthy();
    expect(isEquals(child1, child2)).toBeTruthy();
    // 测试带有循环引用的继承
    child1.self = child1;
    child2.self = child2;
    expect(isEquals(child1, child2)).toBeTruthy();
    //  测试原型链上的属性
    expect(isEquals(Object.getPrototypeOf(child1), Object.getPrototypeOf(child2))).toBeTruthy();
    // 测试原型链上的不同属性
    Child.prototype.childProtoProp = 'differentValue';
    const _child1 = new Child();
    expect(isEquals(_child1, child2)).toBeFalsy();
    expect(isEquals(_child1, child1)).toBeFalsy();
  });
});
describe('isBaseEquals', () => {
  it(`基本数据类型`, () => {
    expect(isBaseEquals(null, null)).toBeTruthy();
    expect(isBaseEquals(+0, -0)).toBeTruthy();
    expect(isBaseEquals(undefined, undefined)).toBeTruthy();
    expect(isBaseEquals(NaN, NaN)).toBeTruthy();
    expect(isBaseEquals(1, '1')).toBeFalsy();
    expect(isBaseEquals(1, '1', true)).toBeTruthy();
  });
  it(`引用数据类型 数组`, () => {
    const a = [];
    const b = a;
    expect(isBaseEquals(a, b)).toBeTruthy();
    expect(isBaseEquals([], [])).toBeFalsy();
    expect(isBaseEquals([1], [1])).toBeFalsy();
    expect(isBaseEquals([{}], [{}])).toBeFalsy();
    expect(isBaseEquals([{ a: 1 }], [{ a: 2 }])).toBeFalsy();
    expect(isBaseEquals([], {})).toBeFalsy();
  });
  it(`引用数据类型 对象`, () => {
    const obj1: any = { a: 1, b: { c: 2 } };
    const obj2: any = { a: 1, b: { c: 2 } };
    const obj3 = obj1;
    const obj4 = { a: 1, b: obj1 };
    obj1.self = obj1;
    obj2.self = obj2;
    expect(isBaseEquals(obj1, obj2)).toBeFalsy();
    expect(isBaseEquals(obj1, obj3)).toBeTruthy();
    expect(isBaseEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeFalsy();
    expect(isBaseEquals(obj1, obj4)).toBeFalsy();
  });
});
