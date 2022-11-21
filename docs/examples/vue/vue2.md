# 1. 初始化项目

### 1. webpack

```vue
vue init webpack <项目名称>
```

**目录及结构解释**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825121554507.png)

| build        | 项目构建(webpack)相关代码                                    |
| ------------ | ------------------------------------------------------------ |
| config       | 配置目录，包括端口号等。我们初学可以使用默认的。             |
| node_modules | npm 加载的项目依赖模块                                       |
| src          | 这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：assets: 放置一些图片，如logo等。components: 目录里面放了一个组件文件，可以不用。App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。main.js: 项目的核心文件。index.css: 样式文件。 |
| static       | 静态资源目录，如图片、字体等。                               |
| **public**   | **公共资源目录**。                                           |
| test         | 初始测试目录，可删除                                         |
| .xxxx文件    | 这些是一些配置文件，包括语法配置，git配置等。                |
| index.html   | 首页入口文件，你可以添加一些 meta 信息或统计代码啥的。       |
| package.json | 项目配置文件。                                               |
| README.md    | 项目的说明文档，markdown 格式                                |
| dist         | 使用 **npm run build** 命令打包后会生成该目录。              |

## 2. Vite

```
npm init vite-app <项目名称>
```

**运行项目**

```vue
npm run dev 
```

#  2.安装element-ui

## 1. npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```
npm i element-ui -S
```

## 2. CDN

目前可以通过 [unpkg.com/element-ui](https://unpkg.com/element-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

## 3. 引入 Element

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## 4. 安装sass

```
npm install node-sass --save-dev 

npm install sass-loader --save-dev
```

**遇到问题：Expected indentation of 2 spaces but found 3**

**解决：**找到.eslintrc.js文件，注释掉 'standard'即可。

```vue
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
  ],
```

# 基本方法

## Vue3 模板语法

Vue 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

Vue 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。

结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

### 文本

数据绑定最常见的形式就是使用 **{{...}}**（双大括号）的文本插值：

```vue
<template>
  <div class="hello">
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg:"你好，我是cyq"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

### Html

使用 v-html 指令用于输出 html 代码：

```vue
<template>
  <div class="hello">
    <span v-html="html"></span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      html:"<p style='color: red'>你好，我是html</p>"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

### 属性

HTML **属性**中的值应使用 v-bind 指令。以下实例判断 use 的值，如果为 true 使用 class1 类的样式，否则不使用该类：

```vue
<template>
  <div class="hello">
    <span v-bind:class="{class1:use}">我是v-bind</span>
     <span :class="{class1:use}">我是:bind</span>
    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true
    }
  },
  methods:{
    change(){
      this.use = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class1{
  color: #00a0e9;
}
</style>
```

### `v-bind` 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url"> ... </a>

<!-- 缩写 -->
<a :href="url"> ... </a>

<!-- 动态参数的缩写 -->
<a :[key]="url"> ... </a>
```

### `v-on` 缩写

```
<!-- 完整语法 -->
<a v-on:click="doSomething"> ... </a>

<!-- 缩写 -->
<a @click="doSomething"> ... </a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

#### 对动态参数表达式约定


## 条件判断

### v-if

条件判断使用 v-if 指令，指令的表达式返回 true 时才会显示：

```vue

```

因为 v-if 是一个指令，所以必须将它添加到一个元素上。如果是多个元素，可以包裹在 <template> 元素上，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。

```vue
<template>
  <div class="hello">
    <template v-if="use">
      <span >我是真的</span>
      <span >我是真的</span>
      <span >我是真的</span>
      <span >我是真的</span>
    </template>
    <template v-else>
      <span >我是假的</span>
      <span >我是假的</span>
      <span>我是假的</span>
      <span >我是假的</span>
    </template>

    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true
    }
  },
  methods:{
    change(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      this.use = !this.use
    }
  }
}
</script>
<style scoped>
</style>

```

### v-else-if

v-else-if 即 v-if 的 else-if 块，可以链式的使用多次

### v-show

我们也可以使用 v-show 指令来根据条件展示元素：

```vue
<template>
  <div class="hello">
    <span v-show="use" >显示咯</span>
    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true
    }
  },
  methods:{
    change(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      this.use = !this.use
    }
  }
}
</script>
<style scoped>
</style>

```

## 循环语句

循环使用 v-for 指令。

v-for 指令需要以 **site in sites** 形式的特殊语法， sites 是源数据数组并且 site 是数组元素迭代的别名。

v-for 可以绑定数据到数组来渲染一个列表：

```vue
<template>
  <div class="hello">
<!--    v-for 使用-->
    <span v-for="item in arr" >{{item.a}}</span>
    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true,
      arr:[
        {a: '我是第一个',},
        {a: '我是第二个',},
        {a: '我是第三个',},
        {a: '我是第四个',},
      ]
    }
  },
  methods:{
    change(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      this.use = !this.use
    }
  }
}
</script>
<style scoped>
</style>

```

v-for 还支持一个可选的第二个参数，参数值为当前项的索引：

```vue
<template>
  <div class="hello">
<!--    v-for 使用-->
    <span v-for="(item,index) in arr" >{{index}}---------------{{item.a}}</span>
    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true,
      arr:[
        {a: '我是第一个',},
        {a: '我是第二个',},
        {a: '我是第三个',},
        {a: '我是第四个',},
      ]
    }
  },
  methods:{
    change(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      this.use = !this.use
    }
  }
}
</script>
<style scoped>
</style>

```

模板 <template> 中使用 v-for：

```vue
<template>
  <div class="hello">
<!--    v-for 使用-->
    <template v-for="(item,index) in arr">
       <li>{{index}}</li>
      <li>{{item.a}}</li>
    </template>
    <el-button @click="change">点我改变</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      use:true,
      arr:[
        {a: '我是第一个',},
        {a: '我是第二个',},
        {a: '我是第三个',},
        {a: '我是第四个',},
      ]
    }
  },
  methods:{
    change(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      this.use = !this.use
    }
  }
}
</script>
<style scoped>
</style>

```

# 组件

导航、header、footer这类多个页面共用的部分，或者功能比较独立的部分。
 从页面里面分离出来，可以让代码更清晰易读，扩展性和维护性也会更好。
 比如我要改个导航，直接去找导航组件就好，不用怕误改了其他代码。

每个 Vue 应用都是通过用 createApp 函数创建的，传递给 createApp 的选项用于配置根组件。当我们挂载应用时，该组件被用作渲染的起点。一个应用需要被挂载到一个 DOM 元素中。

### 1. 新建一个子组件与父组件

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825141420909.png)

**子组件**

```vue
<template>
<div>
  <span>我是子组件</span>
</div>
</template>

<script>
export default {
name: "child"
}
</script>

<style scoped>

</style>
```

**父组件**

```vue
<template>
<div>
  <span>我是父组件</span>
<!--  自己定义的组件名称-->
  <Child>

  </Child>
</div>
</template>

<script>
/*
引入定义的子组件
 */
import Child from "./child";
export default {
name: "father",
  data(){
  return{

  }
  },
  components:{ //注册组件
  Child
  }
}
</script>

<style scoped>

</style>

```

**结果**

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210825141551264.png)

## Prop 向子组件传递数据

prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。

父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"：

**父组件**

```vue
<template>
<div>
  <span>我是父组件</span>
<!--  自己定义的组件名称-->
<!-- user为自定义，但子组件需与之一致 -->
  <Child :user="user">

  </Child>
</div>
</template>

<script>
/*
引入定义的子组件
 */
import Child from "./child";
export default {
name: "father",
  data(){
  return{
    user:{
      a:'我是父组件',
      b:'儿子，传值给你'
    }

  }
  },
  components:{ //注册组件
  Child
  }
}
</script>

<style scoped>

</style>

```

**子组件**

```vue
<template>
<div>
  <span>{{user.a}}</span>
   <span>{{user.b}}</span>
</div>
</template>

<script>
export default {
name: "child",
  data(){
  return{

  }
  },
  /*
  这里的参数：user，需要与父组件中的绑定一致
   */
  props:['user']
}
</script>

<style scoped>

</style>

```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825143232370.png)

## $emit方法向父组件传值

**父组件**

```vue
<template>
<div>

  <span >{{msg}}</span>
  <!--  子组件传值进行触发并执行定义函数-->
  <child @sendClick="recv">

  </child>
<!--  添加一个按钮，改变值-->
  <el-button type="success">
    点我改变
  </el-button>
</div>
</template>
g
<script>
/*
引入定义的子组件
 */
import child from "./child";
export default {
name: "father",
  data(){
  return{
    flag:false,
    msg:''

  }
  },
  components:{ //注册组件
  child
  },
  methods:{
    //从子组件接收传过来的值，其中data是传过来的值
    recv(data){
      console.log(data)
    this.msg = data
    }
  }
}
</script>
<style scoped>

</style>

```

**子组件**

```vue
<template>
<div>
<!--  <span>{{a}}</span>-->
<!--   <span>{{b}}</span>-->
  <el-button @click="send">
    发送
  </el-button>
</div>
</template>

<script>
export default {
name: "child",
  data(){
  return{

  }
  },
  methods:{
  send(){
    //使用$emit向父组件传值
    this.$emit('sendClick','我是子组件')
  }
  },
  /*
  这里的参数：user，需要与父组件中的绑定一致
   */
  props:['a','b']
}
</script>

<style scoped>

</style>

```



## 动态 Prop

类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件：

**父组件**

```vue
<template>
<div>
  <span>我是父组件</span>
<!--  自己定义的组件名称-->
<!-- user为自定义，但子组件需与之一致 -->
<!--  动态传值给子组件-->
  <Child v-for="item in user" :a="item.a" :b="item.b">

  </Child>
<!--  添加一个按钮，改变值-->
  <el-button type="success" @click="change">
    点我改变
  </el-button>
</div>
</template>
g
<script>
/*
引入定义的子组件
 */
import Child from "./child";
export default {
name: "father",
  data(){
  return{
    flag:false,
    user:[
      {a:'我是父组件1', b:'儿子，传值给你1'},
       {a:'我是父组件2', b:'儿子，传值给你2'},
       {a:'我是父组件3', b:'儿子，传值给你3'}

    ]

  }
  },
  components:{ //注册组件
  Child
  },
  methods:{
  change(){
    this.flag = !this.flag
    //如果为true,则改变传值
    if (this.flag){
          this.user=[
      {a:'我是改变1', b:'儿子，改变传值给你1'},
       {a:'我是改变12', b:'儿子，改变传值给你2'},
       {a:'我是改变13', b:'儿子，改变传值给你3'}
    ]
    }
    else {
      this.user = [
      {a:'我是父组件1', b:'儿子，传值给你1'},
       {a:'我是父组件2', b:'儿子，传值给你2'},
       {a:'我是父组件3', b:'儿子，传值给你3'}

    ]
    }

  }
  }
}
</script>

<style scoped>

</style>

```

**子组件**

```vue
<template>
<div>
  <span>{{a}}</span>
   <span>{{b}}</span>
</div>
</template>

<script>
export default {
name: "child",
  data(){
  return{

  }
  },
  /*
  这里的参数：user，需要与父组件中的绑定一致
   */
  props:['a','b']
}
</script>

<style scoped>

</style>

```

## Prop 验证

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：如果传过来的值是不同类型，将会报错。

**父组件**

```vue
<template>
<div>

  <span >{{msg}}</span>
<!--向子组件发送指定数据类型-->
  <child @recvClick="recv" :propString="send">

  </child>
<!--  添加一个按钮，改变值-->
  <el-button type="success" @click="SendToChild">
    向子组件发送字符串数据
  </el-button>
</div>
</template>
g
<script>
/*
引入定义的子组件
 */
import child from "./child";
export default {
name: "father",
  data(){
  return{
    flag:false,
    msg:'',
    send:''

  }
  },
  components:{ //注册组件
  child
  },
  methods:{
  SendToChild(){
    this.send = '子组件我给你发数据了，收到回复'
  },
    //从子组件接收传过来的值，其中data是传过来的值
    recv(data){
      console.log(data)
    this.msg = data
    }
  }
}
</script>
<style scoped>

</style>

```

**子组件**

```vue
<template>
<div>
<!--  数字类型-->
<!--  <span>{{propNum}}</span>-->
<!--  必须字符串类型-->
   <span>{{propString}}</span>
  <el-button @click="send">
    发送
  </el-button>
</div>
</template>

<script>
export default {
name: "child",
  data(){
  return{
      childRecv:''
  }
  },
  methods:{
  send(){
    //使用$emit向父组件传值
    this.$emit('recvClick','我是子组件')
  }
  },
  /*
  这里的参数：user，需要与父组件中的绑定一致
   */
  props:{

    // 必填的字符串
    propString: {
      type: String,
      required: true,
      default:'我是默认的'

    },
  }
}
</script>

<style scoped>

</style>

```



# 计算属性

计算属性关键词: **computed**。

计算属性在处理一些复杂逻辑时是很有用的。

watch和computed是对数据的监听

```vue
<template>
  <div class="hello">
     <span>{{msg.split('').reverse().join()}}</span>
    <span>{{aa()}}</span>
    <span>{{aa()}}</span>
    <span>{{aa()}}</span>
     <span>{{change}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg:'我是财神'
    }
  },
  methods:{
    aa(){
      /*
      this.use = !this.use 对当前状态进行取反
       */
      console.log('methods触发')
      return this.msg.split('').reverse().join()

    }
  },
  computed:{
    change:function (){
      //对msg进行反转
       console.log('computed触发')
      return this.msg.split('').reverse().join()
    }
  }
}
</script>
<style scoped>
</style>

```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825154547679.png)

**分析**

1. 理论上，computed 所有实现可以使用 methods 完全替换。
2. **计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `msg` 还没有发生改变，多次访问 `change`计算属性会立即返回之前的计算结果，而不必再次执行函数。而方法却会执行。
3. computed 属性在上例调用方法时，但其形式上却像是与data里面的属性相似，而methods则是实实在在的调用方法。
4. computed必须有返回，也就是要有return。
5. computed是依赖vm中data的属性变化而变化的，也就是说，当data中的属性发生改变的时候，当前函数才会执行，data中的属性没有改变的时候，当前函数不会执行。
6. 在computed中不要对data中的属性进行赋值操作。如果对data中的属性进行赋值操作了，就是data中的属性发生改变，从而触发computed中的函数，形成死循环了。
7. 当computed中的函数所依赖的属性没有发生改变，那么调用当前函数的时候会从缓存中读取。
8. 使用场景：当一个值受多个属性影响的时候--------购物车结算；

**注意：在computed，不能使用箭头函数**

## watch属性监听

```vue
<template>
  <div class="hello">
<!--    原始值-->
     <span>{{msg}}</span>
    <el-button @click="ChangeMe">
      点我改变
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg:'我是财神',
      user:'十三'
    }
  },
  methods:{
    ChangeMe(){
      this.msg = '我被改变了'
      this.user = '不才'
    }
  },
  watch:{
    //第一种方法
    msg:(newMsg,oldMsg)=>{
      console.log(newMsg)
        console.log(newMsg)
},
  //第二种方法
        user:{
      handler(newMsg,oldMsg){
        console.log(newMsg)
        console.log(oldMsg)
      },
      immediate: true // 默认只有数据改变才会监听，第一次不会执行,设置true则第一次也能执行

}
  }
}
</script>
<style scoped>
</style>

```

**结果**

![image-20210825162646127](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825162646127.png)

**分析**

1. watch中的函数名称必须要和data中的属性名一致，因为watch是依赖data中的属性，当data中的属性发生改变的时候，watch中的函数就会执行。
2. watch中的函数有两个参数，前者是newVal，后者是oldVal。
3. 出现undefined是因为，在页面加载时就刚开始监听，而没有数据改变。
4. watch中的函数是不需要调用的。
5. watch只会监听数据的值是否发生改变，而不会去监听数据的地址是否发生改变。也就是说，**watch想要监听引用类型数据的变化，需要进行深度监听**。
6. 特殊情况下，watch无法监听到数组的变化，特殊情况就是说更改数组中的数据时，数组已经更改，但是视图没有更新。
7. immediate:true 页面首次加载的时候做一次监听。
8. 使用场景：当一条数据的更改影响到多条数据的时候---------搜索框。

### computed计算属性与watch监听属性区别

1. 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
2. 是否调用缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
3. 是否调用return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。
4. computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true（immediate:true）。
5. 使用场景：computed----当一个属性受多个属性影响的时候，使用computed-------购物车商品结算。watch----当一条数据影响多条数据的时候，使用watch-------搜索框。

# 样式绑定

class 与 style 是 HTML 元素的属性，用于设置元素的样式，我们可以用 v-bind 来设置样式属性。

v-bind 在处理 class 和 style 时， 表达式除了可以使用字符串之外，还可以是对象或数组。

**v-bind:class** 可以简写为 **:class**。

```vue
<template>
  <div class="hello">
<!-- isActive 设置为 true 显示了一个样式-->
     <span v-bind:class="{'active':isActive}"></span>
    <el-button @click="ChangeMe">
      点我改变
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      //激活状态
      isActive:false
    }
  },
  methods:{
    ChangeMe(){
      //对其状态取反操作
      this.isActive = !this.isActive
    }
  },
}
</script>
<style scoped>
.active{
  background-color: #00dd60;
}
</style>

```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825181452390.png)

我们也可以在对象中传入更多属性用来动态切换多个 class 。此外，**:class** 指令也可以与普通的 class 属性共存。

```
<div :class="{'active':isActive,'active_2':isActive_2}"></div>
```

# 生命周期钩子

1. setup() : 开始创建组件之前，在 `beforeCreate` 和 `created` 之前执行，创建的是 `data` 和 `method`
2. onBeforeMount() : 组件挂载到节点上之前执行的函数；
3. onMounted() : 组件挂载完成后执行的函数；
4. onBeforeUpdate(): 组件更新之前执行的函数；
5. onUpdated(): 组件更新完成之后执行的函数；
6. onBeforeUnmount(): 组件卸载之前执行的函数；
7. onUnmounted(): 组件卸载完成后执行的函数；
8. onActivated(): 被包含在 `<keep-alive>` 中的组件，会多出两个生命周期钩子函数，被激活时执行；
9. onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行；
10. onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。

### Vue2.x 和 Vue3.x 生命周期对比

| Vue2          | vue3            | 顺序                                                         |
| ------------- | --------------- | ------------------------------------------------------------ |
| beforeCreate  | setup()         | 开始创建组件之前，在 `beforeCreate` 和 `created` 之前执行，创建的是 `data` 和 `method` |
| created       | setup()         |                                                              |
| beforeMount   | onBeforeMount   | 组件挂载到节点上之前执行的函数；                             |
| mounted       | onMounted       | 组件挂载完成后执行的函数；                                   |
| beforeUpdate  | onBeforeUpdate  | 组件更新之前执行的函数；                                     |
| updated       | onUpdated       | 组件更新之后执行的函数；                                     |
| destroyed     | onUnmounted     | 组件卸载完成后执行的函数；                                   |
| beforeDestroy | onBeforeUnmount | 组件卸载之前执行的函数；                                     |
| activated     | onActivated     | 被包含在 `<keep-alive>` 中的组件，会多出两个生命周期钩子函数，被激活时执行； |
| deactivated   | onDeactivated   | 比如从 A 组件，切换到 B 组件，A 组件消失时执行；             |
| errorCaptured | onErrorCaptured | 当捕获一个来自子孙组件的异常时激活钩子函数。                 |

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825201411671.png)

```vue
<template>
  <div class="hello">
<!--&lt;!&ndash; isActive 设置为 true 显示了一个样式&ndash;&gt;-->
<!--     <div :class="{'active':isActive,'active_2':isActive_2}"></div>-->
<!--    <el-button @click="ChangeMe">-->
<!--      点我改变-->
<!--    </el-button>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      //激活状态
      isActive:false,
      isActive_2:true
    }
  },
  beforeCreate(){
    console.log('开始创建组件之前')
  },
  created() {
     console.log('开始创建组件之后')
  },
  beforeMount(){
    console.log('组件挂载到节点上之前执行的函数；')
  },
  mounted(){
    console.log('组件挂载完成后执行的函数')
  },
  beforeUpdate(){
    console.log('组件更新之前执行的函数')
  },
  updated(){
     console.log('组件更新之后执行的函数')
  },
  beforeUnmount(){
     console.log('组件卸载之前执行的函数')
  },
    unmounted(){
     console.log('组件卸载完成后执行的函数')
  },
    activated(){
     console.log('被激活时执行')
  },
      deactivated(){
     console.log('比如从 A 组件，切换到 B 组件，A 组件消失时执行')
  },
  errorCaptured(){
     console.log('当捕获一个来自子孙组件的异常时激活钩子函数')
  },

}
</script>
<style scoped>
</style>

```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210825201527749.png)

# Ajax(axios)

### 安装方法

**使用 cdn:**

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

或

```
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
```

**使用 npm:**

```
$ npm install axios --save
```

**使用 bower:**

```
$ bower install axios
```

**使用 yarn:**

```
$ yarn add axios
```

**引入**

```
import axios from "axios";
```

使用方法：

```vue
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

### axios中文文档(非官方)

https://www.kancloud.cn/yunye/axios/234845

### axios 官方文档地址(英文)

https://github.com/axios/axios

### axios返回的数据

+ config 请求的时候附带的配置参数
+ data 后端返回的数据
+ headers  请求头 里面包含发送给后端的格式 `application/json;charset=UTF-8`
+ request  ajax请求
+ status  返回的状态码
+ statusText  返回的状态文字

## 安装qs

```
npm install qs --save-dev
npm install
```

**qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。**



## 安装国密gm-crypt

```
npm install gm-crypt --save-dev
npm install
```

### 封装gm-crypt

在src文件夹下新建utils并建一个crypto.js

```vue
import SM4 from 'gm-crypt'
const cryptoConfig= {
     //配置sm4参数
    key: "JeF38U9wT9wldfdf",//这里这个key值是跟后端要的，必须与之一致
    mode: "ecb", // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    cipherType: "base64" //采用base64编码
}
//加密字符串
export function SM4EnCrypto(EnString) {
  const sm4 = new SM4.sm4(cryptoConfig)
  return sm4.encrypt(EnString)

}

//解密字符串
export function SM4DeCrypto(DeString) {
  const sm4 = new SM4.sm4(cryptoConfig)
  return sm4.encrypt(DeString)
}


```



### 封装axios

#### 1

同样，在该目录下新建http.js和request.js，其中http.js主要对axios进行封装，request.js对请求方式的封装，如post、get等。

**http.js**

```vue
//导入axios
import axios from "axios";
//引入element-ui的加载组件
import {Loading,Message} from "element-ui";
import qs from 'qs';
//创建一个axios实例
const http = axios.create({
//  基本URL，当配置该项后，在后面发起请求时，加请求的路径即可
//   baseURL:'http://120.77.44.219:13208',//后台接口url
  baseURL:'http://192.168.100.100:13208',
//  设置超时时间
  timeout:10*1000
});
//设置cookie跨域时允许携带凭证
http.defaults.withCredentials = true;
//设置post请求头：告知服务器请求主体的数据格式
http.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded';
let loadings;
//配置请求拦截器
//客户发送请求->[请求拦截器]->服务器
//token校验(jwt):接受服务器返回的token,存储到vuex/本地存储中,每一次向服务器发送请求,我们应该把token带上,
http.interceptors.request.use(config=>{
//携带token
//  这里的键token，为自定义的
  let token = sessionStorage.getItem('token');
  if (token){
    config.headers['token'] = token;
  }
  token&&(config.headers.Authorization=token);
//  如果时post请求，进行qs转化
  if (config.method=='post'){
    //这里的data包含在config里面
    config.data = qs.stringify(config.data)
  };
//  加载动画
  let options = {
    lock: true,
          text: '正在拼命加载中',
          spinner: 'el-icon-loading',
          fullscreen:true,
          background: 'rgba(0, 0, 0, 0.7)'
  };
  loadings = Loading.service(options)
//  必须要返回config
  return config;
//  发送错误处理
},error => {
  return Promise.reject(error)
  }
)
//响应拦截器
http.interceptors.response.use(response=>{
//  服务器响应，关闭加载动画
  loadings.close();
  //返回响应结果
  return response
//  响应错误处理
},error => {
  loadings.close();
  return Promise.reject(error)
  }
  )
export default http;

```

**request.js**

```javascript
/*
封装常用的post、get请求
 */

//引入封装好的axios
import http from "./http";

/*
url:请求地址
params：请求参数
Promise 对象：
可以将异步操作以同步操作的流程表达出来，
避免了层层嵌套的回调函数。
此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。
Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。
在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject。
 */

//封装get请求
export function get(url, params) {

  return new Promise((resolve, reject) => {
    http.get(url, {
      //如果是get请求，参数需要加params
      params: params
    }).then(response => { //响应成功
      resolve(response)
    })
      .catch(error=>{
        reject(error)
      })
  })
}

//封装post请求
export function post(url,params) {
return new Promise((resolve, reject) => {
  http.post(url,params).then(response=>{
    resolve(response)
  })
    .catch(error=>{
      reject(error)
    })
})
}

```

#### 2

在main.js中，引入文件，做全局处理

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入element-ui
import ElementUi from 'element-ui';
import axios from "axios";
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import {post,get} from "./utils/request";
import {SM4DeCrypto,SM4EnCrypto} from "./utils/crypto";

Vue.config.productionTip = false
// 引入使用
Vue.use(ElementUi)
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$SM4DeCrypto = SM4DeCrypto;
Vue.prototype.$SM4EnCrypto = SM4EnCrypto;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
   render: h => h(App)
})


```

#### 3 

**在组件中使用**

```vue
<template>
<div class="loginFrame">
  <el-card class="box-card">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="name">
    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </el-card>
</div>
</template>

<script>
  export default {
    data() {
      //校验账号
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      //校验密码
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //表单验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          /*
          检验成功，首先都数据进行加密
          向服务器发送请求
           */
            let data = this.$SM4EnCrypto(JSON.stringify(this.ruleForm)) // 需要对json转字符串处理
            //testMsg需要与服务器对应
            this.$post('/login',{testMsg:data})
              .then((response)=>{
                //0登录成功，1登录失败
                if(response.data.flag === 0){
                  sessionStorage.setItem('token',response.data.token)
                }
                console.log(response)
            })
              .catch((error)=>{
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.loginFrame{
  width: 400px;
  height: 450px;
  margin-left: 40%;
  margin-top: 10%;
}
</style>

```

**结果**

![image-20210826140733180](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210826140733180.png)

**在浏览器中，调慢网速**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210826141012846.png)

# Vuex 状态管理

## Vuex

1. Vuex 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。
2. 可以用于解决不同组件之间数据的共享问题
3. 可以把多个页面需要的属性存放到vuex当中 

## vuex 五个核心属性

### state

1. 可以理解为组件当中的data 

2. 组件当中的data 是一个局部的数据仓库  

3. state 是一个全局的数据仓库 只要数据存放到state之后 **任何组件**都能访问state里面的属性

   把组件当中需要被共享的属性存放到vuex当中

### mutations 

1. mutations  可以理解为全局的方法 跟组件当中的**methods**类似
2. 定义在组件当中的methods是局部方法
3. 定义在mutations里面的方法 可以被任何组件所访问 
4. 如果想要state当中的数据变化 **只能**在mutations里面修改，actions中的修改，实际上也是通过mutations方式进行修改。

### getters

1. 类似与computed 计算属性
2. 用于监听vuex state数据的变化 用法跟计算属性的用法一致

### actions

1. 可以理解为全局的方法 跟组件当中的methods类似
2. mutations里面写的方法是一个**同步**方法
3. actions 里面写的方法 可以是**同步** 也可以是**异步 **
4. 通过actions 解决了 mutations异步操作导致的 调试工具与页面所展示的数据不一致的问题
5. 把异步操作写在actions 当中 在actions里面执行mutations里面的方法

### modules

当数据较多时，可使用该modules进行模块化设计

**使用 Vuex 统一管理状态的好处**

1. 能够在 vuex 中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

**什么样的数据适合存储到 Vuex 中**

一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中；对于组件中的私有数据，依旧存储在组件自身的 data 中即可。

**安装**

```
npm install vuex --save
```

**导入 vuex 包**

```
import Vuex from 'vuex'  
Vue.use(Vuex)
```

**创建 store 对象**

```javascript
const store = new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  getters:{},
  
})
```

## 使用

新建store.js

```javascript
//引入vuex
import Vuex from  'vuex'
//引入Vue
import Vue from "vue";
Vue.use(Vuex)
/*
暴露一个Vuex实例
 */
export default new Vuex.Store({
  /*
  State 提供唯一的公共数据源，所有共享的数据都要统一放到
  Store 的 State 中进行存储。
   */
  state:{
    //菜单列表
    menus:[],
    //用户
    user: {}
  },
  /*
  Mutation 用于变更 Store中的数据。
  方法中的第一个参数为一个state，在每个方法需要该state，
  第二个参数为组件或调用该方法传过来的值，
  注意：在mutations中的方法，只能接受一个参数，所有当需要多个参数时，通过对象传入即可
  组件中使用 this.$store.commit(‘xxx’) 提交 mutation，
  或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit
  调用（需要在根节点注入 store）。
   */
  mutations:{
    UpdateMenus(state,payload){
      //在组件中不能直接修改属性值，通过此方法更新state中的meus
      state.menus = payload
    },
    //  修改登录当前用户信息
    UpdateUser(state,payload){
    state.user = payload
    }
  },
  /*
  Action 通过 store.dispatch 方法触发：
   */
  actions:{
    /*
    1. 异步修改meus
    2. actions 的第一个参数是 context，
    它向外暴露一组与 store 实例相同的方法/属性，
    所以可以直接调用 context.commit
    或者访问 context.state 或者 context.getters 。
    我们通常使用 es6 的参数解构来简化我们的代码，
    直接写成{ commit }
     */
    SetUpdateMenus({commit},payload){
        commit('UpdateMenus',payload)
    }
  },
  getters:{},
})


```

**state**

State 提供唯一的公共数据源，所有共享的数据都要统一放到Store 的 State 中进行存储。

组件访问 State 中数据的第两种方式：

1. this.$store.state.全局数据名称
2. import { mapState } from 'vuex'

```
  state:{
    //菜单列表
    menus:[],
    //用户
    user: {}
  }
```

通过刚才导入的 mapState 函数，将当前组件需要的全局数据，映射为当前组件的 computed 计算属性：

```
user//  将全局数据，映射为当前组件的计算属性
computed: {
...mapState(['menus'])
}
//多个属性时，可以采用
computed: {
...mapState(['menus','user'])
}
```



**Mutation**

1. mutation回调函数的第一个参数始终为store，你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（playload）
2. 在组件中使用 this.$store.commit(‘xxx’) 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。

也可以通过映射方式触发：

```
// 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from 'vuex'
```

```
// 将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
...mapMutations(['UpdateMenus', 'UpdateUser'])
}
```

```
  mutations:{
    UpdateMenus(state,payload){
      //在组件中不能直接修改属性值，通过此方法更新state中的meus
      state.menus = payload
    },
    //  修改登录当前用户信息
    UpdateUser(state,payload){
    state.user = payload
    }
  }
```

**actions**

action 类似于 mutation，不同在于：

1. action 提交的是 mutation，而不是直接变更状态。
2. action 可以包含任意异步操作。

在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，本质上就是一个函数，你在里面想干嘛都可以，可以通过异步方式执行各种任务，要修改state数据还是需要通过commit触发 mutation 
可以把mutation比作仓库的管理员，负责仓库管理，而把action比作领导，可以命令仓库管理员作操作，但不会亲自动手。

通过 store.dispatch 方法触发

```
  actions:{
    /*
    1. 异步修改meus
    2. actions 的第一个参数是 context，
    它向外暴露一组与 store 实例相同的方法/属性，
    所以可以直接调用 context.commit
    或者访问 context.state 或者 context.getters 。
    我们通常使用 es6 的参数解构来简化我们的代码，
    直接写成{ commit }
     */
    SetUpdateMenus({commit},payload){
        commit('UpdateMenus',payload)
    }
  }
```

通过映射方式触发：

```
// 从 vuex 中按需导入 mapActions 函数
import { mapActions } from 'vuex'
```

通过刚才导入的 mapActions 函数，将需要的 actions 函数，映射为当前组件的 methods 方法：

```
// 将指定的 actions 函数，映射为当前组件的 methods 函数
methods: {
...mapActions(['SetUpdateMenus'])
}
```

**在main.js中进行全局挂载**

```
import store from "./store/store";
new Vue({
  el: '#app',
  router,
  store,
   render: h => h(App)
})
```

```
                //0登录成功，1登录失败
                if(response.data.flag === 0){
                  //登录成功，将菜单更新通过mutations中的UpdateMenus方法至state中的menus
                  this.$store.commit('UpdateMenus',response.data.result.menu)
                  sessionStorage.setItem('token',response.data.token)
                }
```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210831005130552.png)

```
    //更新用户
    SetUpdateUser({commit},payload){
      commit('UpdateUser',payload)
    }
```

```
                //0登录成功，1登录失败
                if(response.data.flag === 0){
                  //登录成功，将菜单更新通过mutations中的UpdateMenus方法至state中的menus
                  //this.$store.commit('UpdateMenus',response.data.result.menu)
                  let user = {
                    name:response.data.result.name,
                    username:response.data.result.username,
                    password:response.data.result.password
                  }
                  this.$store.dispatch('SetUpdateUser',user)
                  sessionStorage.setItem('token',response.data.token)
                }
```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210831094012383.png)

当从服务器获取到数据后，通过state获取用户的信息

```vue
<template>
<div class="loginFrame">
  <el-card class="box-card">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="name">
    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </el-card>
  <span>{{users}}</span>
</div>
</template>

<script>
  export default {
    data() {
      //校验账号
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      //校验密码
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        users:'',
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //表单验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          /*
          检验成功，首先都数据进行加密
          向服务器发送请求
           */
            let data = this.$SM4EnCrypto(JSON.stringify(this.ruleForm)) // 需要对json转字符串处理
            //testMsg需要与服务器对应
            this.$post('/login',{testMsg:data})
              .then((response)=>{
                //0登录成功，1登录失败
                if(response.data.flag === 0){
                  //登录成功，将菜单更新通过mutations中的UpdateMenus方法至state中的menus
                  // this.$store.commit('UpdateMenus',response.data.result.menu)
                  let user = {
                    name:response.data.result.name,
                    username:response.data.result.username,
                    password:response.data.result.password
                  }
                  this.$store.dispatch('SetUpdateUser',user)
                  sessionStorage.setItem('token',response.data.token)
                  //向store中更新完成数据后，调用该方法获取state中的用户信息
                  this.GetUser()
                }
                console.log(response)
            })
              .catch((error)=>{
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //从state中获取用户信息
      GetUser(){
        this.users = this.$store.state.user
      }
    }
  }
</script>

<style scoped>
.loginFrame{
  width: 400px;
  height: 450px;
  margin-left: 40%;
  margin-top: 10%;
}
</style>

```

**结果**

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210831094900315.png)

**getter**

Getter 用于对 Store 中的数据进行加工处理形成新的数据。

① Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性。
② Store 中数据发生变化，Getter 的数据也会跟着变化。

使用 getters 的第一种方式：

**this.$store.getters.名称**

使用 getters 的第二种方式：

```
import { mapGetters } from 'vuex'
```

```
computed: {
...mapGetters(['getUser'])
}
```

```
  getters:{
    getUser:(state => {
      return state.user
    }),
  }
```

getters中的访问器函数，默认会传递2个参数(state, getters)，使用第一个参数state可以访问数据，使用getters参数可以访问访问器中的其它访问器函数。大部分情况下只需要使用第一个参数，定义访问器函数就只写第一个参数即可，就像上面的例子。访问这些访问器属性时，就像是组件中的计算属性一样调用，而不是像函数调用一样。

```
      //从state中获取用户信息
      GetUser(){
        this.users = this.$store.getters.getUser
      }
```

## Module  vuex模块化

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

在store的文件夹 下分别新建，UserStore.js、MenusStore.js这两个文件主要是对用户信息及菜单进行处理，然后新建一个modulesStore.js，这个文件主要是对前两个文件进行模块化开发。

**1. UserStore.js**

```
const UserStore = {
  state:{
    users:{}
  },
  mutations:{
    //更新菜单
    UpdateUsers(state, payload) {
      state.users = payload
    }
  },
  actions:{},
  getter: {}
}
//暴露出来
export default UserStore

```

**2. MenusStore.js**

```
const MenusStore = {
  state:{
    Menus:{}
  },
  mutations:{
    //更新菜单
    UpdateMenus(state, payload) {
      state.Menus = payload
    }
  },
  actions:{},
  getter: {}
}
//暴露出来
export default MenusStore

```

**3. modules.js**

```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import UserStore from "./UserStore";
import MenusStore from "./MenusStore";
export default new Vuex.Store({
  modules:{
    //用户的store模块
    UserStore:UserStore,
    //菜单列表的store模块
    MenusStore:MenusStore
  }
})

```

模块内部的 state 是局部的，只属于模块本身所有，所以外部必须通过对应的模块名进行访问。这个时候，store 中已经注入了两个子模块 UserStore.js MenusStore.js，我们可以在 通过 **this.$store.state.模块名.属性**，这种方式来直接访问模块中的 state 数据。

由于模块内部的 action、mutation 和 getter 默认可是注册在**全局命名空间**的，这样使得多个模块能够对同一 mutation 或 action 作出响应。

```
  this.$store.commit('UpdateMenus',response.data.result.menu)
```

```
     GetUser(){
        this.Menus = this.$store.state.MenusStore.Menus
        console.log(this.users)
      }
```

**通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。**当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

**UserStore.js**

```vue
const UserStore = {
  //命名空间
  namespaced:true,
  state:{
    users:{}
  },
  mutations:{
    //更新菜单
    UpdateUsers(state, payload) {
      state.users = payload
    }
  },
  actions:{},
  getter: {}
}
//暴露出来
export default UserStore

```

**MenusStore.js**

```vue
const MenusStore = {
  //命名空间
  namespaced:true,
  state:{
    Menus:[]
  },
  mutations:{
    //更新菜单
    UpdateMenus(state, payload) {
      state.Menus = payload
    }
  },
  actions:{},
  getter: {}
}
//暴露出来
export default MenusStore

```

添加了命名空间后，这里说有的属性方法，相当于一个模块内的私有的。

用法如下：

```
                  //添加命名空间后，需要指定模块所在的路径
                  this.$store.commit('MenusStore/UpdateMenus',response.data.result.menu)
```

# 高德地图API

在index.html中引入

```
    <!--引入高德地图-->
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=1f5b1e3bacacf98a95ac162b8784e326"></script>
```

安装AMap（这步不用也可）

```
npm install vue-amap --save
```

在 build —> webpack.base.conf.js，在module.exports中添加 externals: { “AMap”: “AMap” }

```javascript
  entry: {
    app: './src/main.js'
  },
    externals: {
   "AMap": "AMap",
  },
```

```vue
<template>
  <!--        要为地图指定容器，否则会不显示-->
  <div class="map container" id="container">
    <!--    <el-amap vid="amap" :plugin="plugin" class="map" :center="center">-->
    <!--    </el-amap>-->
<!--    <div class="toolbar">-->
<!--        <span v-if="loaded" class="el-icon-location-outline">-->
<!--          当前位置: {{ Location }}-->
<!--        </span>-->
<!--      <span v-else>正在定位</span>-->
<!--      &lt;!&ndash;       <el-button v-on:click="req_post()"> 查询周边</el-button>&ndash;&gt;-->
<!--    </div>-->
  </div>
</template>
<style>
/*地图*/
#container {
  width: 100%;
  height: 100%;
}
</style>
<script>

import AMap from 'AMap'
export default {
  data() {
    return {
      UN: this.$route.params.UN,
      //  地图类
      resizeEnable: true,
      expandZoomRange: true,
      zoom: 20,
      zooms: [3, 20],
      City: '',//城市
      // Location: '',//当前位置
      loaded: false,
    }

  },
  watch: {//监听数据发生变化
  },
  mounted() { //初始化
    // this.getLocation()
    this.GetWeather()
  },
  methods: {
// 获取当前位置
    getLocation() {
      let $self = this;
      return new Promise((resolve, reject) => {
        var map = new AMap.Map('container');
        AMap.plugin([
          'AMap.Geolocation', 'AMap.ToolBar',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.Weather',
          'AMap.MapType',], () => {
          var geolocation = new AMap.Geolocation({
            resizeEnable: true,
            expandZoomRange: true,
            enableHighAccuracy: true,// 是否使用高精度定位，默认:true
            timeout: 100,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
            extensions: 'all',
            radius: 100,
            zoom: 20,
            zooms: [3, 20],
          });
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());
          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          map.addControl(new AMap.Scale());
          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          map.addControl(new AMap.OverView({isOpen: true}));
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map.addControl(new AMap.MapType());
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);
          AMap.event.addListener(geolocation, 'error', onError);

          function onComplete(data) {
            $self.loaded = true
            // data是具体的定位信息
            console.log('定位成功信息：', data);
            $self.Location = data.formattedAddress;
            const location={
              flag:$self.loaded,
              location:data.formattedAddress
            }
             //父子组件传值
            $self.$parent.$parent.$parent.$parent.GetLocation(location)
            console.log($self.Location)
            //获取城市
            this.City = data.addressComponent.city
            resolve(this.City)//异步处理返回，相当于return
          }
          function onError(data) {
            // 定位出错
                       self.$message({
              message: '哎呀，定位失败啦',
              type: 'warning',
              duration: 1500
            });
            // 调用IP定位
            this.getLngLatLocation();
          }
        });
      })
    },
    async GetWeather() { //获取天气
      /*
      异步处理，先获取当前位置，之后根据当前位置获取天气信息
       */
      // 获取天气
      let self = this
      let city = await this.getLocation()
      //加载天气查询插件
      AMap.plugin('AMap.Weather', function () {
        //创建天气查询实例
        var weather = new AMap.Weather();
        console.log(city)
        //执行实时天气信息查询
        weather.getLive(city, function (err, data) {
          if (data.info === 'OK') {
            const weatherinfo = {
              city: data.city,
              humidity: data.humidity,
              temperature: data.temperature,
              weather: data.weather,
              windDirection: data.windDirection,
              windPower: data.windPower
            }
            //父子组件传值
            self.$parent.$parent.$parent.$parent.GetValue(weatherinfo)
            // self.$message({
            //   message: '获取天气成功',
            //   type: 'success',
            //   duration: 1500
            // });
          }
          // else {
          //   self.$message({
          //     message: '哎呀，获取天气失败啦',
          //     type: 'warning',
          //     duration: 1500
          //   });
          //
          // }
        });
      });
    },
    // 通过IP获取当前位置
    getLngLatLocation() {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result);
            // 逆向地理编码
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(';')[0].split(',');
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    }
  }
}
</script>

```

## 使用less报错问题

**由于版本过高，修改版本即可**

```
npm uninstall less-loader
npm install less-loader@4.1.0 -S
```

## Vue中使用Layui

**安装**

```
npm i --save layui-layer
```

**引用**

```
import layer from "layui-layer";
```

**index.html引入**

```
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
```

## 安装jQuery

**安装**

```
npm install jquery --save
```

**使用**

在build/webpack.base.conf.js中添加：

```javascript
const webpack = require('webpack')
然后在module.exports = {  }里面加入
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
    ]
```

### **项目中报错 Error: Avoided redundant navigation to current location: “/xxx”. 的解决方案**

**在router文件中添加**

```
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
```

### 解决push同一个地址不同参数时不会重新渲染router-view的问题 -->

```
 <router-view :key="$route.fullPath"></router-view>
```

**注意：给router-view添加key有可能对性能有一定的损耗**

