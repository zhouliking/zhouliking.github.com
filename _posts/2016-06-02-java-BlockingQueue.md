---
layout: post
title:  "java并发容器源码分析-BlockingQueue"
date:  2016-06-08
categories: JAVA
---

java并发容器源码分析-BlockingQueue

---

- 目录
  {:toc}

#### concurrent包中并发容器优点

JDK5中添加了新的concurrent包，其中包含了很多并发容器，这些容器针对多线程环境进行了优化，大大提高了容器类在并发环境下的执行效率。

一、CopyOnWriteArrayList/CopyOnWriteArraySet
    JDK中并没有提供CopyOnWriteMap，我们可以参考CopyOnWriteArrayList来实现一个
二、BlockingQueue
三、ConcurrentHashMap

#### 二、BlockingQueue接口

```java
    //实现了java.util.Queue接口
    public interface BlockingQueue<E> extends Queue<E> {
    ...
    }
```

##### 1.BlockingQueue接口主要实现类

###### ① ArrayBlockingQueue

FIFO先进先出队列，基于数组实现的一个阻塞队列，在创建ArrayBlockingQueue对象时必须制定容量大小。
并且可以指定公平性与非公平性，默认情况下为非公平的，即不保证等待时间最长的队列最优先能够访问队列。

```java
        public class ArrayBlockingQueue<E> extends AbstractQueue<E>
                    implements BlockingQueue<E>, java.io.Serializable {
          /** The queued items */
          final Object[] items;
          
          //同步部分 ReentrantLock Condition
          /** Main lock guarding all access */
          final ReentrantLock lock;
          /** Condition for waiting takes */
          private final Condition notEmpty;      //notEmpty
          /** Condition for waiting puts */
          private final Condition notFull;       //notFull
          ....
        }
```

###### ② LinkedBlockingQueue：

FIFO先进先出队列，基于链表实现的一个阻塞队列，
在创建LinkedBlockingQueue对象时如果不指定容量大小，则默认大小为Integer.MAX_VALUE。

```java
        public class LinkedBlockingQueue<E> extends AbstractQueue<E>
                       implements BlockingQueue<E>, java.io.Serializable {
           static class Node<E> {
               E item;
    
              /**
               * One of:
               * - the real successor Node
               * - this Node, meaning the successor is head.next
               * - null, meaning there is no successor (this is the last node)
               */
              Node<E> next;
      
              Node(E x) { item = x; }
          }
    
          /** The capacity bound, or Integer.MAX_VALUE if none */
          private final int capacity;
      
          /** Current number of elements */
          private final AtomicInteger count = new AtomicInteger();
          
           transient Node<E> head;
    
          /**
           * Tail of linked list.
           * Invariant: last.next == null
           */
          private transient Node<E> last;
      
          /** Lock held by take, poll, etc */
          private final ReentrantLock takeLock = new ReentrantLock();
          .......
        }
```

###### ③ PriorityBlockingQueue：是优先级队列，不是FIFO，它会按照元素的优先级对元素进行排序，按照优先级顺序出队，
每次出队的元素都是优先级最高的元素。
注意，此阻塞队列为无界阻塞队列，即容量没有上限（通过源码就可以知道，它没有容器满的信号标志），前面2种都是有界队列。

```java
        public class PriorityBlockingQueue<E> extends AbstractQueue<E>
                     implements BlockingQueue<E>, java.io.Serializable {
            private transient Object[] queue;
            /**
             * The number of elements in the priority queue.
             */
            private transient int size;
        
            /**
             * The comparator, or null if priority queue uses elements'
             * natural ordering.
             */
            private transient Comparator<? super E> comparator;
        
            /**
             * Lock used for all public operations
             */
            private final ReentrantLock lock;
        
            /**
             * Condition for blocking when empty
             */
            private final Condition notEmpty;
            ......
        }
```


