---
layout: post
title:  "移动web开发之veiwport"
date:  2015-10-20
categories: WebApp
---

"移动web开发之veiwport学习笔记

---

* content
{:toc}


### pixel像素基础知识

#### 1、基本概念

* px：CSS pixels逻辑像素，浏览器使用的抽象单位，也就是我们平时开发经常使用的单位。
* dip或dp或pt：device independent pixels设备独立像素，与屏幕密度无关，dip可以用来辅助区分视网膜设备还是非视网膜设备。
* dpr：devicePixelRatio设备像素缩放比。

>window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
公式表示就是：window.devicePixelRatio = 物理像素 / dips

#### 2、此像素非彼像素

以iphone5为例:分辨率为640×1136

此像素指的是我们平时经常写的px，彼像素指的是我们经常看见手机的640px以及1136px；两者的关系可以看下图：

![px]({{ site.url }}/assets/hello-mobile-web-viewport-img/2.png)

平面上：1px = 2^2*dp

纬度上：1px = 2*dp

所以有640dp*1136dp => 320px*568px;

#### 3、DPI&PPI

* DPI:打印机每英寸可以喷的墨汁点（印刷行业）
* PPI：屏幕每英寸的像素数量，即单位英寸内的像素密度。

目前，在计算机显示设备参数描述上，二者意思表达的是一样的

计算公式：ppi=（（1136^2+640^2）/4)^(1/2)=326ppi（视网膜Retina屏幕）

注意：单位为硬件像素，而非px。ppi越高，像素越高，图像越清晰

ppi与缩放比的关系可以参见下图：

![ppi]({{ site.url }}/assets/hello-mobile-web-viewport-img/3.png)

Retina屏：dpr都是大于等于2；

#### 4、整理

iphone5分辨率640dp*1136dp  =>  

ppi=（（1136^2+640^2）/4)^(1/2)=326ppi => 

326ppi属于高清屏，dpr=2  =>  

1px=dpr^2*dp  =>  

iphone5的屏幕为320*568px.


### viewport理论

#### 1、viewport基本概念

通俗的讲，移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域，在具体一点，就是浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域，但viewport又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。在默认情况下，一般来讲，移动设备上的viewport都是要大于浏览器可视区域的，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上正常显示那些传统的为桌面浏览器设计的网站，移动设备上的浏览器都会把自己默认的viewport设为980px或1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。下图列出了一些设备上浏览器的默认viewport的宽度。

![默认veiwport]({{ site.url }}/assets/hello-mobile-web-viewport-img/1.png)


>手机浏览器默认帮我们做了两件事1、页面渲染在一个980px的viewport上；2、缩放。

* layout viewport（布局viewport）：浏览器默认的viewport叫做layout viewport，如上图所展示的那样，可以用document.documentElement.clientWidth来获取；
* visual viewport（度量viewport）：浏览器可视区域的大小，可以用window.innerWidth来获取；

>缩放比 = window.innerWidth/document.documentElement.clientWidth;

#### 2、利用meta标签对viewport进行控制

移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是visual viewport。那么怎么才能得到visual viewport呢？这就该轮到meta标签出场了。

我们在开发移动设备的网站时，最常见的的一个动作就是把下面这个东西复制到我们的head标签中：

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。

各参数的概念：

width：设置layout viewport 的宽度，为一个正整数，或字符串"width-device（设备宽度）"

initial-scale：设置页面的初始缩放值，为一个数字，可以带小数.设置后度量viewport随布局viewport来变。

minimum-scale：允许用户的最小缩放值，为一个数字，可以带小数

maximum-scale：允许用户的最大缩放值，为一个数字，可以带小数

user-scalable ：是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许


总之记住这个结论就行了：在iphone和ipad上，无论你给viewport设的宽的是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。


### 总结

好吧，说了那么多我还是不太懂，，，，，总之记住<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">就好啦。不过扎实的基础很重要啊，，，学了好几遍还不懂，太没用了。留着智商来的时候在看看

### 参考资料

[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)

[Hello,移动WEB](http://www.imooc.com/learn/494)

[设备像素比devicePixelRatio简单介绍](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)










