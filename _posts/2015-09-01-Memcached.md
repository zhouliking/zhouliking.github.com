---
layout: post
title:  "Memcached-k-v缓存服务器(小结)"
date:  2016-03-29
categories: NetProtocol
---

Object String、StringBuilder Integer

---

- 目录
{:toc}

### Memcached简介

-  [Memcached](http://memcached.org/)

> emcached是LiveJournal旗下Danga Interactive公司开发的一款软件

- What is Memcached?

> Free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.Memcached is simple yet powerful. Its simple design promotes quick deployment, ease of development, and solves many problems facing large data caches. Its API is available for most popular languages.

> memcached是一个高性能,分布式内存对象缓存系统,具备通用性,但本来的目的是用于为动态web程序加速,并减轻数据库的的负担.第二次后，可从Memcached中读取数据

### Memcached安装

- Windows下

> 在windows下安装,相对简单,从官方网站下载相应的二进制文件,解压到磁盘即可

- linux下

> 1. 安装libevent[官网](http://libevent.org/)
> 2. 安装Memcached[官网](http://memcached.org)

```
•  安装 libevent(memcached依赖libevent)
# tar zxvf libevent-2.0.1-stable.tar.gz
# cd libevent-2.0.21-stable
# ./configure --prefix=/usr
# make
# make install

• 安装 Memcached
# tar zxvf memcached-1.4.15.tar.gz
# cd memcached-1.4.15
# ./configure --prefix=/usr/local
# make
# make install
```

### Memcached操作命令

- 查看memcached帮助： Memcached -h

- 重要的启动项

> 1. -p <num>      监听的TCP端口 (缺省: 11211)
> 2. -d            以守护进程方式运行Memcached
> 3. -u <username> 运行Memcached的账户，非root用户
> 4. -m <num>      最大的内存使用, 单位是MB，缺省是 64 MB
> 5. -c <num>      软连接数量, 缺省是 1024
> 6. -v            输出警告和错误信息
> 7. -vv           打印客户端的请求和返回信息
> 8. -h            打印帮助信息
> 9. -i            打印memcached和libevent的版权信息

- 启动memcached: memcached已经打开,并监听11211端口,因此,任何能满足端口通信的工具,都可以连接memcahced

> memcached.exe -m 32 -vv -p 11211

- 连接到memcached

> 1. 我们利用telnet来连接: telnet localhost 11211
> 2. 连接后 ctrl+] ,然后回车, 打开回显功能输入stats 回车, 即可查看memcached运行状态.

- 增add

> 1. add 命令格式:add key flag expiretime bytes\r\n  
> 2. 例如： add title 1 0 17

- 查add

> 1. add 命令格式:get key\r\n 
> 2.  例如：get title

- 改replace

> 1. replace命令格式:replace key flag expiretime bytes\r\n
> 2. 例如：replace title 2 0 5

- 删delete

> 1. delete命令格式:delete key [time]time参数是指使key失效并在time秒内不允许用此key
> 2. 例如：delete key

### Memcached内存存储机制

### 数据过期与删除机制




#### 需注意的方法

> 1. ① native Object clone() 拷贝当前对象，若对象中属性是对象，仅拷贝其引用
> 2. ② native Class<?> getClass():返回该运行时类的类名，若需获取父类的类名：this.getClass().getSuperclass()
> 3. ③ native int hashCode(); 仅仅对引用值，去hashCode，不考虑对象中内容。因此实际对象需要重写hashCode
> 4. ④ boolean equals(Object obj) 仅比较引用值，因此也需要重写

