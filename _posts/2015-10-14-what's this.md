---
layout: post
title:  "JS中的this简单描述"
date:  2015-10-10
categories: JavaScript
featured_image: /images/cover.jpg
---

JavaScript中的this学习笔记

---

* content
{:toc}

在JavaScript中，this 的概念比较复杂。由于其运行期绑定的特性，JavaScript 中的 this它可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式。JavaScript 中函数的调用有以下几种方式：作为对象方法调用，作为函数调用，作为构造函数调用，和使用 apply 或 call 调用。下面我们将按照调用方式的不同，分别讨论 this 的含义。


首先我们先看两个例题

例子1：

	var name = "The Window";
	var object = {
	　name:"My Object",
	　getNameFunc:function(){
	　　return function(){
	　　　return this.name;
	　　};
	　}
	};
	console.log(object.getNameFunc()());

例子2：

	var name = "The Window";
	var object = {
	　name:"My Object",
	　getNameFunc:function(){
	　　var that = this;
	　　return function(){
	　　　return that.name;
	　　};

	　}
	};
	console.log(object.getNameFunc()());

### 几种情况讨论

#### 作为纯粹的函数调用

函数可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象

测试1.1：
 
	function testThis(v) {  
	  this.x = v;  
	}  
	testThis(2);  
	console.log(x);//2 

测试1.2：

	x = 1;
	function testThis(v) {  
	  this.x = v;  
	}  
	testThis(2);  
	console.log(x);//2 

通过测试2可以知道作为单纯的函数调用时this指向了全局对象，即window。


### 作为对象的方法调用

在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this 被自然绑定到该对象，这时this就指该对象。

测试2.1

    var name = "李明洋";  
    var person = {  
	  name : "李小洋",  
	  sayName : function(){  
		console.log(this.name );  
	  }  
    }  
    person.sayName();//李小洋

测试2.2
	
	var name = "李明洋";  
    var person = {  
	  name : "李小洋",  
	  sayName : function(){  
		console.log(this.name );  
	  }  
    }  
    var sayName = person.sayName;
    sayName()//李明洋

this关键字虽然是在person.sayName中声明的，但运行的时候是window，所以执行时的当前对象时window。所以输出是全局变量值`李明洋`；

测试2.3

	var name = "李明洋";
	var person1 = {
	  name: "李小洋",
	  sayName: function(){
	    console.log(this.name);
	  }
	};
	var person2 = {
	  name: "李洋洋",
	  sayName: function(){
	    var fun = person1.sayName;
	    fun();
	  }
	};
	person2.sayName();　　//李明洋

求解释啊！！！

#### 作为构造函数，关键字new

new关键字后的构造函数中的this指向用该构造函数构造出来的新对象。

测试3.1

	function Person(name,age){
	  this.name = name;
	  this.age = age;       
	}
	Person.prototype.show = function(){
	  console.log(this.name);
	  console.log(this.age);
	}

	var mySelf = new Person("李明洋",23);
	mySelf.show();        //李明洋，23


#### 使用call和apply设置this

apply和call能够强制改变函数执行时的当前对象，让this指向其他对象。

测试4.1

	var name = "李明洋";
	var person1 = {
	  name: "李小洋",
	  sayName: function(){
		console.log(this.name);
	  }
	};
	var person2 = {
	  name: "李洋洋"
	};
	person1.sayName();//李小洋
	person1.sayName.apply();//李明洋
	person1.sayName.apply(person2);//李洋洋

apply用于改变函数执行时的当前对象，当无参数时，当前对象为window，有参数时当前对象为该参数。

#### 特殊情况

--在浏览器中setTimeout、setInterval和匿名函数执行时的当前对象是全局对象window

测试5.1：匿名函数，也就是例子1

	var name = "The Window";
	var object = {
	　name:"My Object",
	　getNameFunc:function(){
	　　return function(){
	　　　return this.name;
	　　};
	　}
	};
	console.log(object.getNameFunc()());//The Window

那么如果想输出My Object怎么办呢。可以在定义匿名函数之前，把this对象的值赋给that，这样that就指向object了。并且由于闭包的特性，内部函数是可以访问到的。如下：

测试5.2：输出My Object,也就是例子2

	var name = "The Window";
	var object = {
	　name:"My Object",
	　getNameFunc:function(){
	　　var that = this;
	　　return function(){
	　　　return that.name;
	　　};

	　}
	};
	console.log(object.getNameFunc()());//My Object

测试5.3：setTimeout、setInterval

	var name = "李明洋";  
	var person ={  
	  name : "李小洋",  
	  sayName : function(){  
		console.log(this.name);  
	  },  
	  waitSayName : function(){  
		setTimeout(this.sayName, 1000);  
	  }  
	};  
	person.waitSayName();//李明洋

setTimeout、setInterval执行时的当前对象是全局对象window；


### 简单总结

* 作为纯粹的函数调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象

* 当函数作为对象的方法调用时，this指向该对象。

* new关键字后的构造函数中的this指向用该构造函数构造出来的新对象。   

* apply和call能够强制改变函数执行时的当前对象，让this指向其他对象。

* 在浏览器中setTimeout、setInterval和匿名函数执行时的当前对象是全局对象window。嵌套函数中的this不会继承上层函数的this，如果需要，可以用一个变量保存上层函数的this。

### 参考资料：

[1、深入浅出 JavaScript 中的 this ](http://www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/)

[2、Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)

[3、Javascript中this关键字详解](http://www.cnblogs.com/justany/archive/2012/11/01/the_keyword_this_in_javascript.html)

[4、详解JavaScript中的this](http://www.csdn.net/article/2013-05-08/2815182-javascript-this)

[5、JavaScript中this的工作原理以及注意事项](http://blog.jobbole.com/67347/)
