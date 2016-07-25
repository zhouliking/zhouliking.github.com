---
layout: post
title:  "JavaScript闭包"
date:  2015-10-09
categories: JavaScript
---

JavaScript闭包学习笔记

---

- 目录
{:toc}

### 什么是闭包

“官方”的解释是：`闭包`是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。

[阮一峰老师博客](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)解释为：可以把`闭包`简单理解成"定义在一个函数内部的函数"。所以，在本质上，`闭包`就是将函数内部和函数外部连接起来的一座桥梁。

当然你也可以把`闭包`简单的理解为函数嵌套函数,内部函数可以引用外部函数的参数和变量,参数和变量不会被垃圾回收机制所收回。

例子1

	function outFn(a){
	  var b = 5;
	  function inFn(){
		console.log(a);
		console.log(b);
	  }
	}
	outFn();

例子1就是一个函数嵌套函数，在内部函数中可以调用外部函数的变量和参数。

垃圾回收机制：在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。

例子2

	function fn(){
	  var a = 1;	
	}
	fn();

简单的说例子2中的变量a在函数执行完毕之后内存就会被回收，为了节省内存，这就是垃圾回收机制。

而例子1中的参数a和变量b就不会被回收，因为内部函数还在引用着，所以不会被收回。这就是闭包的一个特性。

例子3

	function outFn(){
	  var a = 5;
	  function inFn(){
		console.log(a);
	  }
		return inFn;
	}
	var anotherFn = outFn();
	anotherFn();    //5

### 好处与应用

#### 好处

* 希望一个变量长期驻扎在内存中

* 避免全局变量的污染

* 私有成员的存在

#### 应用

* 模块化代码

* 在循环中直接找到对应元素的索引

例子4

	var a = 1; //全局变量
	function fn(){
	  a++;
	  console.log(a);
	}
	fn();  //2
	fn();  //3
	console.log(a); //3 被污染了，下次有程序需要用a的话就变成3了

例子5

	function fn(){
	  var a = 1; //局部变量，
	  a++;
	  console.log(a);
	}
	fn();  //2
	fn();  //2  由于垃圾回收机制，每次调用完就回收了，下次再执行时就重新生成了，所以每次都是2



例子6

	function fn(){
	  var a = 1;  // 局部变量实现的累加
	  return function(){
		a++;
		console.log(a);
	  }
	}
	var anotherFn = fn();
	anotherFn();  //2
	anotherFn();  //3
	console.log(a); //a is not defined

例子7(例子6的改写)

	var fn = (function(){
	  var a = 1;
	  return function(){
		a++;
		console.log(a);
	  }
	})();
	fn();  //2
	fn();  //3

例子8：模块化代码

	var fn = (function(){
	  var a = 1;		
	  function inFn1(){
		a++;
		console.log(a);
	  }		
	  function inFn2(){
		a++;
		console.log(a);
	  }		
	  return {	
		fn1 : inFn1,
		fn2 : inFn2			
	  }
	})();
	fn.fn1();  //2
	fn.fn2();  //3
	fn.fn1();  //2
	fn.fn2();  //3
	console.log(a); // a is not defined
	console.log(inFn1);  // inFn1 is not defined
	console.log(inFn2);  // inFn2 is not defined 

a,inFn1,inFn2就是私有化的。

例子9:在循环中直接找到对应元素的索引

9.1普通添加点击事件

	HTML
	<li>11111111111</li>
	<li>11111111111</li>
	<li>11111111111</li>

	javascript
	var aLi = document.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
	  aLi[i].onclick = function(){
		console.log(i);
	  };	
	}

上述代码对`li`都添加了点击事件，但是不管点击哪一个`li`的时候输出的都为3，其实可以简单的理解，当点击的时候循环已经结束，那i可不是3么。

9.2通过闭包添加点击事件

	HTML
	<li>11111111111</li>
	<li>11111111111</li>
	<li>11111111111</li>

	javascript
	var aLi = document.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
	  (function(i){	
		aLi[i].onclick = function(){
		  console.log(i);
		};	
	  })(i);			
	}

上述代码对`li`都添加了点击事件，但是和9.1中的情况就不一样了，此时点击对应的`li`就会输出对应的值。把i当做参数传进去，由闭包知道内部函数可以使用外部函数的参数的变量，并且外部函数执行完毕也不会影响内部函数。此时就是正确的结果了。


9.3通过闭包添加点击事件，使用return返回值。
		
	HTML
	<li>11111111111</li>
	<li>11111111111</li>
	<li>11111111111</li>

	javascript
	for(var i=0;i<aLi.length;i++){
	  aLi[i].onclick = (function(i){
		return function(){
		  console.log(i);	
		}	
	  })(i);	
	}

当然除了上述方法还可以自定义索引值等其他方法可以实现上述例子，这里就不详细描述了。


### 闭包需要注意的地方

* 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

* 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

例子10:防止内存泄露

	HTML
	<div id="div1">aaaa</div>

	javascript
	//方法1，
	var oDiv = document.getElementById('div1');
	var id = oDiv.id;
	oDiv.onclick = function(){
	  console.log(id);
	};
	oDiv = null;
	//方法2，
	var oDiv = document.getElementById('div1');	
	oDiv.onclick = function(){
	  console.log(oDiv.id);
	};
	window.onunload = function(){
	  oDiv.onclick = null;
	};


### 思考题

思考题1

	var name = "The Window";
	var object = {
	　name:"My Object",
	　getNameFunc:function(){
	　　return function(){
	　　　return this.name;
	　　};
	　}
	};
	alert(object.getNameFunc()());

思考题1

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
	alert(object.getNameFunc()()); 

`提示`：在全局函数中，this等于windows，而当函数被作为某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性，因此其this对象通常指向window。


### 参考资料：

[1、学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

[2、javascript的闭包](http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1530074.html)

[3、JavaScript 闭包深入理解(closure)](http://www.jb51.net/article/18303.htm)

