---
layout: post
title:  "【node学习笔记】url以及queryString模块"
date:  2016-04-13
categories: Node
---

记录自己node的学习历程，供自己日后查阅

---

* content
{:toc}


### 写在前面
<div style="text-align:center;">

	<img src="{{ site.url }}/assets/url/url.jpg" style="width:882px;height:398px">

</div>


上图摘自《The Node Beginner Book》，是一个典型的url结构图。下面进行详细介绍。


### url组成结构

有如下url

> http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash

#### href

准备解析的完整的 URL，包含协议和主机（小写）。上面url的href如下：


`http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash`

#### protocol

请求协议, 小写,有http、https等协议。上面url的protocol如下：


`http:`

注意是带冒号的。


#### slashes

 协议要求的斜杠（冒号后）,返回true或者false，上面的返回：

`true`

#### host

 完整的 URL 小写 主机部分，包含端口信息，上面url的host如下：

`limingyang2012.com:8888`

#### hostname

 域名中的小写主机名，上面url的hostname如下：

`limingyang2012.com`

#### port

 主机的端口号，上面url的port如下：

`8888`

#### pathname

 URL 中的路径部分，在主机名后，查询字符前，包含第一个斜杠，上面url的pathname如下：

`/path`

#### search

 URL 中得查询字符串，包含开头的问号，上面url的search如下：

`?foo=bar&hello=world`

#### path

 pathname 和 search 连在一起，上面url的path如下：

`/path?foo=bar&hello=world`


#### query

查询字符串中得参数部分，或者使用 querystring.parse() 解析后返回的对象。，上面url的query如下：

`foo=bar&hello=world`


#### hash

URL 的 “#” 后面部分（包括 # 符号），上面url的hash如下：

`#hash`


### url常用方法

#### parse方法

##### 语法

> url.parse(urlStr[, parseQueryString][, slashesDenoteHost])

输入 URL 字符串，返回一个对象。

第二个参数为 true 时，使用 querystring 来解析查询字符串。如果为 true，query 属性将会一直赋值为对象，并且 search 属性将会一直是字符串(可能为空)。默认为 false。

第三个参数为true ，把 //foo/bar 当做{ host: 'foo', pathname: '/bar' } ，而不是{ pathname: '//foo/bar' }。默认为 false。

##### 实例

	var urlStr = 'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash';
	var url = require('url');
	url.parse(urlStr);

	//返回如下结果

	{ protocol: 'http:',
	  slashes: true,
	  auth: null,
	  host: 'www.limingyang2012.com:8888',
	  port: '8888',
	  hostname: 'www.limingyang2012.com',
	  hash: '#hash',
	  search: '?foo=bar&hello=world',
	  query: 'foo=bar&hello=world',
	  pathname: '/path',
	  path: '/path?foo=bar&hello=world',
	  href: 'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash' }

如果第二个参数为true的话

	var urlStr = 'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash';
	var url = require('url');
	url.parse(urlStr);

	//返回如下结果

	{ protocol: 'http:',
	  slashes: true,
	  auth: null,
	  host: 'www.limingyang2012.com:8888',
	  port: '8888',
	  hostname: 'www.limingyang2012.com',
	  hash: '#hash',
	  search: '?foo=bar&hello=world',
	  query: { foo: 'bar', hello: 'world' },
	  pathname: '/path',
	  path: '/path?foo=bar&hello=world',
	  href: 'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash' }


#### format方法


##### 语法

> url.format(urlObj)

输入一个解析过的 URL 对象，返回格式化过的字符串。

格式化的工作流程：

* href 会被忽略
* protocol 无论是否有末尾的 : (冒号)，会同样的处理
* http, https, ftp, gopher, file 协议会被添加后缀://
* mailto, xmpp, aim, sftp, foo, 等协议添加后缀:
* slashes 如果协议需要 ://，设置为 true
* 仅需对之前列出的没有斜杠的协议，比如议 mongodb://localhost:8000/
* auth 如果出现将会使用.
* hostname 仅在缺少 host 时使用
* port 仅在缺少 host 时使用
* host 用来替换 hostname 和 port
* pathname 无论结尾是否有 / 将会同样处理
* search 将会替代 query属性
* 无论前面是否有 / 将会同样处理
* query (对象; 参见 querystring) 如果没有 search,将会使用
* hash 无论前面是否有#，都会同样处理

##### 实例
	
	var urlObj = { protocol: 'http:',
	  slashes: true,
	  auth: null,
	  host: 'www.limingyang2012.com:8888',
	  port: '8888',
	  hostname: 'www.limingyang2012.com',
	  hash: '#hash',
	  search: '?foo=bar&hello=world',
	  query: 'foo=bar&hello=world',
	  pathname: '/path',
	  path: '/path?foo=bar&hello=world',
	  href: 'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash' };
	
	var url = require('url');
	
	url.format(urlObj)
	//'http://www.limingyang2012.com:8888/path?foo=bar&hello=world#hash'



### querystring常用方法和属性

#### stringify方法

##### 语法

> querystring.stringify(obj, [sep], [eq])

将一个对象序列化化为一个 query string 。

可以选择重写默认的分隔符('&') 和分配符 ('=')。

Options 对象可能包含 encodeURIComponent 属性 (默认：querystring.escape),如果需要，它可以用 non-utf8 编码字符串。

##### 实例

	querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
	// returns
	'foo=bar&baz=qux&baz=quux&corge='
	
	querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
	// returns
	'foo:bar;baz:qux'
	
	// Suppose gbkEncodeURIComponent function already exists,
	// it can encode string with `gbk` encoding
	querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
	  { encodeURIComponent: gbkEncodeURIComponent })
	// returns
	'w=%D6%D0%CE%C4&foo=bar'


#### parse方法

##### 语法


> querystring.parse(str[, sep][, eq][, options])

将 query string 反序列化为对象。

可以选择重写默认的分隔符('&') 和分配符 ('=')。

Options 对象可能包含 maxKeys 属性（默认：1000），用来限制处理过的健值（keys）。设置为 0 的话，可以去掉键值的数量限制。

Options 对象可能包含 decodeURIComponent 属性（默认：querystring.unescape），如果需要，可以用来解码 non-utf8 编码的字符串。


##### 实例
	
	querystring.parse('foo=bar&baz=qux&baz=quux&corge')
	// returns
	{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
	
	// Suppose gbkDecodeURIComponent function already exists,
	// it can decode `gbk` encoding string
	querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
	  { decodeURIComponent: gbkDecodeURIComponent })
	// returns
	{ w: '中文', foo: 'bar' }




























