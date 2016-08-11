---
layout: post
title:  "Http缓存及实现原理"
date:  2016-04-01
categories: JAVA
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





![collection](/images/java-collection.png)
