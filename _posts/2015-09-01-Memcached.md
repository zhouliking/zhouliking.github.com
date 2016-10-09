---
layout: post
title:  "Memcached-k-v缓存服务器(小结)"
date:  2016-03-29
categories: DataBase
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

### Memcached操作

#### 命令

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

#### Key设计

- key是什么? key是缓存名,memcached的一个重要特点就是key-value缓存，每个缓存有一个独特的名字和存储空间.

> key是操作数据的唯一标识

- key能取多长？

> 1. 答:key可以250个字节以内,(不能有空格和控制字符)
> 2. 注:在新版开发计划中提到key可能会扩充到65535个字节

### Memcached内存存储机制

### 数据过期与删除机制

#### flag的意义

- flag有什么用? flag是"标志"的意思,可以用此参数来标志`内容的类型`.

- 场景案例:

> 1. memcached存储的数据形式只能是字符串.
> 2. 那么如果要存储 'hello' 和  array('hello','world'); 怎么办?
> 3. 对于字符串,直接存5个字符即可, 对于array,则`需要序列化`.

- 问:取出数据时,又如何处理呢?

> 字符串,取回直接用, 数组,则需要`反序列化`成数组.

> 如何知道,取出的是一段"裸字符串",还是"数组序列化后的字符串"?
> 答:flag!

- 标志flag的范围: 0-2^16-1

#### expire的意义

- expire单位:  秒为单位

> expire的秒数代表什么? 如果expire<=30*24*60*60,则代表自当前时间的偏移即有效期在 time()+expire以内.

> 如果expire > 30 * 24 * 60 * 60 ,则直接代表时间戳.即,在1970年+expire秒以内有效.

> 如何让数据永不过期? `expire参数为0`


#### 需注意的方法

> 1. ① native Object clone() 拷贝当前对象，若对象中属性是对象，仅拷贝其引用
> 2. ② native Class<?> getClass():返回该运行时类的类名，若需获取父类的类名：this.getClass().getSuperclass()
> 3. ③ native int hashCode(); 仅仅对引用值，去hashCode，不考虑对象中内容。因此实际对象需要重写hashCode
> 4. ④ boolean equals(Object obj) 仅比较引用值，因此也需要重写

