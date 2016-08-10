---
layout: post
title:  "JAVA中集合List、Set、Map功能与源码分析（1）"
date:  2016-05-03
categories: JAVA
---

Collection接口：List接口-实现类ArrayList、Vector、LinkedList 

---

- 目录
{:toc}

### Java集合类-概述

- 集合相对于数组优点：可变长
![collection](/images/java-collection.png)

### 单列集合遍历(List,Set)

- Collection均可用Iterator迭代器遍历
- 其中List除了具有Collection接口必备的iterator()方法外List还提供一个listIterator(n)方法，返回一个ListIterator接口，允许从n处向前或向后遍历(.hasPrevious() 与 .previoue() )双向遍历。

##### 集合遍历的3种方式：

- 方法一：Iterator迭代器
```java	
	Iterator<Integer> it = set.iterator();
	while (it.hasNext()) {
		it.next()
	}
```
- 方式二：for(:) 本质也是Iterator迭代器
```java	
	for (Integer obj : set) {
		//obj
	}
```
- 方式三: .size() 通过`get(index)`方法获取
```java	
	for(int i=0;i<set.size();i++){
		  list.get(index)
	}
```

##### ***Iterator迭代器修改时异常***

- List与set 中用迭代器遍历时，调用next()都会 checkForComodification()，会引起expectedModCount，modCount不相等，从而抛出异常

- ***解决方案***
1. 用Iterator的remove()方法，会有expectedModCount = modCount操作，从而不会抛异常
2. 多线程下：
	① iterator迭代的时候使用synchronized或者Lock进行同步
	② 并发容器CopyOnWriteArrayList代替ArrayList和Vector

### List接口

- 实现类： ArrayList、LinkedList、Vector（子类stack）

1. 数组式存储
- ArrayList 和Vector是采用数组方式存储数据，都允许直接序号索引元素，但是插入数据要移动数组元素，所以索引数据快插入，删除数据慢。
Vector由于使用了synchronized方法（线程安全）所以性能上比ArrayList要差。
2. 双向链表
- LinkedList使用双向链表实现存储，按序号索引数据需要进行向前或向后遍历，但是插入数据时只需要记录本项的前后项即可，所以插入、删除数度较快！



