/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-09-24 11:55:25
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-18 19:38:40
 */
// import { deepClone } from "../src/index";
// const {deepClone} = require('../dist/index')
// import { cloneDeep } from '../dist/index';
import { cloneDeep } from '../dist/index';

const target = {
  test1: 1,
  test2: undefined,
  test3: {
    child: '123'
  },
  test4: [{
    test1: '123',
    test2: '123',
    test3: [1, 2, 3]
  }]
};
const a = target;
const b = cloneDeep(target);
console.log(target);
a.test1 = 36;
b.test1 = 98;
console.log(a, b.test4, target);
