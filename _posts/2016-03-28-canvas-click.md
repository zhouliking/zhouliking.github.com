---
layout: post
title:  "canvas点击事件"
date:  2016-03-28
categories: JavaScript
---

面试时被问到这个了所以总结下

---

* content
{:toc}



### 实例说明

如果我们想给如下一个canvas绘制的七巧板添加点击事件，使得每次点击七巧板对应部分颜色发生变化。需要怎么操作呢？

	<canvas id="canvas" style="border:1px solid #aaa;display:block;margin:50px auto;">
	  当前浏览器不支持Canvas，请更换浏览器后再试。
	</canvas>

<div style="text-align:center;">
	<img src="{{ site.url }}/assets/canvas-click/t.png" style="width:440px;height:440px">
</div>

由于事件只能达到Canvas元素这一层，所以，如果想进一步深入，识别点击发生在Canvas内部的哪一个图形上，就需要增加代码来进行处理。基本思路是：给Canvas元素绑定事件，当事件发生时，检查事件对象的位置，然后检查哪些图形覆盖了该位置。例如canvas中一个矩形覆盖x轴10-110、y轴10-110的范围。只要鼠标点击在这个范围里，就可以视为点击了该矩形，也就可以手动触发矩形需要处理的点击事件。思路其实比较简单，但是实现起来还是稍微有点复杂。不仅要考虑这个判断过程的效率，有些地方还需要重新判断事件类型，设置要重新定义一个Canvas内部的捕获和冒泡机制。


### Canvas元素绑定事件

首先需要在canvas上绑定事件，我怎么看着和事件委托一样一样的，当然是不一样的，可以这么理解嘛。

	var canvas = document.getElementById("canvas");
	canvas.addEventListener('click', function(e){  
	  //other code
    }, false);

### 判断鼠标位置

接下来需要判断事件对象发生的位置，事件对象e的layerX和layerY属性表示Canvas内部坐标系中的坐标。但是这个属性Opera不支持，Safari也打算移除，所以要做一些兼容写法：

	function getEventPosition(ev){
	  var x, y;
	  if (ev.layerX || ev.layerX == 0) {
	    x = ev.layerX;
	    y = ev.layerY;
	  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
	    x = ev.offsetX;
	    y = ev.offsetY;
	  }
	  return {x: x, y: y};
	}

### isPointInPath

有了事件对象的坐标位置，下面就要判断Canvas里的图形，有哪些覆盖了这个坐标。Canvas的isPointInPath方法可以判断当前上下文的图形是否覆盖了某个坐标

比如：

	var canvas = document.getElementById("canvas"); 
	context = canvas.getContext('2d');  
	context.beginPath();  
	context.rect(10, 10, 100, 100);  
	context.fill();  
	context.isPointInPath(50, 50);     //true  
	context.isPointInPath(5, 5);     //false  

如下代码就能判断是否被点击了：

	canvas.addEventListener('click', function(e){  
	  var pos = getEventPosition(e);  
	  if(context.isPointInPath(pos.x, pos.y)){  
	    //当鼠标点击时覆盖了点击的图形执行这里的代码  
	  }  
	}, false);

但是上面的代码还有局限，由于isPointInPath方法仅判断当前上下文环境中的路径，所以当Canvas里已经绘制了多个图形时，仅能以最后一个图形的上下文环境来判断事件。这种问题的解决方法是：当点击事件发生时，重绘所有图形，每绘制一个就使用isPointInPath方法，判断事件坐标是否在该图形覆盖范围内。

### 参考代码

	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>Canvas</title>
	</head>
	<body>
	  <canvas id="canvas" style="border:1px solid #aaa;display:block;margin:50px auto;">
		当前浏览器不支持Canvas，请更换浏览器后再试。
	  </canvas>
	
	  <script>
		var tangram = [
		  {p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"#caff67"},
		  {p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"#67becf"},
		  {p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:"#ef3d61"},
		  {p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"#f9f51a"},
		  {p:[{x:400,y:400},{x:600,y:600},{x:400,y:800},{x:200,y:600}],color:"#a594c0"},
		  {p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"#fa8ecc"},
		  {p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"#f6ca29"}
		]
	
		var canvas = document.getElementById("canvas");
		canvas.width = 800;
		canvas.height = 800;
	
		var context = canvas.getContext("2d");
	
		for(var i = 0;i < tangram.length;i++){
		  draw(tangram[i],context);
		}
	
		//添加事件响应  
		canvas.addEventListener('click', function(e){  
		  var pos = getEventPosition(e); 
		  for(var i = 0;i < tangram.length;i++){
		    reDraw(pos,tangram[i],context); 
		  } 
		}, false); 
	
	
		function draw(piece,cxt){
		  cxt.beginPath();
		  cxt.moveTo(piece.p[0].x,piece.p[0].y);
		  for(var i=1;i<piece.p.length;i++){
		    cxt.lineTo(piece.p[i].x,piece.p[i].y);
		  }
		  cxt.closePath();
	
		  cxt.fillStyle = piece.color;
		  cxt.fill();
		}
	
	
		//得到点击的坐标  
		function getEventPosition(ev){  
		  var x, y;  
		  if (ev.layerX || ev.layerX == 0) {  
		    x = ev.layerX;  
		    y = ev.layerY;  
		  }else if (ev.offsetX || ev.offsetX == 0) { // Opera  
		    x = ev.offsetX;  
		    y = ev.offsetY;  
		  }  
		    return {x: x, y: y};  
		 }
	
	
		function reDraw(pos,piece,cxt){
		  cxt.beginPath();
		  cxt.moveTo(piece.p[0].x,piece.p[0].y);
		  for(var i=1;i<piece.p.length;i++){
		    cxt.lineTo(piece.p[i].x,piece.p[i].y);
		  }
		  cxt.closePath();
	
		  cxt.fillStyle = piece.color;
		  cxt.fill();
		  if(pos && cxt.isPointInPath(pos.x, pos.y)){
		    cxt.fillStyle = 'red';
		    cxt.fill();
		  } 
		}
	  </script>
	</body>
	</html> 
	

### 参考文献

1、[HTML5 canvas 内部元素事件响应](http://bz5811.iteye.com/blog/1908172)

	