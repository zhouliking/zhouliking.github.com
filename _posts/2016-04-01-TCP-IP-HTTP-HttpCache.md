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


- 参考博文：
- 1.[HTTP请求中的缓存(cache)机制 ](http://blog.chinaunix.net/uid-11639156-id-3214858.html)
- 2.[]()