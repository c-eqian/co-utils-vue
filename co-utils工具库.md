---
title: co-utils工具库
date: 2022-11-24 19:26:06
author: 秋谨
categories:
  - utils
tags:
  - javascript
  - co-utils
---



# 介绍

co-utils工具库是基于typescript实现的一个常用库封装

# 安装

```
npm install co-utils -D
```

# 使用

## 时间格式化

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

## 计算年龄

## 身份证校验

- `isIdCard`接收一个字符串，判断是否是15/18位身份证  

```javascript
console.log(isIdCard('450603199906273529')) // true
console.log(isIdCard('45060319990886273529')) // false
```

- `getCardInfo`提取身份证信息（目前只支持提取出生日期、性别）

```javascript
console.log(getCardInfo('450603199906273529')) // { birth: '1999-06-27', gender: '女' }
```

## 树形结构转换

`arr2Tree`将具有树形结构形式的数据转换成树形结构

假设，有这样的数据

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
```

需要转换成这样

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

那么可以利用该方式实现，而`arr2Tree`具有三个参数，`arrData`是必须的数组数据，`parent`是可选的绑定父节点字段，默认为`parent`，`pid` 默认是可选的每组数据的唯一标识字段,默认值为`id`（这两个字段是可以自定义的）

**如果你的数据，没有像上面数据的`id`字段，此时，你需要传入`pid`参数设置成你的标识字段，同样的，如果你绑定的父节点字段不是`parent`，那么此时，你需要传入`parent`字段设置你的父节点字段**

