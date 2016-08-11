---
layout: post
title:  "Http缓存及实现原理"
date:  2016-04-01
categories: NetProtocol
---

Http缓存及实现原理、 Fiddler：http调试工具

---


- 目录
{:toc}

### 缓存概述 

> 浏览器将最后修改时间发送请求给web服务器，web服务器收到请求后跟服务器上的文档最后修改的时间对比，如果web服务器上最新文档修改时间小于或者等于浏览器发送过来的，则发送304给浏览器，使用缓存版本。

##### 缓存的好处

> 1. 1.减少了冗余的数据传输，节省了网费。
> 2. 2.减少了服务器的负担， 大大提高了网站的性能
> 2. 3.加快了客户端加载网页的速度

##### 缓存分类

> 缓存分为服务端侧（server side，比如 Nginx、Apache）和客户端侧（client side，比如 web browser）

>  - 服务端缓存又分为 代理服务器缓存 和 反向代理服务器缓存（也叫网关缓存，比如 Nginx反向代理、Squid等），其实广泛使用的 CDN 也是一种服务端缓存，目的都是让用户的请求走”捷径“，并且都是缓存图片、文件等静态资源。
>  - 客户端侧缓存一般指的是浏览器缓存，目的就是加速各种静态资源的访问,目的减小服务器压力和网络带宽

##### 浏览器缓存机制

> 浏览器缓存控制机制有两种：`HTML Meta标签` vs. `HTTP头信息`
> - HTML Meta标签控制缓存
> Web开发者可以在HTML页面的<head>节点中加入<meta>标签，如下：

``` HTML
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
```

> 上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。使用上很简单，但只有`部分浏览器支持`，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。
> - `HTTP头信息,广泛应用的缓存机制`

##### HTTP 304状态

- `304(未修改)`

> 如果网页自请求者上次请求后再也没有更改过，您应将服务器配置为返回此响应（称为 If-Modified-Since HTTP 标头）。服务器可以告诉 Googlebot 自从上次抓取后网页没有变更，进而节省带宽和开销。



### HTTP 缓存机制

- 1.当资源第一次被访问的时候，HTTP头部如下：

```
	GET /a.html HTTP/1.1
	Host    127.0.0.1
	...
	Keep-Alive          300
	Connection          keep-alive
```

- 2.第一次被访问,HTTP返回头部如下:

```
	HTTP/1.1 200 OK
	Date                Thu, 26 Nov 2009 13:50:54 GMT
	Server              Apache/2.2.11 (Unix) PHP/5.2.9
	
	Last-Modified       Thu, 26 Nov 2009 13:50:19 GMT
	Etag                “8fb8b-14-4794674acdcc0″
	...
```

> 其中：
> 1. Last-Modified      // 指示最后修改的时间
> 2. Etag                // 指示资源的状态唯一标识
> 3. Expires             // 指示资源在浏览器缓存中的过期时间

- 3.接着浏览器会将文件`缓存到Cache目录`下，并同时保存文件的上述信息

- 4.当第二次请求该文件时，浏览器会先检查Cache目录下是否含有该文件

> 1. 如果有，并且还没到Expires设置的时间，即文件还没有过期，那么此时浏览器将直接从Cache目录中读取文件，而不再发送请求

> 2. 如果文件此时已经过期，则浏览器会发送一次HTTP请求到WebServer，并在头部携带上当前文件的如下信息

```
	If-Modified-Since   Thu, 26 Nov 2015 13:50:19 GMT
	If-None-Match       ”8fb8b-14-4794674acdcc0″
```

> 3. 即把上一次修改的时间，以及上一次请求返回的Etag值一起发送给服务器。
> 4. 服务器在接收到这个请求的时候，如果该文件从上次时间到现在都没有过修改或者Etag信息没有变化，则服务端将直接返回一个304的状态，而不再返回文件资源，状态头部如下
> 5. 这样，就能够很大程度上减少网络带宽以及提升用户的浏览器体验

```
	HTTP/1.1 304 Not Modified
	Thu, 26 Nov 2015 14:09:07 GMT
	Server              Apache/2.2.11 (Unix) PHP/5.2.9
	Connection          Keep-Alive
	Keep-Alive          timeout=5, max=100
	Etag                “8fb8b-14-4794674acdcc0″
```

> 6. 如果服务器经过匹配发现文件修改过了，就会将文件资源返回，并带上新文件状态信息。

- 页面刷新(F5)

```
	If-Modified-Since   Wed, 18 Nov 2009 15:54:52 GMT
	If-None-Match   ”2360492659″
	Pragma: no-cache    // 禁止缓存
	FF:
	If-Modified-Since   Wed, 18 Nov 2009 15:54:52 GMT
	If-None-Match   ”2360492659″
	Cache-Control   max-age=0   // 文件立即过期
```

- 强制刷新(Ctrl+F5)

> - 页面强制刷新不用缓存

-  Http中缓存相关字段：

> - Pragma：如 Pragma:no-cache (禁止缓存)。在HTTP/1.1协议中，它的含义和Cache- Control:no-cache相同
> - Expires:文件在本地缓存的过期时间.如果浏览器发现缓存中的文件没有过期，则不发送请求(强制刷新例外)
> - Cache-Control：指定请求和响应遵循的缓存机制.请求机制：包括缓存指令包括，no-cache、no-store、max-age、 max-stale、min-fresh、only-if-cached；响应消息中的指令包括public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age
> - Etag / If-None-Match: 验证文件实体的标记
> - - Etag:值默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的
> - Last-Modified/If-Modified-Since:验证文件的修改时间的响应/请求头
> - - Expires、Cache-Control、Last-Modified、ETag是RFC 2616（HTTP/1.1）协议中和网页缓存相关的几个字段。 前两个用来控制缓存的失效日期，浏览器可通过它来判定，需不需要发出HTTP请求； 后两个用来验证网页的有效性，服务器端利用它来验证这个文件是否需要重新返回
> - - Last-Modified VS Etag
> - - 既然有了Last-Modified，为什么还要用ETag字段呢？因为如果在一秒钟之内对一个文件进行两次更改，Last-Modified就会不正确。因此，HTTP/1.1利用Entity Tag头提供了更加严格的验证

### Fiddler: http调试工具



- 参考博文：
- 1.[HTTP请求中的缓存(cache)机制 ](http://blog.chinaunix.net/uid-11639156-id-3214858.html)
- 2.[浏览器 HTTP 协议缓存机制详解](http://my.oschina.net/leejun2005/blog/369148)
- 3.[HTTP缓存是如何实现](http://caibaojian.com/http-cache.html)