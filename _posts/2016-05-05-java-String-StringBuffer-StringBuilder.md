---
layout: post
title:  "JAVA中String/StringBuffer/StringBuilder异同"
date:  2016-06-05
categories: JAVA
---

String类，StringBuffer类，StringBuilder类

---

### String类:
#### __是不可变类__,任何对String的改变都会引发新的String对象的生成。

`修饰为final的原因`：
主要是为了“效率” 和 “安全性” 的缘故。若 String允许被继承, 由于它的高度被使用率, 可能会降低程序的性能，所以String被定义成final。
将方法或类声明为final主要目的是：确保它们不会再子类中改变语义。String类是final类，这意味着不允许任何人定义String的子类。换言之，如果有一个String的引用，它引用的一定是一个String对象，而不可能是其他类的对象。《Java核心技术 卷I》
`修饰为final的缺陷`：
多次改变String后，当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，那速度是一定会相当慢的。

#### String存放区域：
```java
   String str1 = new String("123");
   
   String str2 = str1.intern();
   String str3 = "123";
   System.out.print(Str1 == str2); //false
   System.out.print(Str2 == str3); //true  
```
- 创建str1 字符串String对象，___Str1 指向堆___
- 调用 `.intern()函数` 会在常量池中寻找与该字符串相同的串，若有，则返回引用；若没有，则在常量池中创建。
str2指向常量池中该字符串值的引用。
- `String str3 = "123"`:会直接在常量池中寻找，若有，则返回引用；若没有，则在常量池中创建，并返回引用

#### JVM “+”优化
- Java对String的变量相加是通过StringBuffer实现的，先new一个StringBuffer存放原始值，然后调用 `append()方法`
- StringBuffer转化成String对象。StringBuffer对象在堆内存中，那转换成的String对象理所应当的也是在堆内存中。

```java
	String strA = "tao"+"bao";  //String型常量，JVM 会优化合成一个串
	String strB = "tao";
	String strC = "bao";
	strA == str1           // ture
	(strB + strC) == str1  // false
	
	final String b = "tao";
	final String c = "bao";
	(b+c)== str1           //true   final类型的变量编译器会优化
```
- 常量字符串(如，"123") 或final修饰的变量
- strB + strC，结果为堆中的变量。中编译器不会对变量优化，编译器怕改变了变量的值。Java对String的变量相加是通过StringBuffer实现的，先构造一个StringBuffer里面存放值，StringBuffer转化成String对象。StringBuffer对象在堆内存中，那转换成的String对象理所应当的也是在堆内存中。

类Semaphore、CountDownLatch、ReentrantLock、ReentrantReadWriteLock、FutureTask等虽然各自都有不同特征，
但是简单看一下源码，每个类内部都包含一个如下的内部类定义：

```java
      abstract static class Sync extends AbstractQueuedSynchronizer{
        // ....
      }

	  

```java
      /** Synchronizer providing all implementation mechanics */
      private final Sync sync;
```
`注`：有些同步类，像 CyclicBarrier内部，用的ReentrantLock，所以也是委托给AQS完成同步的
