---
layout: post
title:  "【node学习笔记】事件模块-events模块"
date:  2016-04-08
categories: Node
---

记录自己node的学习历程，供自己日后查阅

---

* content
{:toc}


### 写在前面

events具有EventEmitter类，可以通过以下式子获取EventEmitter类。

	var EventEmitter = require('events').EventEmitter

我们可以把它简单的看成一个构造函数，既然是构造函数自然可以通过new关键词返回他的实例,如下。

	var emitter = new EventEmitter()

emitter作为EventEmitter的实例拥有很多方法，如on进行方法监听，emit进行事件的触发。当然除了方法还具有一些事件，当添加新的监听器时，newListener事件会触发，当监听器被移时，removeListener事件被触发。下面就简单的介绍这些方法和事件。

### 基本方法

#### 事件监听on

当然用addListener也是一样嗒

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

##### 语法

> emitter.addListener(event, listener)
> emitter.on(event, listener)

添加一个监听者到特定 event 的监听数组的尾部，触发器不会检查是否已经添加过这个监听者。 多次调用相同的 event 和 listener 将会导致 listener 添加多次。

##### 实例

	var EventEmitter = require('event').EventEmitter
	//这里为啥用EventEmitter而不用eventEmitter我想可能和他类构造函数相似吧。
	var emitter = new EventEmitter();
	
	emitter.on('someEvent',function(){
	  console.log('someEvent1');
	})

上述表示为事件someEvent设置了一个事件监听器。

默认情况下，Node.js允许同一个事件最多可以指定10个回调函数。超过10个回调函数，会发出一个警告。这个门槛值可以通过setMaxListeners方法改变。

	emitter.setMaxListeners(20);

当然也可以通过EventEmitter.defaultMaxListeners来设置。emitter.setMaxListeners(n) 设置一个分发器的最大 listener 数，而这个函数会立即设置所有EventEmitter 的当前值和默认值。要小心使用。

请注意， emitter.setMaxListeners(n) 的优先级高于 EventEmitter.defaultMaxListeners.


#### 事件触发emit

##### 语法

> emitter.emit(event[, arg1][, arg2][, ...])

使用指定的参数顺序的执行每一个 listener.其中参数arg1等是可选的，需要时才添加

如果事件有 listener,返回 true， 否则 false

##### 实例
	
	//emit.js
	var EventEmitter = require('events').EventEmitter

	var emitter = new EventEmitter();

	emitter.on('someEvent',function(){
	  console.log('someEvent1');
	})
	
	var bool = emitter.emit('someEvent');
	console.log(bool);

输出

	$ node emit.js
	someEvent1
	true

有参数时

	//emit.js
	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();

	emitter.on('someEvent',function(arg){
	  console.log('someEvent1'+arg);
	})
	
	emitter.emit('someEvent','参数');

输出

	$ node emit.js
	someEvent1参数

监听多个事件

	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();
	
	emitter.on('someEvent',function(){
	  console.log('someEvent1');
	})
	emitter.on('someEvent',function(){
	  console.log('someEvent2');
	})
	emitter.on('someEvent',function(){
	  console.log('someEvent3');
	})
	emitter.on('someEvent',function(){
	  console.log('someEvent4');
	})
	emitter.on('someEvent',function(){
	  console.log('someEvent5');
	})
	
	emitter.emit('someEvent');

输出

	$ node emit.js
	someEvent1
	someEvent2
	someEvent3
	someEvent4
	someEvent5


注意添加不能超过10个，可以按照上面的方法设置。


#### once方法

##### 语法

> emitter.once(event, listener)


给事件添加一个一次性的 listener，这个 listener 只会被触发一次，之后就会被移除。

##### 实例

作为比较我们先演示on事件

	//on.js
	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();
	
	emitter.on('someEvent',function(){
	  console.log('someEvent1');
	})
	
	emitter.emit('someEvent');
	emitter.emit('someEvent');
	emitter.emit('someEvent');

输出

	$ node once.js
	someEvent1
	someEvent1
	someEvent1


当使用once的时候结果就不一样了，后面的就不会被触发了。

	//once.js
	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();
	
	emitter.once('someEvent',function(){
	  console.log('someEvent1');
	})
	
	emitter.emit('someEvent');
	emitter.emit('someEvent');
	emitter.emit('someEvent');

输出

	$ node once.js
	someEvent1

上面代码触发了三次someEvent事件，但是回调函数只会在第一次调用时运行。


#### removeListener和removeAllListeners

##### 语法

> emitter.removeListener(event, listener)
> emitter.removeAllListeners([event])


removeListener从一个某个事件的 listener 数组中移除一个 listener。注意，这个操作会改变 listener 数组内容的次序。removeListener 最多会移除数组里的一个 listener。如果多次添加同一个 listener 到数组，那就需要多次调用 removeListener 来移除每一个实例。removeAllListeners移除所有的 listener，或者某个事件的 listener。最好不要移除全部 listener，尤其是那些不是你传入的（比如 socket 或 文件流）。

##### 实例


	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();
	
	var listener1 = function(){
		console.log('someEvent1');
	}
	var listener2 = function(){
		console.log('someEvent2');
	}
	var listener3 = function(){
		console.log('someEvent3');
	}
	
	emitter.on('someEvent',listener1)
	emitter.on('someEvent',listener2)
	emitter.on('someEvent',listener3)
	
	emitter.removeListener('someEvent',listener2);
	
	emitter.emit('someEvent');

输出

	$ node removeListener.js
	someEvent1
	someEvent3

由于上面我们已经移除了对listener2的监听，所以输出结果中没有。


### 事件类型

events模块默认支持两个事件。

newListener在添加 listener 时会发生该事件。 此时无法确定 listener 是否在 emitter.listeners(event) 返回的列表中。

removeListener在移除 listener 时会发生该事件。 此时无法确定 listener 是否在 emitter.listeners(event) 返回的列表中。

#### 实例

	var EventEmitter = require('events').EventEmitter
	var emitter = new EventEmitter();
	
	emitter.on('newListener',function(eventName){
		console.log('输出1'+eventName)
	})
	
	emitter.on('removeListener',function(eventName){
		console.log('输出1'+eventName)
	})
	
	var listener = function(){}
	
	emitter.on('someEvent',listener);
	
	emitter.removeListener('someEvent',listener);

输出

	$ node event.js
	输出1removeListener
	输出1someEvent
	输出1someEvent

上面代码会触发两次newListener事件，因为我们在添加removeListener的时候其实也是添加方法，所以也触发了newListener事件。以及一次removeListener事件。


### 继承EventEmitter

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

#### 原型式继承

主要通过ES5提供的Object.create()来实现继承

	var EventEmitter = require('events').EventEmitter
	
	function Animal(name) {
	  this.name = name;
	}
	
	Animal.prototype = Object.create(EventEmitter.prototype);
	
	var dog = new Animal('dog');
	
	dog.on('bark', function(){
	  console.log(this.name + ' barked');
	});
	
	setInterval(function(){
	  dog.emit('bark');
	}, 1000);

Animal继承了EventEmitter，所以其实例拥有on和emit方法，上面代码每隔1s将函数加入队列中。


#### util模块实现继承

	var util = require('util');
	var EventEmitter = require('events').EventEmitter;
	 
	function Animal(name){
	  this.name = name;
	  EventEmitter.call(this);
	}
	
	util.inherits(Animal,EventEmitter);
	 
	Animal.prototype.sayName = function()
	{
	  console.log('my name is ' + this.name)
	}
	 
	var dog = new Animal('dog');
	
	dog.on('sayName',function(name){
	  console.log('my name is ' + name);
	})
	dog.emit('sayName','dog');
	dog.sayName();

输出

	my name is dog
	my name is dog














	







