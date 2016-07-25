---
layout: post
title:  "JavaScript作用域和作用域链"
date:  2015-10-08
categories: JavaScript
---

JavaScript作用域和作用域链学习笔记

---

- 目录
{:toc}

### JavaScript作用域

全局作用域(Global Scope)&局部作用域(Local Scope)

作用域就是变量和函数的可访问范围，控制着变量和函数的可见性与生命周期，在JavaScript中变量的作用域有全局作用域和局部作用域。

单纯的JavaScript作用域还是很好理解的，在一些类C编程语言中花括号内的每一段代码都有各自的作用域，而且变量在声明它们的代码段外是不可见的，称之为块级的作用域，JavaScript容易让初学者误会的地方也在于此，JavaScript并没有块及的作用域，只有函数级作用域：变量在声明它们的函数体及其子函数内是可见的。

#### 1、全局作用域(Global Scope)

最外层函数和在最外层函数外面定义的变量拥有全局作用域
   
    
    var name = "李明洋"; //最外层变量
    function Fun() { //最外层函数
      var anotherName = "李小洋";
      function sayName() { //内层函数
        onsole.log(anotherName);
      }
      sayName();
    }
    console.log(name); //李明洋
    Fun(); //李小洋
    console.log(anotherName); //anotherName is not defined
    sayName(); //sayName is not defined


所有末定义直接赋值的变量自动声明为拥有全局作用域

    function Fun() {
      name = "李明洋";
      var anotherName = "李小洋";
    }
    Fun();
    console.log(name); //李明洋
    console.log(anotherName); //inVariable2 is not defined

所有window对象的属性拥有全局作用域   
    window对象的内置属性都拥有全局作用域，例如 `window.name`、`window.location`、`window.top` 等。


#### 2、局部作用域(Local Scope)

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域
。

如 1. 中的变量 `inVariable` 和函数 `innerFun` 都只拥有局部作用域。

### 作用域链（Scope Chain）

在JavaScript中，函数也是对象，实际上，JavaScript里一切都是对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是[[Scope]]，由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

先来看一段代码：

	name="李明洋";  
	function t(){  
	  var name="李小洋";  
	  function s(){  
		var name="小李洋";  
		console.log(name);  
	  }  
	  function ss(){  
		console.log(name);  
	  }  
	  s();  
	  ss();  
	}  
	t(); 

当执行s时，将创建函数s的执行环境(调用对象),并将该对象置于链表开头，然后将函数t的调用对象链接在之后，最后是全局对象。然后从链表开头寻找变量name,很明显

name是"小李洋"。

但执行ss()时，作用域链是： ss()->t()->window,李小洋"

下面看一个很容易犯错的例子：

	<head>  
	<script type="text/javascript">  
	  function buttonInit(){  
		for(var i=1;i<4;i++){  
		  var b=document.getElementById("button"+i);  
		  b.addEventListener("click",function(){ alert("Button"+i);},false);  
		}  
	  }  
	  window.onload=buttonInit;  
	</script>  
	</head>  
	<body>  
	  <button id="button1">Button1</button>  
	  <button id="button2">Button2</button>  
	  <button id="button3">Button3</button>  
	</body>  

当文档加载完毕，给几个按钮注册点击事件，当我们点击按钮时，会弹出什么提示框呢？

很容易犯错，对是的，三个按钮都是弹出："Button4",你答对了吗？

当注册事件结束后，i的值为4，当点击按钮时，事件函数即function(){ alert("Button"+i);}这个匿名函数中没有i,根据作用域链，所以到buttonInit函数中找，此时i的值为4，

所以弹出”button4“。


### 延长作用域链

有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。有两种情况下会发生这种现象。

* `try-catch` 语句中的 `catch` 块
* `with` 语句

对 with 来说，将会指定对象添加到作用域链中。对 catch 来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。

### 重新思考

上面不懂没关系，看看下面的例子你会不会清晰的知道答案。

练习1：

	console.log(a);					
	var a = 1;
	console.log(a);					
	function a (){ console.log(2); }
	console.log(a);					
	var a = 3;		
	console.log(a);					
	function a (){ console.log(4); }
	console.log(a);	

练习2：

	var a = 1;
	function fn1(){
	  console.log(a);						
	  var a = 2;
	}
	fn1();
	console.log(a);							

练习3：

	var a = 1;
	function fn1(){
	  console.log(a);						
	  a = 2;
	}
	fn1();
	console.log(a);							

练习4：

	var a = 1;
	function fn1(a){
	  console.log(a);						
	  a = 2;
	}
	fn1();
	console.log(a);							

练习5：

	var a = 1;
	function fn1(a){
	  console.log(a);						
	  a = 2;
	}
	fn1(a);
	console.log(a);							


下面公布正确的输出顺序，练习1：`a()`(其实是function a (){ console.log(4); })、`1`、`1`、`3`、`3`;练习2：`undefined`、`1`;练习3：`1`、`2`;练习4：`undefined`、`1`;练习5：`1`、`1`。你有没有全部答对呢。是不是很多答案和你想的不一样，要是一样的话下面的就别看了哦。

简单的解题步骤：

步骤1：通读代码找东西，要找`var`,`function`以及`参数`。

`a = ...`所有的变量，在正式运行代码之前，都提前赋了一个值：undefined。也就是说先找到变量，然后它在运行之前还未定义。`fn1 = function fn1(){ console.log(1); }`所有的函数，在正式运行代码之前，都是`整个函数块`里面的代码先不用考虑。这就是预解析过程，代码还没执行。			
遇到重名的：只留一个。变量和函数重名了，就只留下函数。

步骤2：

逐行解读代码，也就等价于代码执行阶段。表达式：= + - * / % ++ -- ! 参数……表达式可以修改预解析的值！

解读一下第一题：

1)预解析:

先找到a=undefined；
找到function a (){ console.log(2); }，重名了，未定义就被删除了；
找到a=undefined，不过又删除了；
找到function a (){ console.log(4); }根据优先级，删除了function a (){ console.log(2); }。

2）逐行解读代码

第一行console.log(a)，由预解析知道输出应该是`a()`(function a (){ console.log(4); });
第二行var a = 1;注意表达式可以修改预解析的值，此时a=1;
第三行console.log(a);	由第二行的a=1知道输出1;
第四行function a (){ console.log(2); };函数申明不是表达式不改变值;
第五行console.log(a);	由第二行的a=1知道输出1;
第六行var a = 3;表达式a = 3;
第七行console.log(a);	由第六行的a=3知道输出3;
第八行function a (){ console.log(4); }函数申明不该表值
第九行console.log(a);	由第六行的a=3知道输出3;

解读一下第二题：

1)预解析:

先找到a=undefined;
找到function fn1(){console.log(a);var a = 2;}，一整块考虑，先不看函数里面的内容。

2）逐行解读代码

第一行var a = 1;表达式改变了a的值由undefined变成了1;
第二行函数function fn1(){console.log(a);var a = 2;},进行了一个函数申明;
第三行执行函数fn1();把函数当做一个单独的作用域和上面一样先预解析然后逐行读代码，首先预解析找到a=undefined，然后逐行读代码，所以函数fn1中的console.log(a)输出为undefined;
* 第四行console.log(a);由第一行表达式知道输出1;	

接下来的不做了。

其中第三题首先输出1是因为在函数中没有找到var也没找到函数，所以要到函数外面找，结果函数上面找到了并且表达式赋值了1，所以输出就为1。第二个输出为2，是因为函数中输出结束后对全局变量a进行重新赋值了，改变了a的值。

其中第四题首先输出undefined是因为函数中没有找到var也没找到函数，但是找到了参数a，但是a没有传值进来所以未定义了。所以首先输出undefined，然后开始读a=2但是务必注意此时的a并不是全局的，它是对参数a重新赋值的，仅仅在函数中有用。最后的输出就是1了。

其中第五题自己想吧，原理都是一样的。

### 参考资料：

[1、鸟哥：Javascript作用域原理](http://www.laruence.com/2009/05/28/863.html)

[2、理解 JavaScript 作用域和作用域链](http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)

[3、Js作用域与作用域链详解 ](http://blog.csdn.net/yueguanghaidao/article/details/9568071)

