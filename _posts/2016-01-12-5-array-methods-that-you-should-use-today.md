---
layout: post
title:  "5 Array Methods That You Should Be Using Now"
date:  2016-01-12
categories: JavaScript
---

数组学习笔记

---

* content
{:toc}


当2009年12月3日ECMAScript5发布的时候，他带了了更新的数组方法用来提升现有的数组方法。然而由于缺少支持ES5的浏览器，使得这些方法当时并没有吸引开发者的注意。在9中数组方法中我挑选了5种方法，我个人认为是最有用的。


### indexOf

indexOf()方法返回目标元素在数组中第一次出现的位置，数组中如果不存在改元素则返回-1，例子如下：

不使用indexof()的时候
	
	var arr = ['apple','orange','pear'],
	  found = false;

	for(var i= 0, l = arr.length; i< l; i++){
	  if(arr[i] === 'orange'){
	    found = true;
	  }
	}

	console.log("found:",found); //found: true 

使用indexof()的时候
	
	var arr = ['apple','orange','pear'];

	console.log("found:", arr.indexOf("orange") != -1);  //found: true 
	
### filter

filter()方法创建一个新数组，新数组中的元素满足过滤的条件，例子如下：

不使用filter()的时候
	
	var arr = [
      {"name":"apple", "count": 2},
      {"name":"orange", "count": 5},
      {"name":"pear", "count": 3},
      {"name":"orange", "count": 16},
	];
    
	var newArr = [];

	for(var i= 0, l = arr.length; i< l; i++){
      if(arr[i].name === "orange" ){
		newArr.push(arr[i]);
	  }
	}

    console.log("Filter results:",newArr);  //Filter results: { "name": "orange", "count": 5 },{ "name": "orange", "count": 16 } 

使用filter()的时候
	
	var arr = [
      {"name":"apple", "count": 2},
      {"name":"orange", "count": 5},
      {"name":"pear", "count": 3},
      {"name":"orange", "count": 16},
	];
    
    var newArr = arr.filter(function(item){
      return item.name === "orange";
 	});

	console.log("Filter results:",newArr);  //Filter results: { "name": "orange", "count": 5 },{ "name": "orange", "count": 16 } 

### forEach

forEach()方法相当于for对每个元素执行对应的方法，例子如下：

 	var arr = [1,2,3,4,5,6,7,8];

	// Uses the usual "for" loop to iterate
	for(var i= 0, l = arr.length; i< l; i++){
	  console.log(arr[i]);
	}

	console.log("========================");

	//Uses forEach to iterate
	arr.forEach(function(item,index){
	  console.log(item);
	});


forEach()方法是for循环的重大升级，如果这里只有一个方法可以选择，请选择forEach()吧。

### map

map()方法对原数组的每个元素进行一定操作，返回一个新数组，例子如下：

不使用map()的时候
	
	var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];

	function getNewArr(){
    
      var newArr = [];
    
      for(var i= 0, l = oldArr.length; i< l; i++){
        var item = oldArr[i];
        item.full_name = [item.first_name,item.last_name].join(" ");
        newArr[i] = item;
      }
    
        return newArr;
	}

	console.log(getNewArr());  //{ "first_name": "Colin", "last_name": "Toh", "full_name": "Colin Toh" }
								,{ "first_name": "Addy", "last_name": "Osmani", "full_name": "Addy Osmani" }
								,{ "first_name": "Yehuda", "last_name": "Katz", "full_name": "Yehuda Katz" }

使用map()的时候
	
	var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];

	function getNewArr(){
        
      return oldArr.map(function(item,index){
        item.full_name = [item.first_name,item.last_name].join(" ");
        return item;
      });
    
	}

	console.log(getNewArr());  //{ "first_name": "Colin", "last_name": "Toh", "full_name": "Colin Toh" }
								,{ "first_name": "Addy", "last_name": "Osmani", "full_name": "Addy Osmani" }
								,{ "first_name": "Yehuda", "last_name": "Katz", "full_name": "Yehuda Katz" }


### reduce

reduce()方法作为一个累加器的功能，数组从左到右将其降低到一个值，例子如下：

不使用reduce()的时候
	
	var arr = ["apple","orange","apple","orange","pear","orange"];

	function getWordCnt(){
      var obj = {};
    
      for(var i= 0, l = arr.length; i< l; i++){
        var item = arr[i];
        obj[item] = (obj[item] +1 ) || 1;
      }
    
      return obj;
	}

	console.log(getWordCnt());  //{ "apple": 2, "orange": 3, "pear": 1 }

使用reduce()的时候

	var arr = ["apple","orange","apple","orange","pear","orange"];
	
	function getWordCnt(){
      return arr.reduce(function(prev,next){
        prev[next] = (prev[next] + 1) || 1;
        return prev;
      },{});
	}

	console.log(getWordCnt());  //{ "apple": 2, "orange": 3, "pear": 1 }


reduce(callback,initialValue)具有两个参数，callback 函数和 initialValue，callback 函数自己本身具有四个参数 prev， next, index 以及 array。你只需要知道 prev和next。

prev指向数组的第一个元素，next指向第二个元素。但是请注意，当你传入初始值(initialValue)后，prev将是initivalValue，next指向数组中的第一个元素。


	/*
	* Difference between not passing any parameters
	* and passing in a additional parameter into `reduce()`
	*/

	var arr = ["apple","orange"];

	function noPassValue(){
      return arr.reduce(function(prev,next){
        console.log("prev:",prev);
        console.log("next:",next);
        
        return prev + " " +next;
      });
	}
	  function passValue(){
      return arr.reduce(function(prev,next){
        console.log("prev:",prev);
        console.log("next:",next);
        
        prev[next] = 1;
        return prev;
      },{});
	}

	console.log("No Additional parameter:",noPassValue());
	console.log("----------------");
	console.log("With {} as an additional parameter:",passValue());


	//输出
	prev: apple
	next: orange
	No Additional parameter: apple orange
	----------------
	prev: {}
	next: apple
	prev: { "apple": 1 }
	next: orange
	With {} as an additional parameter: { "apple": 1, "orange": 1 }


从上面代码中，你看到我们在每次迭代返回一个值。这个值被传递到下一个迭代的先前参数。下面的例子将给更清晰的解释：

	var arr = ["apple","orange","apple","pear"];

	function getWordCnt(){
      return arr.reduce(function(prev,next,index){
        console.log("<b>Iteration "+index+"</b>");
        console.log("prev:",prev);
        console.log("next:",next);
        
        prev[next] = ++prev[next] || 1;
        console.log("Passing this to the 'prev' of the next iteration if any:",prev);
        console.log("---------------");
        return prev;
      },{});
	}

	console.log("<b>Final Object:</b>",getWordCnt());


	//输出
	Iteration 0
	prev: {}
	next: apple
	Passing this to the 'prev' of the next iteration if any: { "apple": 1 }
	---------------
	Iteration 1
	prev: { "apple": 1 }
	next: orange
	Passing this to the 'prev' of the next iteration if any: { "apple": 1, "orange": 1 }
	---------------
	Iteration 2
	prev: { "apple": 1, "orange": 1 }
	next: apple
	Passing this to the 'prev' of the next iteration if any: { "apple": 2, "orange": 1 }
	---------------
	Iteration 3
	prev: { "apple": 2, "orange": 1 }
	next: pear
	Passing this to the 'prev' of the next iteration if any: { "apple": 2, "orange": 1, "pear": 1 }
	---------------
	Final Object: { "apple": 2, "orange": 1, "pear": 1 }


### 浏览器支持

根据ECMAScript兼容表，上述五中方法在所有移动浏览器中都能运行，几乎所有主流桌面浏览器也能运行，只有IE8及以前的不支持。

### 最后说一句

本文是翻译自一篇外文，不过翻译途中发现网上已经有人翻译了，顾在参考文献中列出了原文以及另一篇翻译文献，翻译的比较好，还有就是推荐直接看英文的。
	


### 参考资料
1、[5 Array Methods That You Should Be Using Now](http://colintoh.com/blog/5-array-methods-that-you-should-use-today?utm_source=ourjs.com#array_%22extras%22)

2、[5个现在就该使用的数组Array方法](http://ourjs.com/detail/54a9f2ba5695544119000005)
