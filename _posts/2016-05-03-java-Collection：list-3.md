---
layout: post
title:  "JAVA集合List、Set、Map功能与源码分析（3）"
date:  2016-05-03
categories: JAVA
---

HashSet(LinkedHashSet)、HashMap(LinkedHashMap)、HashTable

---

- 目录
{:toc}

### Set、Map

> 1. Set接口：Set单列集合、无序、不可重复 
> 2. 实现类TreeSet , HashSet (子类LinkedHashSet)          

> 3. Map接口：双列集合
> 4. 实现类TreeMap , HashMap (子类LinkedHashMap)、Hashtable 

> `注意`：

>  1. 1.遍历 Tree结构：TreeSet/TreeMap时，是按照比较器顺序输出的
>  2. - tree结构的`必须实现比较功能`,不然会有java.lang.ClassCastException异常
>  3. - 存放一个对象，不会有异常.JDK中很多类均实现了比较器，如String，Integer
>  4. 2.遍历Hash结构是，无序的

### HashSet 与 HashMap

> 1.Hash结构的，存入对象时，`需要重写hashCode() 与 equals() 方法 `
> 2.Object中默认的 hashCode()方法，`仅仅对引用去hash值`，因此，需要重写hashCode()

```java
	public class Object {

		protected native Object clone() throws CloneNotSupportedException;

		public native int hashCode();

		public boolean equals(Object obj) {
			return (this == obj);
		}
		//...
	}
```

##### HashSet

> HashSet:底层HashMap实现

```java
	public class HashSet<E>
		extends AbstractSet<E>
		implements Set<E>, Cloneable, java.io.Serializable
	{
		public HashSet() {
			map = new HashMap<>();
		}
		//...
	}
```

##### HashMap

> 1. 1.非线程安全，不同步  `HashTable线程安全`
> 2. 2.允许key与value 均为null 值
> 3. 3.HashMap的底层主要是：`Entry数组`，`链表`(解决hash冲突)。
> 4. 4.Entry对象： key , value, next，其中next也是一个Entry对象，解决hash冲突的，形成一个链表。

- HashMap参数

```java
	transient Entry[] table; 
	transient int size;
	int threshold; //临界值: 超过临界值时，会进行扩容threshold = 加载因子*容量
	final float loadFactor; //加载因子: 默认0.75f  默认容量为 16
	transient int modCount; //被修改的次数
```
> 1. 加载因子
> 加载因子越大,填满的元素越多,好处是,空间利用率高了,但冲突的机会加大了.链表长度会越来越长,查找效率降低。加载因子越小,填满的元素越少,好处是:冲突的机会减小了,但:空间浪费多了.表中的数据将过于稀疏（很多空间还没用，就开始扩容了）
> 冲突的机会越大,则查找的成本越高
> 因此,必须在 "冲突的机会"与"空间利用率"之间寻找一种平衡与折衷. 这种平衡与折衷本质上是数据结构中有名的"时-空"矛盾的平衡与折衷.
> - 如果机器内存足够，并且想要提高查询速度的话可以将加载因子设置小一点；相反如果机器内存紧张，并且对查询速度没有什么要求的话可以将加载因子设置大一点。不过一般我们都不用去设置它，让它取默认值0.75就好了。

 


