---
layout: post
title:  "onchange和oninput对于文本框的作用"
date:  2015-10-05
categories: JavaScript
---

onchange、oninput对于文本框的作用学习笔记

---

- 目录
{:toc}

### 分别描述三种事件

#### 1、onchange
对于text文本框来说，当光标离开元素的时候再去判断值是否发生了变化，如果发生了变化则触发onchange事件。

    HTML
    <input type="text" name="username" />

    JS
    $('input').onchange = function() {
      console.log(this.value);
    }

上述代码，当鼠标在文本框中输入内容，且光标离开后，会输出修改后的内容；

`注`：onchange处理文本框时最大的缺点就是不能实时判断，必须等到光标离开后才判断值是否改变了。对于需要实时判断的就不是很方便。

为了进行实时判断我用了onfocus和onkeyup两个事件进行了嵌套进行判断，这是在我还不知道有oninput事件存在的时候使用过的。

	$('input').onfocus = function(){
	  document.onkeyup = function(){
		//需要处理的内容
	  }	
	}

#### 2、onpropertychange
onpropertychange属性可在某些情况下解决上面存在的问题，不用考虑是否失去焦点，不管js操作还是键盘鼠标手动操作，只要HTML元素属性发生改变即可立即捕获到。遗憾的是，onpropertychange为IE专属的。

    HTML
    <input type="text" name="username" />

    JS
    // Internet Explorer
    function OnPropChanged (event) {
      if (event.propertyName.toLowerCase () == "value") {
          alert ("The new content: " + event.srcElement.value);
      }
    } 
    $('input').attachEvent("onpropertychange", OnPropChanged);

#### 3、oninput
oninput 是onpropertychange的非IE浏览器版本，支持firefox和opera等浏览器，但有一点不同，它绑定于对象时，并非该对象所有属性改变都能触发事件，它 只在对象value值发生改变时奏效 。JS改变value时不能触发。

    HTML
    <input type="text" name="username" />

    JS
    // Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
    function OnInput (event) {
      alert ("The new content: " + event.target.value);
    }
    $('input').addEventListener("input", OnInput);

### 三种事件综合
兼容的写法就是需要onpropertychange（用在IE浏览器）和oninput（非IE浏览器）结合在一起同时使用。 

    HTML
    <input type="text" name="username" />

    JS
    // Internet Explorer
    function OnPropChanged (event) {
      if (event.propertyName.toLowerCase () == "value") {
        alert ("The new content: " + event.srcElement.value);
      }
    } 

    // Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
    function OnInput (event) {
      alert ("The new content: " + event.target.value);
    }

    function addInputEventListener() {
      // all browsers except IE before version 9
      if ($('input').addEventListener) { 
        $('input').addEventListener("input", OnInput);
      }
      // Internet Explorer and Opera
      if ($('input').attachEvent) { 
        $('input').attachEvent("onpropertychange", OnPropChanged); 
      }
    }

### 三种事件区别
a、onchange事件与onpropertychange事件的区别：

>onchange事件在内容改变（两次内容有可能还是相等的）且失去焦点时触发；onpropertychange事件却是实时触发，即每增加或删除一个字符就会触发，通过js改变也会触发该事件，但是该事件IE专有。

b、oninput事件与onpropertychange事件的区别：

>oninput事件是IE之外的大多数浏览器支持的事件，在value改变时触发，实时的，即每增加或删除一个字符就会触发，然而通过js改变value时，却不会触发；onpropertychange事件是任何属性改变都会触发的，而oninput却只在value改变时触发，oninput要通过addEventListener()来注册，onpropertychange注册方式跟一般事件一样。（此处都是指在js中动态绑定事件，以实现内容与行为分离）

c、oninput与onpropertychange失效的情况： 

（1）oninput事件：a). 当脚本中改变value时，不会触发；b).从浏览器的自动下拉提示中选取时，不会触发。 
（2）onpropertychange事件：当input设置为disable=true后，onpropertychange不会触发。 

### 参考链接
[1、总结oninput、onchange与onpropertychange事件的用法和区别 ](http://blog.csdn.net/freshlover/article/details/39050609);

[2、onpropertychange事件没有触发的处理方法](http://www.tuicool.com/articles/iIFfymZ)

[3、实时监听输入框值变化的完美方案：oninput & onpropertychange](http://www.cnblogs.com/lhb25/archive/2012/11/30/oninput-and-onpropertychange-event-for-input.html)
