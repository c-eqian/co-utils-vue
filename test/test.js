// import { deepClone } from "../src/index";
// const {deepClone} = require('../dist/index')
import { deepClone } from "../dist/index";

const target = {
    test1: 1,
    test2: undefined,
    test3: {
        child: '123'
    },
    test4: [ {
        test1 : '123',
        test2 : '123',
        test3 : [1,2,3],
    }]
};
let a  = target;
let b = deepClone(target)
console.log(target)
a.test1 = 36;
b.test1 = 98;
console.log(a, b.test4, target)