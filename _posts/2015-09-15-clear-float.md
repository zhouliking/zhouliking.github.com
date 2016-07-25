---
layout: post
title:  "清浮动的八种方法"
date:  2015-09-15
categories: HTMLCSS
---

清浮动的八种方法学习笔记

---

- 目录
{:toc}

### 基本概念

#### 什么是浮动

元素加了浮动，会脱离文档流，按照指定的一个方向移动，直到碰到父级的边界或者另外一个浮动元素停止。

#### 浮动产生的原因

一般一个盒子里使用了CSS float浮动属性，导致父级对象盒子不能被撑开，这样CSS float浮动就产生了。如下面代码1由于box内部子元素都设置了浮动，这样就造成了，父级元素不能被子元素撑开

##### 代码1：

    css
    .box{width:600px;margin:0 auto; border:5px solid #000;}
    .left{width:300px;height:400px;background:#faa;float:left;}
    .right{width:300px;height:400px; background:#aaf;float:right;}
        
    html
    <div class="box">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>

### 清浮动方法

#### 方法1:给父级元素加高
给父级元素加高，如下代码2所示，给box加上了height:400px；确实可以清除浮动，但是此方法扩展性很差。

##### 代码2：

    css
    .box{width:600px;margin:0 auto; border:5px solid #000; height:400px;}
    .left{width:300px;height:400px;background:#faa;float:left;}
    .right{width:300px;height:400px; background:#aaf;float:right;}
        
    html
    <div class="box">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>


#### 方法2:给父级加浮动
给父级也加浮动，如下代码3所示，给box加上了 float:left;；确实可以清除浮动，但是此方法使margin左右失效了，不提倡此方法。

##### 代码3：

    css
    .box{width:600px;margin:0 auto; border:5px solid #000; float:left;}
    .left{width:300px;height:400px;background:#faa;float:left;}
    .right{width:300px;height:400px; background:#aaf;float:right;}
        
    html
    <div class="box">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>

#### 方法3:父级添加display: inline-block
父级添加display: inline-block来清除浮动，如下代码4所示，给box加上了 display:inline-block;确实可以清除浮动，但是此方法使margin左右失效了，不提倡此方法。

##### 代码4：

    css
    .box{width:600px;margin:0 auto; border:5px solid #000; display:inline-block}
    .left{width:300px;height:400px;background:#faa;float:left;}
    .right{width:300px;height:400px; background:#aaf;float:right;}
        
    html
    <div class="box">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>

#### 方法4:空标签清浮动
在浮动元素下边加上<div class=”clear”></div>空标签清浮动，如下代码5所示,确实可以清除浮动，但是IE6最小高度19px；解决后IE6下还有2px偏差。

##### 代码5：
        
    css
    .box{ width:300px;margin:0 auto;border:10px solid #000;}
    .div{ width:200px;height:200px;background:red;float:left;}
    .clear{ height:0px;font-size:0;clear:both;}
        
    html
    <div class="box">
      <div class="div"></div>
      <div class="clear"></div>
    </div>


#### 方法5:加<br clear="all"/>
在浮动元素下加`<br clear="all"/>`，如下代码6所示。确实可以清浮动，但是不符合W3C标准，样式混入了html

##### 代码6：

    css
    .box{ width:300px;margin:0 auto;border:10px solid #000;}
    .div{ width:200px;height:200px;background:red;float:left;}
        
    html
    <div class="box">
      <div class="div"></div>
      <br clear="all"/>
    </div>

#### 方法6:加上clear类
给浮动元素的父级元素加上clear类，然后给该元素的after伪类设置如下样式，如下代码7所示。IE6、7不支持after伪类，为了兼容IE6、7，还要给父级元素加上样式zoom:1，但是推荐此种方法

##### 代码7：

    css
    .box{margin:0 auto;border:10px solid #000;}
    .div{ width:200px;height:200px;background:red;float:left;}
    .clear{zoom:1;}
    .clear:after{content:""; display:block;clear:both;}
        
    html
    <div class="box clear">
      <div class="div">  
      </div>
    </div>


`注意`：在IE6、7下，浮动元素的父级有宽度的话，就不需要清浮动，本身就可以清浮动了。
>在IE中，子元素的宽高要么是跟着父级走的，要么是跟着内容走的。这个可以用haslayout来调节。但是haslayout不会自动控制。haslayout的默认值为false。但是用了特定样式的时候，haslayout会变成true。具体可以看这里百度百科的词条。
>当haslayout触发的时候，会根据元素内容大小或者父级的大小来重新计算元素的宽高。所以在IE6、7下，如果给浮动元素的父级加了宽高的话，那么触发了haslayout。该父级元素就根据其内容，及子元素来重新计算宽高，也就清除了浮动。如果父级元素没有加宽高的话，通过加zoom: 1;来触发haslayout，就可以解决问题了。也就是说，为了兼容IE6、7，除了给父级元素加上clear类，然后该给父级元素的after伪类添加上述样式之外，还要给该父级元素加上zoom: 1;的样式。


#### 方法7:overflow: hidden
给浮动元素父级加overflow: hidden;或overflow: auto;来清除浮动，并且一定要配合zoom: 1使用。如下代码8所示。IE6下，overflow没有包住浮动子元素的功能，为了兼容，还是要加zoom: 1来解决一下

##### 代码8：

    css
    .box{ width:300px;height:300px;border:10px solid #000;overflow:hidden;}
    .div1{ width:200px;height:400px;background:red;float:left;}

    html
    <div class="box">
      <div class="div1"></div>
    </div>

#### 方法8:position
给浮动元素的父级元素添加position:absolute或者position:fixed，都可以清除浮动。如下代码9所示。

##### 代码9：

    css
    .box{ width:300px;border:10px solid #000;position:absolute;}
    .div1{ width:200px;height:400px;background:red;float:left;}
        
    html
    <div class="box">
      <div class="div1"></div>
    </div>



