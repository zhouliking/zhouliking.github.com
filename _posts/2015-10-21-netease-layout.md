---
layout: post
title:  "页面架构之页面布局解决方案"
date:  2015-10-21
categories: HTMLCSS
---

页面架构之页面布局解决方案学习笔记

---

* content
{:toc}

### 居中布局

#### 水平居中

![layout-center]({{ site.url }}/assets/netease-layout-img/1.1.png)

##### 1、text-align+inline-block
	
	CSS
	.parent{
	  text-align: center;
	}
	.child{
	  display: inline-block;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>	

##### 2、table+margin

	CSS
	.child{
	  display: table;
	  margin: 0 auto;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 3、position+transform

	CSS
	.parent{
	  position: relative;
	}
	.child{
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 4、flex

	CSS
	.parent{
	  display: flex;
	  justify-content: center;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 5、flex+margin

	CSS
	.parent{
	  display: flex;
	}
	.child{
	  margin: 0 auto;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

#### 垂直居中

![layout-center]({{ site.url }}/assets/netease-layout-img/1.2.png)

##### 1、table-cell+vertical-align
	
	CSS
	.parent{
	  display: table-cell;
	  vertical-align: middle;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 2、position+transform
	
	CSS
	.parent{
	  position: relative;
	}
	.child{
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>
##### 3、flex

	CSS
	.parent{
	  display: flex;
	  align-items: center;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

#### 水平垂直居中

![layout-center]({{ site.url }}/assets/netease-layout-img/1.3.png)

##### 1、text-align+table-cell+inline-block

	CSS
	.parent{
	  text-align: center;
	  display: table-cell;
	  vertical-align: middle;
	}
	.child{
	  display: inline-block;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 2、position+transform

	CSS
	.parent{
	  position: relative;
	}
	.child{
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%,-50%);
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

##### 3、flex

	CSS
	.parent{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

	HTML
	<div class="parent">
	  <div class="child">DEMO</div>
	</div>

### 多列布局

#### 定宽与自适应

![layout-center]({{ site.url }}/assets/netease-layout-img/2.1.png)

##### 1、float

	CSS
	.left{
	  float: left;
	  width: 100px;
	}
	.right{
	  margin-left: 120px;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 2、float

	CSS
	.left{
	  float: left; width: 100px;
	}
	.right-fix{
	  float: right; width: 100%;
	  margin-left: -100px;
	}
	.right{
	  margin-left: 120px;
	}

	HTML
	<div class="parent">
	  <div class="left"><p>left</p></div>
	  <div class="right-fix">
		<div class="right">
		  <p>right</p><p>right</p>
		</div>
	  </div>
	</div>

##### 3、float+overflow

	CSS
	.left{
	  float: left;
	  width: 100px;
	  margin-right: 20px;
	}
	.right{
	  overflow: hidden;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 4、table

	CSS
	.parent{
	  display: table; width: 100%;
	  table-layout: fixed;
	}
	.left,.right{
	  display: table-cell;
	}
	.left{
	  width: 100px;
	  padding-right: 20px;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 5、flex

	CSS
	.parent{
	  display: flex;
	}
	.left{
	  width: 100px;
	  margin-right: 20px;
	}
	.right{
	  flex: 1;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 6、flex

	CSS
	.parent{
	  display: flex;
	}
	.left{
	  width: 100px;
	  margin-right: 20px;
	}
	.right{
	  flex: 1;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

#### 不定宽与自适应

![layout-center]({{ site.url }}/assets/netease-layout-img/2.2.png)

##### 1、float+overflow

	CSS
	.left{
	  float: left;
	  margin-right: 20px;
	}
	.right{
	  overflow: hidden;
	}
	.left p{width: 200px;}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 2、table

	CSS
	.parent{
	  display: table; width: 100%;
	}
	.left,.right{
	  display: table-cell;
	}
	.left{
	  width: 0.1%;
	  padding-right: 20px;
	}
	.left p{
	  width:200px;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>

##### 3、flex

	CSS
	.parent{
	  display: flex;
	}
	.left{
	  margin-right: 20px;
	}
	.right{
	  flex: 1;
	}
	.left p{width: 200px;}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>


#### 等分

![layout-center]({{ site.url }}/assets/netease-layout-img/2.3.png)

##### 1、margin-left+margin
	
	CSS
	.parent{
	  margin-left: -20px;
	}
	.column{
	  float: left;
	  width: 25%;
	  padding-left: 20px;
	  box-sizing: border-box;
	}
	
	HTML
	<div class="parent">
	  <div class="column"><p>1</p></div>
	  <div class="column"><p>2</p></div>
	  <div class="column"><p>3</p></div>
	  <div class="column"><p>4</p></div>
	</div>

##### 2、table
	
	CSS
	.parent-fix{
	  margin-left: -20px;
	}
	.parent{
	  display: table;
	  width:100%;
	  table-layout: fixed;
	}
	.column{
	  display: table-cell;
	  padding-left: 20px;
	}
	
	HTML
	<div class="parent-fix">
	  <div class="parent">
		<div class="column"><p>1</p></div>
		<div class="column"><p>2</p></div>
		<div class="column"><p>3</p></div>
		<div class="column"><p>4</p></div>
	  </div>
	</div>

##### 3、flex
	
	CSS
	.parent{
	  display: flex;
	}
	.column{
	  flex: 1;
	}
	.column+.column{
	  margin-left:20px;
	}
	
	HTML
	<div class="parent">
	  <div class="column"><p>1</p></div>
	  <div class="column"><p>2</p></div>
	  <div class="column"><p>3</p></div>
	  <div class="column"><p>4</p></div>
	</div>



#### 等高

![layout-center]({{ site.url }}/assets/netease-layout-img/2.4.png)

	CSS
	.parent{
	  overflow: hidden;
	}
	.left,.right{
	  padding-bottom: 9999px;
	  margin-bottom: -9999px;
	}
	.left{
	  float: left; width: 100px;
	  margin-right: 20px;
	}
	.right{
	  overflow: hidden;
	}

	HTML
	<div class="parent">
	  <div class="left">
		<p>left</p>
	  </div>
	  <div class="right">
		<p>right</p>
		<p>right</p>
	  </div>
	</div>


### 全屏布局

#### 部分定宽高

![layout-center]({{ site.url }}/assets/netease-layout-img/3.1.png)

##### 1、position

	CSS
	html,body,.parent{margin:0;height:100%;overflow:hidden;}
	body{color:white;}
	.top{
	  position:absolute;top:0;left:0;right:0;height:100px;
	  background:blue;
	}
	.left{
	  position:absolute;left:0;top:100px;bottom:50px;width:200px;
	  background:red;
	}
	.right{
	  position:absolute;left:200px;top:100px;bottom:50px;right:0;
	  background:pink;overflow: auto;
	}
	.right .inner{min-height: 1000px;}
	.bottom{
	  position:absolute;left:0;right:0;bottom:0;height:50px;
	  background: black;
	}	

	HTML
	<div class="parent">
	  <div class="top">top</div>
	  <div class="left">left</div>
	  <div class="right"><div class="inner">right</div></div>
	  <div class="bottom">bottom</div>
	</div>
	
##### 2、flex

	CSS
	html,body,.parent{margin:0;height:100%;overflow:hidden;}
	body{color: white;} 
	.parent{display: flex;flex-direction: column;}
	.top{height:100px;background: blue;}
	.bottom{height:50px;background: black;}
	.middle{flex:1;display:flex;}
	.left{width:200px;background: red;}
	.right{flex: 1;overflow: auto;background:pink;}
	.right .inner{min-height: 1000px;}

	HTML
	<div class="parent">
	  <div class="top">top</div>
	  <div class="middle">
		<div class="left">left</div>
		<div class="right">
		  <div class="inner">right</div>
		</div>
	  </div>
	  <div class="bottom">bottom</div>
	</div>
#### 部分宽高由百分比实现

![layout-center]({{ site.url }}/assets/netease-layout-img/3.2.png)
	
	CSS
	.parent{display: flex;flex-direction: column;}
	.top{height:10%;background: blue;}
	.bottom{height:5%;background: black;}
	.middle{flex:1;display:flex;}
	.left{width:20%;background: red;}
	.right{flex: 1;overflow: auto;background:pink;}
	.right .inner{min-height: 1000px;}

	HTML
	<div class="parent">
	  <div class="top">top</div>
	  <div class="middle">
		<div class="left">left</div>
		<div class="right">
		  <div class="inner">right</div>
		</div>
	  </div>
	  <div class="bottom">bottom</div>
	</div>


#### 部分宽高由内容自适应

![layout-center]({{ site.url }}/assets/netease-layout-img/3.3.png)

	CSS
	html,body,.parent{margin:0;height:100%;overflow:hidden;}
	body{color:white;} 
	.parent{display:flex;flex-direction:column;}
	.top{background:blue;}
	.bottom{background:black;}
	.middle{flex:1;display:flex;}
	.left{background: red;}
	.right{flex:1;overflow:auto;background: pink;}
	.right .inner{min-height:1000px;}

	HTML
	<div class="parent">
	  <div class="top">top</div>
	  <div class="middle">
		<div class="left">left</div>
		<div class="right">
		  <div class="inner">right</div>
		</div>
	  </div>
	  <div class="bottom">bottom</div>
	</div>











