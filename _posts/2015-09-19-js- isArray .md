---
layout: post
title:  "js判断是否为数组的函数isArray()"
date:  2015-09-19
categories: JavaScript
---

js判断是否为数组的函数isArray()学习笔记

---


- 目录
{:toc}

### Javascript数据结构

#### 动态类型

JavaScript 是一种弱类型或者说动态语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

#### 数据类型

最新的ECMAScript定义了7种数据类型

6种原始类型: 

Boolean
、Null
、Undefined
、Number
、String
、Symbol (new in ECMAScript 6)

以及：

Object

### js判断数组类型的方法

#### 1、typeof操作符
对于Function，String，Number，Undefined等几种类型的对象来说，他完全可以胜任，但是为Array时,我们并不能得到一个array的返回值

    function a1(){
      return true;
    }
    console.log(typeof(a1)); //function

    var a2 = 'javascript';
    console.log(typeof(a2));//string

    var a3 = 1;
    console.log(typeof(a3));//number

    var a4;
    console.log(typeof(a4));//undefined

    var a5 = [1,2,3];
    console.log(typeof(a5));//object

#### 2、instanceof操作符
instance，故名思义，实例，例子，所以instanceof用于判断一个变量是否某个对象的实例，是一个三目运算式---和typeof最实质上的区别
        
    a instanceof b?alert("true"):alert("false")

注意b值是你想要判断的那种数据类型，不是一个字符串，比如Array，返回值为一个布尔值。

    var b1 = [1,2,3];
    console.log(b1 instanceof Array);//true

#### 3、constructor操作符
在W3C定义中的定义：constructor属性返回对创建此对象的数组函数的引用,就是返回对象相对应的构造函数。从定义上来说跟instanceof不太一致，但效果都是一样的。

如: 

    (a instanceof Array)   //a是否Array的实例？true or false

    (a.constructor == Array)  // a实例所对应的构造函数是否为Array? true or false

.

    var c1 = [1,2,3];
    console.log(c1.constructor == Array);//true
                
    function employee(name,job,born){
      this.name=name;
      this.job=job;
      this.born=born;
    }
    var bill = new employee("Bill Gates","Engineer",1985);
    console.log(bill.constructor);//function employee(name,job,born)

判断各种类型的方法如下

    console.log([].constructor == Array);
    console.log({}.constructor == Object);
    console.log("string".constructor == String);
    console.log((123).constructor == Number);
    console.log(true.constructor == Boolean);

#### 4、较为严谨并且通用的方法：

    function isArray(object){
      return object && typeof object==='object' &&
        Array == object.constructor;
    }

注意

使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false；

原因

a、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。

b、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！

    var iframe = document.createElement('iframe');   
    document.body.appendChild(iframe);   
    xArray = window.frames[window.frames.length-1].Array;      
    var arr = new xArray("1","2","3","4","5")
    alert(arr instanceof Array); // false
    alert(arr.constructor === Array); // false

返回结果为两个False，让人大失所望。

#### 5、特性判断法

    function isArray(object){
    return  object && typeof object==='object' &&    
      typeof object.length==='number' &&  
      typeof object.splice==='function' &&    
        //判断length属性是否是可枚举的 对于数组 将得到false  
      !(object.propertyIsEnumerable('length'));
    }

有length和splice并不一定是数组，因为可以为对象添加属性，而不能枚举length属性，才是最重要的判断因子。

#### 6、最简单的方法
       
    var isArray = function(obj) { 
      return Object.prototype.toString.call(obj) === '[object Array]'; 
    }

call改变toString的this引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是'[object Array]'，以判断其是否是Array的实例。也许你要问了，为什么不直接o.toString()？嗯，虽然Array继承自Object，也会有toString方法，但是这个方法有可能会被改写而达不到我们的要求，而Object.prototype则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”。 

与前面几个方案不同，这个方法很好的解决了跨frame对象构建的问题，经过测试，各大浏览器兼容性也很好，可以放心使用。一个好消息是，很多框架，比如jQuery、Base2等等，都计划借鉴此方法以实现某些特殊的，比如数组、正则表达式等对象的类型判定，不用我们自己写了。

#### 7、和在一起就是

    if (value instanceof Array ||
      (!(value instanceof Object) &&
        (Object.prototype.toString.call((value)) == '[object Array]') ||
        typeof value.length == 'number' &&
        typeof value.splice != 'undefined' &&
        typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice'))) {
      return 'array';
    }

### 参考链接：
[1、js数据类型判断和数组判断](http://www.cnblogs.com/mofish/p/3388427.html);

[2、js如何判断一个对象是不是Array](http://www.nowamagic.net/librarys/veda/detail/1250)

[3、js判断是否为数组的函数:isArray()](http://my.oschina.net/ohcoding/blog/470952?p=1)
