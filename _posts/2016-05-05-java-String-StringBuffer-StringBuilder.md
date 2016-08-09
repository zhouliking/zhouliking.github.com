---
layout: post
title:  "JAVA中String/StringBuffer/StringBuilder异同"
date:  2016-06-05
categories: JAVA
---

String类，StringBuffer类，StringBuilder类

---

### String类:
__是不可变类__,任何对String的改变都会引发新的String对象的生成。

`修饰为final的原因`：
主要是为了“效率” 和 “安全性” 的缘故。若 String允许被继承, 由于它的高度被使用率, 可能会降低程序的性能，所以String被定义成final。
将方法或类声明为final主要目的是：确保它们不会再子类中改变语义。String类是final类，这意味着不允许任何人定义String的子类。换言之，如果有一个String的引用，它引用的一定是一个String对象，而不可能是其他类的对象。《Java核心技术 卷I》
`修饰为final的缺陷`：
多次改变String后，当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，那速度是一定会相当慢的。


```java
     package java.util.concurrent.locks;

     public abstract class AbstractQueuedSynchronizer
               extends AbstractOwnableSynchronizer  implements java.io.Serializable {
      //....         
    }
```
类Semaphore、CountDownLatch、ReentrantLock、ReentrantReadWriteLock、FutureTask等虽然各自都有不同特征，
但是简单看一下源码，每个类内部都包含一个如下的内部类定义：

```java
      abstract static class Sync extends AbstractQueuedSynchronizer{
        // ....
      }
```
所有的同步均委托给Sync完成：

```java
      /** Synchronizer providing all implementation mechanics */
      private final Sync sync;
```
`注`：有些同步类，像 CyclicBarrier内部，用的ReentrantLock，所以也是委托给AQS完成同步的
