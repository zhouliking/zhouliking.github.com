---
layout: post
title:  "JAVA集合List、Set、Map功能与源码分析（2）"
date:  2016-05-02
categories: JAVA
---

TreeSet、TreeMap、AVL树、红黑树、Comparable/Comparator

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

### TreeSet 与TreeMap

#### 红黑树

##### 1.二叉排序树(BST树)

- 二叉排序树又叫二叉查找树（BSTBinary Sort Tree）

> 1. 1.所有非叶子结点至多拥有两个儿子（Left和Right）；
> 2. 2.所有结点存储一个关键字
> 3. 3.左小右大：`左 < 中 < 右`,***BST的中序遍历必定是严格递增的***
> 4. 4.二叉排序树各项操作的平均时间复杂度为O(logn),但是最坏情况下，二叉排序树会退化成单链表,复杂度为O(n)

- BST树的搜索，从根结点开始，如果查询关键字比结点关键字小，就进入左儿子；如果比结点关键字大，就进入右儿子；如果左儿子或右儿子的指针为空，则报告找不到相应的关键字；
- 如果BST树的所有非叶子结点的左右子树的结点数目均保持差不多（平衡），那么B树的搜索性能逼近二分查找；但它比连续内存空间的二分查找的优点是，改变BST树结构（插入与删除结点）不需要移动大段的内存数据，甚至通常是常数开销.

##### 2.平衡二叉查找树（AVL树）

> 1. 1.是二BST树,左小右大
> 2. 2.左右子树深度之差的绝对值不超过1
> 3. 3.左右子树仍然为平衡二叉树

- 平衡因子BF=左子树深度－右子树深度 (平衡因子只能是1，0，-1)]

##### 3.红黑树（RB树）

- AVL是严格平衡树，因此在增加或者删除节点的时候，根据不同情况，旋转的次数比红黑树要多；
- 红黑是`弱平衡`的，用非严格的平衡来换取增删节点时候旋转次数的降低;


- 搜索的次数远大于插入和删除，那么选择AVL树
- 如果搜索，插入删除次数几乎差不多，应该选择红黑树（RB树）

- 红黑树：含五个域，color，key，left，right，p
- 红黑树满足五条性质：

> 1. 1.每个结点要么是红的，要么是黑的。
> 2. 2.根结点是黑的
> 3. 3.每个叶结点，即空结点（NIL）是黑的
> 4. 4.若一个结点为红色，则其子结点为黑色
> 5. 4.每个叶结点到根结点的路径中黑色结点的数目一致（黑高度相同）

- 红黑树与AVL树优点：
1. 的查询和更新的时间复杂度为`均为O(logn)`
- 红黑树与AVL树缺点：
1. 插入、删除添加了额外的操作，着色、旋转 操作对其进行修复平衡

#### TreeMap
- `TreeMap是红黑树实现`
- `必须有比较器`，查询，更新都有比较操作

- 1. TreeMap属性（4个）

```java
	private final Comparator<? super K> comparator; //比较器
	private transient Entry<K,V> root = null;  //树根
	private transient int size = 0; 
	private transient int modCount = 0;
```

- 2. TreeMap构造器

```java
	public TreeMap() {
		comparator = null;
	}
	public TreeMap(Comparator<? super K> comparator) {
		this.comparator = comparator;
	}
```

- 3. TreeMap的Entry节点 (6个属性)

```java
	tatic final class Entry<K,V> implements Map.Entry<K,V> {
		K key;
		V value;
		Entry<K,V> left = null;
		Entry<K,V> right = null;
		Entry<K,V> parent;      父节点
		boolean color = BLACK;  默认颜色
		//...
	}
```

- 4. TreeMap的特点

> 1. 1.TreeMap：允许空值，key不可以为空，线程不安全
> 2. 2.必有比较器
> 3. 3.TreeMap`遍历的结果集是有序的`(中序遍历,左 < 中 < 右) 
> 4. 3.TreeMap的各项操作的平均时间复杂度为O（logn）

#### TreeSet

> TreeSet `不可重复`,`有序`,`底层是TreeMap(红黑树)` ,必须要比较器

```java
	public TreeSet() {
		this(new TreeMap<E,Object>());//直接new了一个TreeMap对象
	}
	public TreeSet(Comparator<? super E> comparator) {
		this(new TreeMap<>(comparator));
	}
```

#### 比较器Comparable/Comparator

> 添加多个对象时必须实现比较功能：不然会有java.lang.ClassCastException异常 
>  (只存放一个对象，不会有异常)。Jdk中很多类均实现了比较器，如String，Integer

- 1.类，实现Comparable接口，重写方法：compareTo(Object o)

```java
	class Person implements Comparable{
		public int compareTo(Object o) {				
			return 0 -1 1;
		}
	}
```

- 2.编写比较器，实现Comparator接口，重写compare(Object, Object)

```java
	Comparator<Person> myComparator = new Comparator<Person>() {
		public int compare(Person p1, Person p2) {
			return 0 -1 1;
		}
	};
	//然后.set的构造器中传入比较器
	TreeSet<Person> tree = new TreeSet<>(myComparator);
```



 


