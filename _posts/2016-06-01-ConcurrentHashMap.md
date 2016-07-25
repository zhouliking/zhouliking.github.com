---
layout: post
title:  "java并发容器源码分析-ConcurrentHashMap"
date:  2016-06-02
categories: JAVA
---

java并发容器源码分析-ConcurrentHashMap

---

- 目录
  {:toc}

#### Content：

一、CopyOnWriteArrayList/CopyOnWriteArraySet
    JDK中并没有提供CopyOnWriteMap，我们可以参考CopyOnWriteArrayList来实现一个
二、BlockingQueue
三、ConcurrentHashMap

#### 三、ConcurrentHashMap

##### 1.与同步容器HashTable比较

同步集合：Hashtable，是对整张Hash表synchronized，即每次锁住整张表让线程独占，这样虽然线程安全了，但效率大为下降了
​    
并发集合：ConcurrentHashMap允许多个修改操作并发进行，其关键在于使用了锁分离技术。ConcurrentHashMap的每个段（Segment，
继承了ReentrantLock）均是不同的锁。只要多个修改操作发生在不同的段上，它们就可以并发进行。
​              
`注意`：有些操作可能需要锁住整张表（如 size()和containsValue() ），这需要按顺序锁定所有段，操作完毕后，
又按顺序释放所有段的锁。这里“按顺序”是很重要的，否则极有可能出现死锁，在ConcurrentHashMap内部，段数组是final的，
并且其成员变量实际上也是final的，但是，仅仅是将数组声明为final的并不保证数组成员也是final的，这需要实现上的保证。
这可以确保不会出现死锁，因为获得锁的顺序是固定的。
​          
##### 2.应用场景

当有一个大数组时需要在多个线程共享时就可以考虑是否把它给分层多个节点了，避免大锁。并可以考虑通过hash算法进行一些模块定位。

##### 3.源码分析

ConcurrentHashMap主要内实体类(3个)：ConcurrentHashMap（整个Hash表）,Segment（桶），HashEntry（节点）
​    
###### 读不加锁：

volatile修饰value，确保读操作能够看到最新的值  
ConcurrentHashMap完全允许多个读操作并发进行，读操作并不需要加锁，如果使用传统的技术，如HashMap中的实现，
如果允许可以在hash链的中间添加或删除元素，读操作不加锁将得到不一致的数据
HashEntry：几乎是不可变的。HashEntry代表每个hash链中的一个节点


          static final class HashEntry<K,V> {
              final int hash;
              final K key;
              volatile V value;
              volatile HashEntry<K,V> next;
              ...
          }

可以看到除了value不是final的，其它值都是final的，这意味着不能从hash链的中间或尾部添加或删除节点。
因为这需要修改next 引用值，所有的节点的修改只能从头部开始。对于put操作，可以一律添加到Hash链的头部。
但是对于remove操作，可能需要从中间删除一个节点，这就需要将要删除节点的前面所有节点整个复制一遍，
最后一个节点指向要删除结点的下一个结点。为了确保读操作能够看到最新的值，将value设置成volatile，这避免了加锁。
​          
###### 修改,添加(需要加锁)：

但并不一定有锁争用，原因在于ConcurrentHashMap将缓存的变量分到多个Segment，每个Segment上有一个锁，
只要多个线程访问的不是一个Segment就没有锁争用，就没有堵塞，各线程用各自的锁。
​        
        ConcurrentHashMap缺省：情况下生成16个Segment，也就是允许16个线程并发的更新而尽量没有锁争用。


              public V put(K key, V value) {
                  return putVal(key, value, false);
              }
              
              final V putVal(K key, V value, boolean onlyIfAbsent) {
                  //不允许有空值，空key；因此，若需要存空value或key，只能用Collections包装的HashMap
                  if (key == null || value == null) throw new NullPointerException();
                  int hash = spread(key.hashCode());
                  int binCount = 0;
                  for (Node<K,V>[] tab = table;;) {
                      Node<K,V> f; int n, i, fh;
                      if (tab == null || (n = tab.length) == 0)
                          tab = initTable();
                      else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                          if (casTabAt(tab, i, null,
                                       new Node<K,V>(hash, key, value, null)))
                              break;                   // no lock when adding to empty bin
                      }
                      else if ((fh = f.hash) == MOVED)
                          tab = helpTransfer(tab, f);
                      else {
                          V oldVal = null;
                          synchronized (f) {
                             ....
                          }
                          if (binCount != 0) {
                              if (binCount >= TREEIFY_THRESHOLD)
                                  treeifyBin(tab, i);
                              if (oldVal != null)
                                  return oldVal;
                              break;
                          }
                      }
                  }
                  addCount(1L, binCount);
                  return null;
              }
              
      size()操作：尽量避免对所有的Segment都加锁
              final long sumCount() {
                  CounterCell[] as = counterCells; 
                  CounterCell a;
                  long sum = baseCount;
                  if (as != null) {
                      for (int i = 0; i < as.length; ++i) {
                          if ((a = as[i]) != null)
                              sum += a.value;
                      }
                  }
                  return sum;
              } 


###### 弱一致性的迭代器：
允许一边更新、一边遍历，在Iterator对象遍历的时候，ConcurrentHashMap也可以进行remove,put操作，
且遍历的数据会随着remove,put操作产出变化。
​        

以下代码不会抛出异常：


    java.util.ConcurrentModificationException
          		ConcurrentHashMap<Integer, String> map = new ConcurrentHashMap<>();
          		map.put(1, "a");
          		map.put(2, "b");
          		map.put(3, "c");
          		map.put(4, "d");
          		
          		Iterator<Integer> it = map.keySet().iterator();
          		while(it.hasNext()){
          			Integer t = it.next();
          			if(t== 1){
          			   map.remove(t);
          			}
          			System.out.println(t);
          		}


