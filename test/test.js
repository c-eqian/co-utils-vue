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
import { usePick } from '../dist/index';

const test = {
  book: '倚天屠龙记',
  name: '金庸',
  price: '18',
  likes: '999'
};
console.log(usePick(test, ['name', 'likes']));
