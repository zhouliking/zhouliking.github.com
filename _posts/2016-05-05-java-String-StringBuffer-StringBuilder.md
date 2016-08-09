---
layout: post
title:  "JAVA中String/StringBuffer/StringBuilder异同"
date:  2016-06-05
categories: JAVA
---

字符串：移位&全排&最大子序

---
###String类:
__是不可变类__,任何对String的改变都会引发新的String对象的生成；


### AbstractQueuedSynchronizer类：

java.util.concurrent的基础。J.U.C中宣传的封装良好的同步工具

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
