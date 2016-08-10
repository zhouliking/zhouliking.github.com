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
1. iterator迭代的时候使用synchronized或者Lock进行同步
2. 并发容器CopyOnWriteArrayList代替ArrayList和Vector

### List接口

- 实现类： ArrayList、LinkedList、Vector（子类stack）

1. 数组式存储
- ArrayList 和Vector是采用数组方式存储数据，都允许直接序号索引元素，但是插入数据要移动数组元素，所以索引数据快插入，删除数据慢。
Vector由于使用了synchronized方法（线程安全）所以性能上比ArrayList要差。
2. 双向链表
- LinkedList使用双向链表实现存储，按序号索引数据需要进行向前或向后遍历，但是插入数据时只需要记录本项的前后项即可，所以插入、删除数度较快！

### LinkedList类

- 双向链表， 插入和删除比ArrayList高效，非线程安全
- 还提供了一些作为栈、队列、双端队列的方法。(这些方法中有些彼此之间只是名称的区别，以使得这些名字在特定的上下文中显得更加的合适。)

##### LinkedList类源码
```java
	public class LinkedList<E>
		extends AbstractSequentialList<E>
		implements List<E>, Deque<E>, Cloneable, java.io.Serializable
	{	
		transient int size = 0;
		transient Node<E> first; //双向链表
		transient Node<E> last;
		private static class Node<E> {  //Node单元
			E item;
			Node<E> next;
			Node<E> prev;
			Node(Node<E> prev, E element, Node<E> next) {
				this.item = element; this.next = next; this.prev = prev;
			}
	}
```

##### LinkedList不是线程安全
- 可用java.util.Collections集合工具类来包装
```java
	List synlist = Collections.synchronizedList(list);
```
- 同样的可以包装：List、Set、Map
 `Collections.synchronizedXxx(非安全list/map/set)`
- Collections集合工具类用synchronized同步,源码如下：
```java
	public boolean equals(Object o) {
		synchronized (mutex) {return list.equals(o);}
	}
```

### ArrayList类
- 动态数组，继承了AbstractList, List接口

##### 源码分析
```java
public class ArrayList extends AbstractList  
	implements List,Cloneable,Serializable, RandomAccess
```
- 属性只有两个：
```java
	private transient Object[] elementData; //不进行序列化,元素数组
	private int size;     // 包含元素的数量
```
- 构造器3个：
```java
	//1.无参数，默认数组10个大小
    public ArrayList() {
        this(10);
    }
    //2.指定初始容量
	public ArrayList(int initialCapacity) {
        super();
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        this.elementData = new Object[initialCapacity];
	}
	//3.传入集合的
	public ArrayList(Collection<? extends E> c) {
	   elementData = c.toArray();//转数组
	   // ... 
	}
```
##### Add()方法
- 每次增加前会检测，是否 > oldCapacity，是否需要扩容，则不会发生越界
```java
	public boolean add(E e) {
		ensureCapacityInternal(size + 1);  // 每次增加元素时，modCount++;    
		elementData[size++] = e;
		return true;
	}
	private void ensureCapacityInternal(int minCapacity) {
        modCount++; //每次均修改会+1
        // overflow-conscious code
        if (minCapacity - elementData.length > 0)
            grow(minCapacity);
	}
```

##### .clear( )方法
- 并没有修改elementData的长度,仅将元素清空，size = 0
```java
	public void clear() {
		modCount++; 
		// Let gc do its work
		for (int i = 0; i < size; i++)
			elementData[i] = null;
		size = 0;
	}
```

##### .clone()方法
- 为浅复制，原elementData数组的内容赋值为原对象elementData数组的内容，将副本的modCount设置为0。

##### .toArray(T[] a) 
- 拷贝elementData从0至size-1位置的元素到新数组并返回。

### Vector类

- Vector与ArrayList 均为动态数组，均继承AbstractList，List接口
- 两者区别：
1. 线程安全：Vector方法都是线程安全，同步的synchronized
2. 扩充大小：往一个ArrayList或者Vector里插入一个元素的时候，如果内部数组空间不够了，ArrayList或者Vector就要扩展它的大小，Vector在默认情况下是增长一倍的大小，而ArrayList增加50%的大小。Vector中还可以在构造器中指定：初始大小，增长大小，ArrayList，仅能指定初始容量。
```java
	public Vector(int initialCapacity, int capacityIncrement) {  }
```