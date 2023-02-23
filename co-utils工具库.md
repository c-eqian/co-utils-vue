---
title: co-utils工具库v2
date: 2022-11-24 19:26:06
author: 秋谨
---
<Boxx/>

# 介绍

co-utils工具库是基于typescript实现的一个常用库封装

# 安装

```bash
npm install co-utils -D
```

# 使用

## 格式化

### formatDate

`formatDate`将时间进行格式化输出，支持时间戳、标准时间等。`date`参数为转换时间，`format`默认输出格式`yyyy-MM-dd`

-  **时间戳**

```javascript
console.log('时间戳', formatDate(1669290652000) ) // 2022-11-24
```

- **时间**

```javascript
console.log('时间戳', formatDate(new Date()) ) // 2022-11-24
```

- **指定格式**

```javascript
console.log('时间戳', formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss') ) // 2022-11-24 19:50:52
```

### beforeDate

`beforeDate`接收一个时间参数，与当前时间比较，计算早于当前时间差，接收两个参数，`date`比较的时间（必须），此外，还可以传入`resDefault`，设置默认返回值，默认返回空值，（如果晚于当前时间的返回值）

- **早于当前时间**

```javascript
console.log(beforeDate('2021-11-25 19:50:52', '-')) // 1年前
console.log(beforeDate('2022-11-17 19:50:52', '-')) // 1周前
console.log(beforeDate('2022-11-25 19:50:52', '-')) // 54分钟前
```

- **晚于当前时间**

```javascript
console.log(beforeDate('2022-11-27 19:50:52', '-')) // -
```

### formatPriceToThousand

`formatPriceToThousand`金额千分位转换，参数`price`可以是数字或者字符串类型；参数`decimals`需要保留小数点 默认2；参数`separator`千分位符号 默认`,`；参数`round `为`true`时保留位数向下取整，否则向上取整，默认为`true`

```javascript
console.log(formatPriceToThousand(3600)) // 3,600.00
console.log(formatPriceToThousand(3600.2566)) // 3,600.25
console.log(formatPriceToThousand(3600.2566,1,'-', false)) // 3-600.2
console.log(formatPriceToThousand('9655544.58777',3,'-')) // 9-655-544.587
```

### formatBytes

`formatBytes`将文件字节转换成`	MB`等格式

参数`bytes`可以是`number`类型；参数`decimals需要保留小数点 默认2

### desIdCard

`desIdCard`身份证脱敏处理

```javascript
console.log(desIdCard("450616199905206666")) // 450616****6666
console.log(desIdCard("3600.2566")) // Error: 3600.2566 is invalid idCard
```

### desPhone

`desPhone`手机号脱敏处理

```javascript
console.log(desPhone("19994402299")) // 199****2299
console.log(desPhone("3600.2566")) // Error: 3600.2566 is invalid phone number
```

## 拷贝

### cloneDeep

`cloneDeep`实现数据拷贝，参数`source`拷贝的原数据内容

## 命名

### camelize

`camelize`短杆拼接转驼峰,`test-icon => testIcon`

### camelizeToKebabCase

`camelizeToKebabCase`驼峰命名转短杆或者下划线命名，接收参数`str`命名字符串，`mark`支持传入`-`或者下划线进行拼接，默认为短杆`-`,`userName => user-name`

## 字符串

### firstLetterToUpperCase

`firstLetterToUpperCase`首字母转大写

### firstLetterToLowerCase

`firstLetterToLowerCase`首字母大写转小写

## 身份证

### getCardInfo

`getCardInfo`提取身份证信息（目前只支持出生日期及性别的提取）

```javascript
console.log(getCardInfo("450603200012254369")) // {birth: '2000-12-25', gender: '女'}
```

### getAge

`getAge`根据出生日期或者身份证计算年龄

```javascript
console.log(getAge("1999-12-25")) // 23
test-bb.vue:48 console.log(getAge("450603200012253396")) // 22
test-bb.vue:49 console.log(getAge("78888")) // -1 (格式错误或出生日期晚于当前时间)
```

## 数学

### toFixedFix

`toFixedFix`处理小数点, 参数`decimals`保留的小数点位数，默认为2小数位

```javascript
console.log(toFixedFix("45588.28988, 3")) // 45588.289
console.log(toFixedFix("45588.28988, 2")) // 45588.28
console.log(toFixedFix("45588.28988, 1")) // 45588.2
console.log(toFixedFix("45588.28988, 0")) // 45588
console.log(toFixedFix("45588.28, 3")) // 45588.28
```

## 数据

### arrToTree

`arrToTree`数组数据转树形结构，`arrToTree`具有两个参数，`arrData`是必须的数组数据，`options`参数是可选项，`parent`是可选的绑定父节点字段，默认为`parent`，`key` 默认是可选的每组数据的唯一标识字段,默认值为`id`（这两个字段是可以自定义的）,`pid`字段是作为父节点时的值，默认为`null`

**`options`参数**

```javascript
{
  parent: string;
  key: string;
  pid: string | number | null;
}
```

**如果你的数据，没有像上面数据的`id`字段，此时，你需要传入`pid`参数设置成你的标识字段，同样的，如果你绑定的父节点字段不是`parent`，那么此时，你需要传入`parent`字段设置你的父节点字段**

```javascript
const arr = [{ parent: null, id: 1, name: '北京' },
{ parent: 1, id: 11, name: '朝阳' },
{ parent: 11, id: 111, name: '朝阳1号' },
{ parent: 1, id: 12, name: '海淀' },
{ parent: 12, id: 121, name: '海淀1号' },
{ parent: null, id: 2, name: '上海' },
{ parent: 2, id: 21, name: '浦东' },
{ parent: 21, id: 211, name: '浦东1号' },
{ parent: 2, id: 22, name: '虹口' },
{ parent: 22, id: 221, name: '虹口1号'}]

// 转换后
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

### treeToArr

`treeToArr`树形结构数据进行扁平化，其中在每一组数据中，应该包含`children`字段，如果不是该字段，那么此时应该传入**可选参数**`options`进行替换

```javascript
{
  children?: string;
}
```

## 组件

默认组件前缀`cz`

### useComponentNameFormat

`useComponentNameFormat`组件名称转换短杆拼接，`CzButton => cz-button`

```javascript
comst nf = useComponentNameFormat('CzButton ') // cz-button
```

### useCreateComponentName

` useCreateComponentName`创建组件名称，默认前缀`cz`,`icon => CzIcon`

```javascript
useCreateComponentName('icon') // CzIcon
```

### useSFCWithInstall

`useSFCWithInstall`进行组件注册，接受一个组件作为参数

### useSFCWithInstallFunction

`useSFCWithInstallFunction`，全局注册组件方法，接收两个参数，`fn`需要注册的方法，`name`需要注册的方法名称

### useNamespace

`useNamespace`组件命名空间，采用`BEM`规范

```javascript
const ns = useNamespace('button')
ns.b() // cz-button
ns.b('overlay') // cz-button-overlay
ns.e('header') // cz-button__header
ns.m('theme-dark') // cz-button--theme-dark
ns.be('header','close') // cz-button-header__close
ns.em('footer','small') // cz-button__footer--small
ns.bm('footer','small') // cz-button-footer--small
ns.bem('footer','btn','primary') // cz-button-footer__btn--primary
ns.is('closeable') // is-closeable
```

### setGlobalZIndex

`setGlobalZIndex`设置全局 `z-index`，`getNextGlobalZIndex`全局` z-index` 自动自增，默认值2000，两者搭配使用

```javascript
setGlobalZIndex(0) 
getNextGlobalZIndex() // 1
getNextGlobalZIndex() // 2
getNextGlobalZIndex() // 3
```

### getNextGlobalZIndex

### getNextGlobalId

`getNextGlobalId`全局 `z-index `自动自增`Id`，默认值为1

```javascript
getNextGlobalId() // 2
getNextGlobalId() // 3
getNextGlobalId() // 4
```

## 浏览器

### useToFullScreen

`useToFullScreen`开启全屏

### useExitFullScreen

`useExitFullScreen`退出全屏

### isFullscreen

`isFullscreen`检查是否处于全屏状态

## is

### isPhone

`isPhone`校验大陆手机号

```javascript
console.log(isPhone("19994403399")) // true
console.log(isPhone("15448896666774")) // false
```

### isIdCard

`isIdCard`接收一个字符串，判断是否是15或者18位身份证  

```javascript
console.log(isIdCard('450603199906273529')) // true
console.log(isIdCard('45060319990886273529')) // false
```

### isObjectLike

### isNumber

### isValidKey

## CoSocket

### 描述

`Cosocket`基于`websocket`进行封装；具备心跳检测，断线重连等功能机制。

### 例子

在`vue`文件中，你可以这样使用：

```typescript
const ws = ref<CoSocket>(); // 定义变量
const initWebSocket = async () => {
  ws.value = new CoSocket({
    url: '服务地址',// 服务器地址
    reconnectCount: 5, // 重连次数
    messageCallBack: wsReceiveMsg, // 收到信息的回调
    isReconnect: true,// 是否进行重连
    openCallBack: () => { // 连接成功的回调方法
      // ElMessage.success('连接成功');
    },
    errorCallBack: () => { // 连接错误的回调方法
        //
    }，
     closeCallBack: () => { // 关闭连接的回调方法
      //
    }
  });
};
ws.value?.send(msg);// 发送数据
ws.value?.close();// 关闭连接
```

你应该注意的是，如果开启了心跳检测，默认的心跳信息是`ping`,并且如果能够从服务器中得到的响应信息也是`ping`,即相同于心跳信息，此时，数据将会被过滤，因此，在发送数据时，尽量避免与心跳信息的数据一致，你可以通过设置`heartMessage`来设置你的心跳数据。

### 属性

| 属性名         | 类型               | 默认值 | 说明                                                       | 可选 |
| -------------- | ------------------ | ------ | ---------------------------------------------------------- | ---- |
| url            | string             | -      | 链接的通道的地址                                           | 否   |
| protocols      | string \| string[] | `ws`   | 通信协议,可接受`ws`或者`wss`协议                           | 是   |
| heartTime      | number             | 5000   | 心跳时间间隔,需要需要`开启isOpenHeart`属性，才可生效       | 是   |
| heartMessage   | string             | `ping` | 心跳信息,默认为`ping`，需要`开启isOpenHeart`属性，才可生效 | 是   |
| isOpenHeart    | boolean            | `true` | 是否开启心跳                                               | 是   |
| isReconnect    | boolean            | `true` | 是否自动重连，需要`开启isOpenHeart`属性，才可生效          | 是   |
| reconnectTime  | number             | 5000   | 重连时间间隔，需要`开启isOpenHeart`属性，才可生效          | 是   |
| reconnectCount | number             | 5      | 重连次数 -1 则不限制                                       | 是   |

### 事件

| 事件名          | 说明           | 可选 |
| --------------- | -------------- | ---- |
| openCallBack    | 连接成功的回调 | 是   |
| closeCallBack   | 关闭的回调     | 是   |
| messageCallBack | 消息的回调     | 是   |
| errorCallBack   | 错误的回调     | 是   |
| send            | 发送数据       | 否   |
| close           | 主动关闭连接   | 否   |

## 其他

### getTag

`getTag`获取数据的`toString`类型

```javascript
console.log(getTag("1999-12-25")) // [object String]
console.log(getTag(78888)) // [object Number]
console.log(getTag({})) //  [object Object]
console.log(getTag([])) //  [object Array]
console.log(getTag(null)) //  [object Null]
console.log(getTag(undefined)) //  [object Undefined]
console.log(getTag(Object)) //  [object Function]
```

### Omit

`Omit`剔除某些属性，然后返回一个新类型

```typescript
interface ITest {
  name: string;
  age: number;
  sex: string;
}
type TTest = Omit<ITest, 'age' | 'sex'>;
// 相当于
interface ITest1 {
  name: string;
}
```

### Pick

`Pick`选取指定一组属性，返回一个新的类型定义

```typescript
interface ITest {
  name: string;
  age: number;
  sex: string;
}
type TTest = Pick<ITest, 'age' | 'sex'>;

// 相当于
interface ITest1 {
  age: number;
  sex: string;
}
```

### Partial

`Partial`将类型中所有选项变为可选

```typescript
interface ITest {
  name: string;
  age: number;
  sex: string;
}
type TTest = Partial<ITest>;

// 相当于
interface ITest1 {
  name?: string;
  age?: number;
  sex?: string;
}
```

### Required

`Required`将类型中所有选项变为必选

```typescript
interface ITest {
  name?: string;
  age?: number;
  sex?: string;
}
type TTest = Required<ITest>;

// 相当于
interface ITest1 {
  name: string;
  age: number;
  sex: string;
}
```

### Record

`Record`将 `K` 中的所有属性值都转换为 `T` 类型，并返回新的对象类型

```typescript
type ITest = 'name' | 'age' | 'address' | 'phone' | 'email' | 'id'

interface ITestModel {
  test: string;
  other: string;
}
type TTest = Record<ITest, ITestModel>;

// 相当于
interface ITest1 {
  name: ITestModel;
  age: ITestModel;
  address: ITestModel;
  phone: ITestModel;
  email: ITestModel;
  id: ITestModel;
}
```

### Extract

`Extract`提取`T`中可以赋值给`U`的类型

```typescript
type ITestModel =  'name' | 'age' | 'address' | 'phone' | 'email' ;

type TTest = Extract<ITestModel, 'name' | 'phone'>;

// 相当于
type TTest = "name" | "phone"
```

### Exclude

`Exclude`从`T`中剔除可以赋值给`U`的类型

```typescript
type ITestModel =  'name' | 'age' | 'address' | 'phone' | 'email' ;

type TTest = Exclude<ITestModel, 'name' | 'phone'>;

// 相当于
type TTest1 = "age" | "address" | "email"
```

