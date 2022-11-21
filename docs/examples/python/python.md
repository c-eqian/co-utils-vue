### Python 如何实现单例模式？

在实现单列模式之前，必须了解一下，什么单例模式。

#### 什么是单例模式？

首先，单例模式，也叫做单子模式，是一种常见的软件设计模式，在应用单例模式时，单例对象必须保证只有一个实列存在。

#### 实现的方式

1. ##### 使用模块

什么是模块呢，比如说，当我们创建了两个py文件，然后b.py中使用import方式导入该模块，即可实现单例模式。

b.py

```python
from a import Singleton
```

a.py

```python
class A:
    def __init__(self):
        pass


Singleton = A()

```

2. #### 使用______new___

_____new________与___init__的区别：

____new___:创建实例对象时调用的构造方法

____init___:初始化方法，用于设置实例的相关属性

会先调用_____new___构造方法，然后使用________init___进行实例初始化。

```python
# -*- coding: utf-8 -*-
# @Time    : 2021-10-15 18:37
# @Author  : 十三
# @Email   : 2429120006@qq.com
# @File    : a.py
# @Software: PyCharm
class A:
    _instance = None
    """
    在创建实例对象时__new__会比__init__先调用，
    因此，可以重写__new__方法实现单例模式

    """

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance


Singleton_1 = A()
Singleton_2 = A()
print(Singleton_1 == Singleton_2)  # True
print(id(Singleton_1) == id(Singleton_2))  # True
```

#### 3. 使用装饰器

```python
def SingletonDecorator(cls):
    _instance = None

    def get_instance(*args, **kwargs):
        nonlocal _instance
        if _instance is None:
            _instance = cls(*args, **kwargs)
        return _instance

    return get_instance


@SingletonDecorator
class A(object):
    pass


a = A()
b = A()
print(a == b)  # True
print(id(a) == id(b))  # True
```

#### 4.使用metaclass元类

```python
def SingletonDecorator(cls):
    _instance = None

    def get_instance(*args, **kwargs):
        nonlocal _instance
        if _instance is None:
            _instance = cls(*args, **kwargs)
        return _instance

    return get_instance


@SingletonDecorator
class Singleton(type):
    _instance = None

    def __new__(cls, *args, **kwargs):
        return super().__new__(cls, *args, **kwargs)

    def __call__(self, *args, **kwargs):
        if self._instance is None:
            self._instance = super().__call__(*args, **kwargs)
        return self._instance


class A(metaclass=Singleton):
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)


a = A()
b = A()
print(a == b)  # True
print(id(a) == id(b))  # True
```

### 并行（parallel）和并发（concurrency）的区别

1. 并行(parallel)：指在同一时刻，有多条指令在多个处理器上同时执行。所以无论从微观还是从宏观来看，二者都是一起执行的。

2. 并发(concurrency)：指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行。

### 什么是 “WSGI”，“uWSGI”，“uwsgi”及Nginx？

1. WSGI(Web Server Gateway Interface)服务器网关接口，**WSGI是一个协议**，一个约定

2. uWSGI是一个**Web服务器**，它实现了WSGI、uwsgi、http等协议。它要做的就是把HTTP协议转化成语言支持的网络协议。比如把HTTP协议转化成WSGI协议，让Python可以直接使用。

3.  uwsgi与`WSGI`一样是一种通信协议，是`uWSGI`服务器的独占协议，用于定义传输信息的类型(`type of information`)，每一个`uwsgi packet`前`4byte`为传输信息类型的描述，与WSGI协议是两种东西，据说该协议是`fcgi`协议的10倍快。

4. Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，其特点是占有内存少，并发能力强

### Mysql 数据库存储的原理？

存储过程是一个可编程的函数，在数据库中创建并保存，它可以有SQL语句和一些特殊的控制结构组成。当希望在不同的应用程序或平台上执行相同的函数，或者封装特定功能时，存储过程时非常有用的，数据库中的存储过程可以看作是对编程中面向对象方法的模拟，它允许控制数据的访问方式。

**存储过程优点：**

1. 存储过程能实现较快的执行速度
2. 存储过程能实现标准组件是编程
3. 存储过程可以用流程语句编写，有很强的灵活性，可以完成复杂的判断和运算。
4. 存储过程可以被作为一种安全机制来充分应用。
5. 存储过程能够减少网络流量

