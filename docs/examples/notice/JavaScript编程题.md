#JS数据转换

**笔试题**

假设有这样一组数据，将其转换成树形结构的形式

```javascript
   [{ parent: null, id: 1, name: '北京' },
    { parent: 1, id: 11, name: '朝阳' },
    { parent: 11, id: 111, name: '朝阳1号' },
    { parent: 1, id: 12, name: '海淀' },
    { parent: 12, id: 121, name: '海淀1号' },
    { parent: null, id: 2, name: '上海' },
    { parent: 2, id: 21, name: '浦东' },
    { parent: 21, id: 211, name: '浦东1号' },
    { parent: 2, id: 22, name: '虹口' },
    { parent: 22, id: 221, name: '虹口1号'}]
```

输出结果：

```javascript
[
  {
    "parent": null,
    "id": 1,
    "name": "北京",
    "children": [
      {
        "parent": 1,
        "id": 11,
        "name": "朝阳",
        "children": [
          {
            "parent": 11,
            "id": 111,
            "name": "朝阳1号"
          }
        ]
      },
      {
        "parent": 1,
        "id": 12,
        "name": "海淀",
        "children": [
          {
            "parent": 12,
            "id": 121,
            "name": "海淀1号"
          }
        ]
      }
    ]
  },
  {
    "parent": null,
    "id": 2,
    "name": "上海",
    "children": [
      {
        "parent": 2,
        "id": 21,
        "name": "浦东",
        "children": [
          {
            "parent": 21,
            "id": 211,
            "name": "浦东1号"
          }
        ]
      },
      {
        "parent": 2,
        "id": 22,
        "name": "虹口",
        "children": [
          {
            "parent": 22,
            "id": 221,
            "name": "虹口1号"
          }
        ]
      }
    ]
  }
]
```

**方法一**

```
思路：在不是根节点的情况下，当前对象通过遍历每一个除自身外的所有对象进行比较，
如果其parent与数组里面的某一个item的id匹配，即说明找到其（value的）父节点
```

```JavaScript
 //封装函数
function transFunc(item) {
            let tree = [],
            current;
            //遍历数组里面的每一条数据
            item.forEach((value,index)=>{
                //根据parent属性，判断是否为根节点
                if (value.parent==null) {
                    //找到根节点，保存根节点
                    tree.push(value)
                }
                //非根节点情况下，寻找它的父节点或者节点
                else{
                    /*
                    思路：在不是根节点的情况下，当前对象通过遍历每一个除自身外的所有对象进行比较，
                    如果其parent与数组里面的某一个item的id匹配，即说明找到其（value的）父节点
                     */
                    for (let i = 0; i < item.length-1; i++) {
                        //除自身以外的对象
                        if(index!==i){
                            if (item[i].id===value.parent) {
                                 //找到父节点，将当前对象赋值到current
                                 current = item[i];
                                current.children?current.children.push(value):(current.children=[value])
                            }
                        }
                    }
                } 
            })
            return tree

        }
    var items  = [{ parent: null, id: 1, name: '北京' },
    { parent: 1, id: 11, name: '朝阳' },
    { parent: 11, id: 111, name: '朝阳1号' },
    { parent: 1, id: 12, name: '海淀' },
    { parent: 12, id: 121, name: '海淀1号' },
    { parent: null, id: 2, name: '上海' },
    { parent: 2, id: 21, name: '浦东' },
    { parent: 21, id: 211, name: '浦东1号' },
    { parent: 2, id: 22, name: '虹口' },
    { parent: 22, id: 221, name: '虹口1号'}]
    console.log(JSON.stringify(transFunc(items),null,2))
```

**方法二**

这个方法引用自：

[JS数据转换 —— 树形结构和平铺结构的转换](https://blogcsdn.net/weixin_57163112/article/details/119442977?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163419530416780255246913%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163419530416780255246913&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-6-119442977.first_rank_v2_pc_rank_v29&utm_term=js+%E7%9C%81%E5%B8%82%E6%95%B0%E6%8D%AE%E8%BD%AC%E6%8D%A2&spm=1018.2226.3001.4187)



```javascript
  function arrToTree(arr, pid = null) {
    const res = [];
    arr.forEach(item => {
      if (item.pid === pid) {
        // 这样每次都需要遍历整个数组，因此时间复杂度为 n*n
        // const children = arrToTree(arr, item.id)

        // 往下递归时，每次数组的大小都在减小，每次都筛选掉父代元素，最终的时间复杂度为 n*logn
        const children = arrToTree(arr.filter(v => v.pid !== pid), item.id);
        if (children.length) {
          res.push({ ...item, children })
        } else {
          res.push({ ...item })
        }
      }
    });
    return res;
  }
```

# 实现深拷贝

其实深拷贝和浅拷贝都是针对的引用类型，JS中的变量类型分为值类型（基本类型）和引用类型；对值类型进行复制操作会对值进行一份拷贝，而对引用类型赋值，则会进行地址的拷贝，最终两个变量指向同一份数据

```javascript
/**
 * 实现深拷贝
 * @param {*} obj 
 */
function deepClone(source, hash = new WeakMap()){
  // 如果不是引用类型，直接return
  if (typeof source !== 'object' || source === null) return source;
  // 使用hash判断循环引用问题,如果存在，则获取这个值，并返回
  if (hash.has(source)) return hash.get(source);
    // 判断是否是数组
  let target = Array.isArray(source) ? [] : {};
  // 哈希保存
  hash.set(source, target);
  // 解决Symbol类型
  let symKeys = Object.getOwnPropertySymbols(source);
  // 解决存在Symbol类型
  if (symKeys.length) {
    // 遍历
    symKeys.forEach(symKey => {
      // 再判断是否是引用类型
      if ( typeof source[symKey] !== 'object' || source[symKey] === null){
        target[symKey] = source[symKey];
      }
      else {
        // 是引用类型，使用递归
        target[symKey] = deepClone(source[symKey], hash);
      }

    })
  }
  // 解决引用类型
  for(var key in source) {
    // 判断原型上是否存在自身属性
    if(Object.prototype.hasOwnProperty.call(source, key)){
      // 在判断是是引用类型
      if( typeof source[key] === 'object' && source[key] !== null) {
        //是引用类型-> 递归
        target[key] = deepClone(source[key], hash)
      } else {
        // 不是，直接赋值
        target[key] = source[key];
      }
    }
  }
  // 最后返回深拷贝内容
  return target;

}
```

```javascript
// 测试用例
var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
}
var sym1 = Symbol("a"); // 创建新的symbol类型
var sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol

a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";
var b = deepClone(a);
a.a1 = 222
a.book.title = '测试'
console.log(b);

/*
{
{
  name: 'muyiy',
  book: { title: "You Don't Know JS", price: '45' },
  a1: undefined,
  a2: null,
  a3: 123,
  [Symbol(a)]: 'localSymbol',
  [Symbol(b)]: 'globalSymbol'
}
*/

```

# 判断回文

- 分割字符串，得到数组
- 将数组翻转
- 翻转数组拼接

```javascript
/**
 * 判断是否是回文
 * @param {*} str 
 */
function stringReverse(str) {
  return str === str.split('').reverse().join('')
}
```

# 数组去重

## 使用`ES6 `Set方法

```javascript
/**
 * 数组去重
 * 使用Set方法
 * @param {*} arr 
 * @returns 
 */
function unique(arr){
  return [...new Set(arr)]
}
```

## 使用数组includes方法

```javascript
/**
 * 数组去重
 * 使用数组includes方法
 * @param {*} arr 
 * @returns 
 */
function unique(arr){
  let newArr = [];
  for(var i in arr){
    if(!newArr.includes(arr[i])){
      newArr.push(arr[i])
    }
  }
  return newArr
}
```

## 使用object

```javascript
/**
 * 数组去重
 * 使用数组object对象方法
 * @param {*} arr 
 * @returns 
 */
function unique(arr){
  let newArr = [];
  let arrObject = {};
  for(var i in arr){
    if(!arrObject[arr[i]]){
      newArr.push(arr[i])
      arrObject[arr[i]] = true;
    }
  }
  return newArr
}
```

# 不借助临时变量，进行两个整数的交换

```javascript
/**
 * 利用 + -
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function swap(a, b){
  b = b-a;
  a = b + a;
  b = a - b
  return [a, b]
}
```

# 找出下列正数组的最大差值

## 使用数组sort排序

```javascript
/**
 * 找出最大差值比，使用数组的排序方法
 * @param {*} arr 
 * @returns 
 */
function getMaxProfit(arr){
  arr.sort((x,y)=> x- y)
  // 得到最大值
  let maxValue = arr[arr.length - 1];
    // 得到最小值
  let minValue = arr[0];
  return maxValue - minValue
}
```

## 使用Math中max/min方法

```javascript
/**
 * 找出最大差值比，使用Math.min/max.apply()方法
 * @param {*} arr 
 * @returns 
 */
function getMaxProfit(arr){
  // 得到最大值
  let maxValue = Math.max.apply(null, arr);
    // 得到最小值
  let minValue = Math.min.apply(null, arr);
  return maxValue - minValue
}
```

# 随机生成指定长度的字符串

```javascript
/**
 * 随机生成指定长度字符串, charAt取出指定位置字符
 * @param {*} str 
 * @param {*} n 
 * @returns 
 */
function randomString(str, n){
  let temp = '',
  len = str.length;
  for(var i = 0;i< n; i++) {
    temp += str.charAt(Math.floor(Math.random() * len))
  }
  return temp
}
let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
console.log(randomString(str, 8))
```

# 阶乘

## 使用递归

```javascript
/**
 * 阶乘 递归方式
 * @param {*} n 
 * @returns 
 */
function factorial(n) {
  // 判断是否是number
  if(typeof n !=='number') throw new Error('');
  // 判断是否是1
  if(n===1 || n===0) return n;
  return n * factorial(n-1)
}
```

## ES6尾调用优化

函数调用会有一个“调用记录”，也称为`“调用帧”`，用于保存调用位置和内部变量等信息。
如函数A里调用了函数B，则A的调用记录上会记录B的调用记录，等待B执行完毕后将结果给A，B才会消失。如果函数B调用了函数C，也会生成一个C的调用记录，以此类推，所有的记录就形成了`“调用栈”`。

```javascript
/**
 * 阶乘 尾调用
 * @param {*} n 
 * @returns 
 */
function factorial(n, total=1) {
  // 判断是否是number
  if(typeof n !=='number') throw new Error('');
  // 判断是否是1
  if(n===1 || n===0) return total;
  return factorial(n-1, n*total)
}
```

# 出现次数最多的字符

## 使用对象key唯一性

```javascript
/**
 * 出现频率最多的字符， 使用对象key唯一性
 * @param {*} str 
 * @returns 
 */
function maxNum(str){
  // 创建对象，保存字符出现的次数
  let obj = {};
  let strArr = str.split('');
  for(var i=0; i< strArr.length; i++){
    //如果没有出现，则设置次数为1
    if(!obj[strArr[i]]){
      obj[strArr[i]] = 1;
    }else{
      obj[strArr[i]] += 1;
    }
  }
  // 取对象最大值
  let maxValue = Math.max.apply(null, Object.values(obj))
  // 考虑到频率最多的字符有可能相同
  let maxArr = []
  // Object.entries(obj)拿到对象和值，[[a,1],...]
  Object.entries(obj).forEach(item=>{
    if(item[1]===maxValue) { 
      maxArr.push(item[0])
    }
  })
  return maxArr.length > 1? maxArr : maxArr[0]
  
}
```

# 冒泡排序

相邻的数据进行两两比较，小数放在前面，大数放在后面，这样一趟下来，最小的数就被排在了第一位，第二趟也是如此，如此类推，直到所有的数据排序完成。

```javascript
/**
 * 冒泡排序
 * @param {*} arr 
 * @returns 
 */
function bubbleSort(arr) {
  // 只有一个，直接返回
  if (arr.length === 1) return arr;
  for(var i=0; i<arr.length; i++) {
    for (var j=i+1; j< arr.length; j++){
      if(arr[i]> arr[j]) {
        // 临时变量存储
        let temp = arr[i];
        //交换位置
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
```

# 快速排序

　　（1）在数据集之中，选择一个元素作为"基准"（pivot）。

　　（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

　　（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

```javascript
/**
 * 快速排序
 * @param {*} arr 
 * @returns 
 */
function quickSort(arr){
  // 如果只有一个直接返回
  if(arr.length <= 1) return arr;
  // 折中，找到基准点
  let pivotIndex = Math.floor(arr.length / 2);
  // 找到基准点，splice会改变原数组，当我们使用基准点的时候，此时原数组不存在基准点值
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for(let i = 0; i < arr.length; i++) {
    // 小于基准点的移动到前面，大移到后
    arr[i] > pivot ? right.push(arr[i]) : left.push(arr[i])
    // if(arr[i] > pivot) {
    //   right.push(arr[i])
    // }else {
    //   left.push(arr[i])
    // }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
```

# 数组扁平化处理

## 基础方法

```JavaScript
/**
 * 数组扁平化
 * @param {*} arr 
 * @returns 
 */
function arrFlat(arr) {
  let temp = []
  // 递归寻找为数组的数据进行处理
  const diff = function(isArr) {
    if (Array.isArray(isArr)) {
      for (let i = 0; i < isArr.length; i++) {
        diff(isArr[i])
      }
    }else {
      temp.push(isArr)
    }
  }
    // 判断有没有嵌套数组
  if (arr.some(item => Array.isArray(item))) {
    diff(arr)
  } else {
    return arr
  }
  return temp
}
console.log(arrFlat([1,2,3,[4,5,[7,8,9,[8,7]]],[6,[7,8]]]))

```

## 进阶

```javascript
/**
 * 数组扁平化-进阶
 * @param {*} arr 
 * @returns 
 */
 function arrFlat(arr) {
  // 判断是否嵌套数组
  if(!arr.some(item => Array.isArray(item))) {
    return arr
  }
  // 利用 concat拼接（concat(...arr)只能解构一层嵌套的数组）
  return arrFlat([].concat(...arr))
}
```

# 实现柯里化-无限累加

```javascript
/**
 * 柯里化求和
 */
const fn = function(num) {
  // 判断后面是否还有参数
  let total = 0
  total += num
  return function fn(num) {
    if (num){
      total += num
    }
    if (arguments.length) {
      return fn
    }
    return total
  }
}
console.log(fn(1)(2)(3)())
```

