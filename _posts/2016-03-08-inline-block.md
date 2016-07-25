---
layout: post
title:  "我也来谈谈inline-block的间隙"
date:  2016-03-08
categories: HTMLCSS
---

inline-block换行解析的解决方案总结

---

* content
{:toc}

### 什么是inline-block

> 1.使块元素在一行显示
		
> 2.使内嵌支持宽高
	
> 3.换行被解析了
		
> 4.不设置宽度的时候宽度由内容撑开

我们今天要解决的就是换行被解析了这句话，啥叫换行被解析了。看下面的例子：

	<ul>
	  <li>HOME</li>
	  <li>BLOG</li>
	  <li>DEMO</li>
	  <li>ABOUT</li>
	  <li>RESUME</li>
	</ul>

样式表如下

	/*css*/
	li{
	  list-style:none;
	  display:inline-block;
	  height:30px;
	  padding:0 6px;
	  background-color:#DB7093;
	  color:white;
	  text-align:center;
	  line-height:30px;
	  border:1px solid red;
	}

上面代码呈现的效果就如下所示

<div style="text-align:center;">
	<img src="{{ site.url }}/assets/inline-block/1.jpg" style="width:400px;height:60px">
</div>

也就是说`li`后面的换行被解析成了空格在浏览器中渲染出来了，所以我们看见每个`li`后面都有一个空格，那么我们该怎么解决这个问题呢。

### 移除空格

既然存在空格会被解析出来，那么我们移除空格是否能解决问题呢。我们试了一下完全可以。

	<ul>
	  <li>HOME</li><li>BLOG</li><li>DEMO</li><li>ABOUT</li><li>RESUME</li>
	</ul>

效果如下：

<div style="text-align:center;">
	<img src="{{ site.url }}/assets/inline-block/2.jpg" style="width:400px;height:60px">
</div>

虽然这种方法成功的移除了空格，但是考虑到代码结构和代码可读性，所以，并不是推荐这种做法。

### 使用margin负值

	<ul>
	  <li>HOME</li>
	  <li>BLOG</li>
	  <li>DEMO</li>
	  <li>ABOUT</li>
	  <li>RESUME</li>
	</ul>

样式表如下

	/*css*/
	li{
	  list-style:none;
	  display:inline-block;
	  height:30px;
	  padding:0 6px;
	  background-color:#DB7093;
	  color:white;
	  text-align:center;
	  line-height:30px;
	  border:1px solid red;
	  margin:-4px;
	}

虽然设置margin赋值是可以解决问题的，但是设置值为多少是需要根据浏览器和字体大小确定的，比如我上面的例子在火狐浏览器下-3px就已经可以没有空格了，但是在谷歌浏览器下还是有空格，需要设置到-4px才没有空格。所以这里需要值得关注一下。

### font-size：0

这个方法，基本上可以解决大部分浏览器下inline-block元素之间的间距，同时需要设置子元素的字体大小。

有人提到兼容性问题，就是Chrome, 其默认有最小字体大小限制，考虑到兼容性，我们还需要添加： -webkit-text-size-adjust:none;但是我测试最新的Chrome已经没有这个兼容性问题了，所以也可以不加啦。
	
	ul{
	  font-size:0;
	}
	/*css*/
	li{
	  font-size:16px;
	  list-style:none;
	  display:inline-block;
	  height:30px;
	  padding:0 6px;
	  background-color:#DB7093;
	  color:white;
	  text-align:center;
	  line-height:30px;
	  border:1px solid red;
	}

### 去掉闭合标签

	<ul>
	  <li>HOME
	  <li>BLOG
	  <li>DEMO
	  <li>ABOUT
	  <li>RESUME</li>
	</ul>

这个为啥我也不知道，但是他就是可以实现，不过个人不太推荐这种做法，，标签哪能不闭合呢，多不好。

### 使用word-spacing

	ul{
	  word-spacing:-6px;
	}
	/*css*/
	li{
	  list-style:none;
	  display:inline-block;
	  height:30px;
	  padding:0 6px;
	  background-color:#DB7093;
	  color:white;
	  text-align:center;
	  line-height:30px;
	  border:1px solid red;
	  word-spacing: 0;
	}

使用这种方法确实可以去除空格，而且ul下的word-spacing设的越大也不会发生重叠，但是这种方法在谷歌下不能正确的显示，设小了有空格，设大了会发生重叠，还需加上display:inline-table;但是加了之后在火狐下貌似又不能正确显示了，，所以不太推荐这种做法。