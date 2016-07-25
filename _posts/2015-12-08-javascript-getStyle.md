---
layout: post
title:  "通过js获取元素样式以及常用方法"
date:  2015-12-07
categories: JavaScript
---

通过js获取元素样式以及常用方法总结

---

* content
{:toc}

### getComputedStyle方法

虽然学了几个月了，但是晚上要用的时候又忘了，，还是捡起来总结下吧。

#### style方法

样式表有三种方式

* 行间样式 ：是写在标签里面的。

* 内部样式：是写在HTML的里面的style标签里面的。

* 外部样式表：css写在html外部单独文件中，通过link引用。 



在javascript中我们通常通过element.style.XXX进行属性值的设置，但是我们并不能通过element.style.XXX来获取属性的值，至少在内部样式和外部样式是不能通过这种方法获得的，当且仅当行间样式的时候才有效。


	<div style="width:220px;height:220px">
	</div>

	<script>
	  var div = document.querySelectorAll("div")[0];
	  console.log(div.style.height)
	</script>

只有当这种情况下时才有效，然后这不符合w3c规范的，所以并不能采用这种方法。


#### getComputedStyle方法

getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。


* getComputedStyle获取的是计算机（浏览器）计算后的样式，但是不兼容IE6、7、8

* currentStyle方法兼容IE6、7、8，但是不兼容标准浏览器

所以就有必要做一下兼容，，不过貌似IE要被废掉了，，还是做一下吧。

	function getStyle( obj, attr) { 
	  return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle( obj )[attr]; 
	}

注意事项：

* 如果用以上的方法获取某个元素的复合样式，例如background，那么就不要用上面那种方式获取，在不同浏览器间有兼容性问题。用上面的方法获得单一样式，而不要用来获取复合样式。

* 使用以上方法，注意不要多按空格
    
* 使用以上方法，不要获取未设置后的样式，因为浏览器间不兼容
    
* 在火狐4.0之前，有个bug，如果getComputedStyle后面不跟参数，会出现问题，所以有些人写成getComputedStyle(obj, false)，那个false就是为了解决这个bug。这里的bug也可以写成0，或者其他任何参数都可以。不过目前火狐的浏览器都比较高，因此这个问题已经不是很常见了。


### 元素位置宽高

#### offsetLeft、offsetTop

元素.offsetLeft\offsetTop：只读 属性 当前元素到定位父级的距离（偏移值）

可以理解为到当前元素的offsetParent的距离

IE7及以下：

* 如果自己没有定位，那么offsetLeft\offsetTop是到body的距离；

* 如果当前元素有定位的情况下，那么offsetLeft\offsetTop是到它定位父级的距离
    
* 如果当前元素没有定位父级的情况下，那么offsetLeft\offsetTop是到html的距离（但是IE8以上，是到body的距离）

如果没有定位父级：
    
* IE7及以下： offsetLeft \ offsetTop => html
   
* 其他：offsetLeft \ offsetTop => body

如果有定位父级：

    
* IE7及以下：
        
如果自己没有定位，那么offsetLeft \ offsetTop 是到body的距离
        
如果自己有定位，那么就是到定位父级的距离
    
* 其他：到定位父级的距离

#### offsetWidth、offsetHeight
   
* 元素.style.width：样式宽：就是给元素的style中设置的width的值，带单位
    
* clientWidth：可视区宽：样式宽 + padding，不带单位
   
* offsetWidth：占位宽：样式宽 + padding + border = 可视区宽 + border


#### getPos()

body的offsetTop是0；body的offsetParent是null。

下面是获取一个元素到达页面的绝对距离的方式，getPos函数。注意，一般工作中，把body的margin值清掉，这样可以避免IE6、7与其他标准浏览器在getPos上的差异。

	function getPos(obj){
	  var pos = {left: 0, top: 0};
	  while(obj){
	    pos.left += obj.offsetLeft;
	    pos.top += obj.offsetTop;
	    obj = obj.offsetParent;
	  }
	  return pos;
	}


### 参考资料


[1、妙味课堂——JavaScrip中级课程笔记 ](http://fantaghiro.github.io/study/2014/09/16/JS-Intermediary-Lessons-From-MiaoV.html#offsetleftoffsettop)

[2、获取元素CSS值之getComputedStyle方法熟悉](http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)

[3、解析offsetHeight,clientHeight,scrollHeight之间的区别](http://www.jb51.net/article/43470.htm)



