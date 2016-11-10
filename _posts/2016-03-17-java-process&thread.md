---
layout: post
title:  "线程与进程学习小结(JAVA)"
date:  2016-03-17
categories: JAVA
---

进程，线程，Java中创建、使用线程与进程

---

- 目录
{:toc}

### Java进程线程概述

> 一个Java应用程序对应着一个JVM实例（也有地方称为JVM进程），一般来说名字默认为java.exe或者javaw.exe。Java采用的是单线程编程模型，即在我们自己的程序中如果没有主动创建线程的话，只会创建一个线程，通常称为主线程。但是，虽然只有一个线程来执行任务，不代表JVM中只有一个线程，JVM实例在创建的时候，同时会创建很多其他的线程（比如垃圾收集器线程）。由于Java采用的是单线程编程模型，为了避免阻塞主线程，应该创建子线程去执行耗时任务

- 并发系统可以采用多种并发编程模型来实现：

> 1. ① 并行工作者  (多个worker并行， 有共享数据并发问题)
> 2. ② 流水线      worker1  worker2 ,多个worker链并行
> 3. ③ 函数式并行 Java7中的java.util.concurrent包里包含的ForkAndJoinPool能够帮助我们实现类似于函数式并行


### 进程概述

- 进程：从程序代码加载，到执行完毕的完整过程，是一个动态有生命(就绪,执行阻塞)的实体

> 1. ① 进程的优点:
> 2. 进程有独立的地址空间，一个进程崩溃后，在保护模式下不会对其它进程产生影响线程有自己的堆栈和局部变量，但线程之间没有单独的地址空间，一个线程死掉就等于整个进程死掉，所以多进程的程序要比多线程的程序健壮，
> 3. ② 进程缺点
> 4. 进程切换时，耗费资源比线程切换大，效率要差一些。但对于一些要求同时进行并且又要共享某些变量的并发操作，只能用线程，不能用进程。


### Java进程使用

- Java提供两种：启动进程或其他程序

> 1. （1）使用Runtime的exec()方法 
> 2. （2）使用ProcessBuilder的start()方法 

#### Process类

> 上述两种方式，启动进程后，都会返回一个Process类的实例代表启动的进程，该实例可用来控制进程并获得相关信息

- 常用方法

> 1. destroy()杀掉该子进程
> 2. getInputStream()获取子进程的输入流
> 3. getOutputStream()  获取子进程的输出流

#### 方法一：Runtime启动进程

- 注意：Runtime为单例模式设计，用getRuntime()获取实例

> 1. ① 每个 Java 应用程序都有一个 Runtime 类实例，使应用程序能够与其运行的环境相连接。
> 2. ② 应用程序不能创建自己的 Runtime 类实例。但可以通过 getRuntime 方法获取当前Runtime运行时对象的引用。
> 3. ③ 得到了一个当前的Runtime对象的引用，可调用Runtime对象的方法去控制Java虚拟机的状态和行为。 

```java
  Process p = Runtime.getRuntime().exec("notepad.exe");
```

#### 方法二：ProcessBuilder启动进程

```java
	ProcessBuilder pb = new ProcessBuilder("cmd","/c","ipconfig/all");
	Process process = pb.start();
	Scanner scanner = new Scanner(process.getInputStream());
	while(scanner.hasNext()){
		 scanner.nextLine();
	}
```

### 多线程

#### 多线程优缺点

- 多线程优点

> 1. ① 资源利用率更好，磁盘和CPU利用率的提升
> 2. ② 多核下程序响应快

- 多线程缺点

> 1. ① 多线程程序存在并发问题。访问共享数据
> 2. ② CPU 上下文切换开销（保存现场和加载现场，CPU频繁在寄存器和运行队列奔波,线程切换，而不是真正工作的线程上）
> 3. ③ 增加资源消耗，除了CPU，还需一些内存来维持它本地栈，来管理线程

#### 线程状态

- java多线有5种状态：创建(new)、就绪(runnable)、运行(running)、阻塞(blocked)、消亡（dead）

> 1. 阻塞：线程在运行状态过程中，让线程睡眠（睡眠一定的时间之后再重新执行）、用户主动让线程等待，或者被同步块给阻塞：time waiting（睡眠或等待一定的事件）、waiting（等待被唤醒）、blocked（阻塞）。
> 2. 消亡：突然中断，或者任务执行完毕

#### 线程间切换

- Java 线程是映射到操作系统原生线程上的，阻塞或唤醒均需要操作系统帮忙，需要切换到`系统态`

> 线程上下文切换：存储和恢复CPU状态的过程，使得线程执行能够从中断点恢复执行

#### Java多线程实现方式

> Java多线程实现方式(三种)

```java
	//java.lang.下：
	Thread thread = new Thread();
	thread.start();  线程执行了空的run()方法后，终止了
```

- ① 继承 Thread，重写run()方法

```java
    class MyThread extends Thread {
     run(){…}
    }
	//使用
    MyThread myThread = new MyThread();
    myTread.start();//启动此进程，一个线程只能用一次start()
```

- ② 实现Runnable接口，实现run()方法

```java
	public class MyRunnable implements Runnable {
		run()…
	}
	//使用
	Thread thread = new Thread(new myRunnable());
	thread.start();
```

- ③.继承Callable<T>接口，实现 T call()方法、Future实现有返回结果的多线程

> 1. 接收call方法返回值, 有两种方式：
> 2. ① futureTask用对象
> 3. ② 使用线程池 submit();

> 1. 方式一：Future接口的唯一实现类FutureTask（同时也实现了Runable接口）
> 2. 1.将callable对象封装成futureTask对象
> 3. FutureTask<Integer>futureTask = new FutureTask<>(callableObj);

> 1. 2.使用FutureTask对象作为Thread对象创建、并启动新线程
> 2. Thread thread = new Thread(futureTask); 因FutureTask继承了Runable接口
> 3. thread.start();

> 1. 3.调用FutureTask对象的方法来获得子线程执行结束后的返回值
> 2. futureTask.isDone()  / futureTask.get()

> 1. 方式二：线程池中使用ExecutorService的submit方法
> 2. <T> Future<T> submit(Callable<T> task)

> 1. Future接口里定义了如下几个公共方法控制他关联的Callable任务
> 2. ① cancel(Boolean mayInterruptlfRunning)  返回boolean
> 3. ② V get()
> 4. ③ V get(long timeout, TimeUnit unit)非阻塞get
> 5. ④ isCancelled()返回 boolean
> 6. ⑤ isDone() 返回boolean


- 实现Runnable接口、继承Thread类所具有的优势：

> 1. 1）适合多个相同的程序代码的线程去处理同一个资源
> 2. 2）可以避免java中的单继承的限制
> 3. 3）增加程序的健壮性，代码可以被多个线程共享，代码和数据独立。

#### Java多线程常用方法

> 1. 启动线程是start()方法：系统开启子任务，并分配资源
run()方法只是普通的方法，启动线程start()为Thread 类中native方法

- Thread.currentThread().getName() /.setName()/

- 以下均为Thread类的方法 

> 1. .sleep(long X):睡眠X毫秒，线程进入阻塞 ，让出CPU，但不放锁
> 2. .yield() 让出CPU,不会放锁，线程进入就绪态（只差CPU资源，和sleep差别）. yield()方法对应了如下操作；先检测当前是否有相同优先级的线程处于同可运行状态，如有，则把CPU的占有权交给次线程，否则继续运行原来的线程，所以yield()方法称为“退让”，它把运行机会让给了同等级的其他线程
> 3. .join()：A线程中调用B.join()，则A停止执行，B线程执行完A才可执行
> 4. .join(n)：A线程中调用B.join(n) A 停止，直到n毫秒到了 或 B线程执行完
> 5. .setPriority(Thread.MAX_PRIORITY)):设置优先级 0-10默认是5
> 6. .isAlive():判断线程是否存活，返回值ture false
> 7. .interrupt() 中断该线程

### Java中线程安全

- Java 中线程安全方式

> 1. ① 保证线程同步 
> 2. ② 原子类 
> 3. ③ volatile

#### 线程安全与共享资源：

> 1. ① 局部变量：局部变量存储在线程自己的栈中，局部变量永远也不会被多个线程共享。
基础类型的局部变量是线程安全的，但是，局部引用变量可能不安全，引用本身没有被共享，但引用所指的对象并没有存储在线程的栈内。所有的对象都存在共享堆中
> 2. ② 成员变量：果两个线程同时更新同一个对象的同一个成员，那这个代码就不是线程安全的

> 资源绝对安全：如果一个资源的创建，使用，销毁都在同一个线程内完成

### 内存模型

> 每一个运行在Java虚拟机里的线程都拥有自己的线程栈。这个线程栈包含了这个线程调用的方法当前执行点相关的信息。一个线程仅能访问自己的线程栈。一个线程创建的本地变量对其它线程不可见，仅自己可见。即使两个线程执行同样的代码，这两个线程任然在在自己的线程栈中的代码来创建本地变量。因此，每个线程拥有每个本地变量的独有版本堆上包含在Java程序中创建的所有对象（对象实体都放在堆上），无论是哪一个对象创建的。这包括原始类型的对象版本。如果一个对象被创建然后赋值给一个局部变量，或者用来作为另一个对象的成员变量，这个对象任然是存放在堆上。

> 静态成员变量跟随着类定义一起也存放在堆上。

> 存放在堆上的对象可以被所有持有对这个对象引用的线程访问。当一个线程可以访问一个对象时，它也可以访问这个对象的成员变量。如果两个线程同时调用同一个对象上的同一个方法，它们将会都访问这个对象的成员变量，但是 `每一个线程都拥有这个本地变量的私有拷贝`。

> Java内存模型与硬件内存架构之间存在差异。硬件内存架构没有区分线程栈和堆。对于硬件，所有的线程栈和堆都分布在主内中。部分线程栈和堆可能有时候会出现在CPU缓存中和CPU内部的寄存器中。

![内存模型](/images/jvm_computer_memory.png)

#### 内存模型存在的问题

> 对象和变量被存放在计算机中各种不同的内存区域中时:出现两个问题

- 问题一：

> 共享对象可见性，用volatile声明

- 问题二：

> 同步：Race Conditions 线程A读一个共享对象的变量count到它的CPU缓存中，B也做了同样的事情，线程A将count加1，线程B也做了同样的事情 解决这个问题可以使用Java同步块

### 多线程同步问题

> 多线程同步：多线程程序下，同步能控制对共享资源的访问。避免访问共享变量的并发问题

#### Synchronized同步块原理

- Synchronize同步块使用

> 1. 非静态方法同步：同步在实例对象上，只有一个线程能在，该实例上执行。
> 2. 静态方法同步：同步在类上，所有的实例共享这一个静态方法，只能一个进程执行

> 1. 非静态同步块： synchronized(this){  }
> 2. 静态同步块： synchronized(类名.class){   }

- Synchronized底层实现

> synchronized的底层实现主要依靠Lock-Free的队列，基本思路是自旋后阻塞，竞争切换后继续竞争锁，稍微牺牲了公平性，但获得了高吞吐量。

![synchronized原理图](/images/sychronized_principle.png)

> 1. ① 新请求锁的线程将首先被加入到ConetentionList虚拟队列（一个Node及其next指 针逻辑构成结构）中
> 2. ② 前面获得锁的线程执行完时，ContentionList中线程迁移到 EntryList，OnDeck中线程需要竞争锁。这样做虽然牺牲了一定的公平性，但极大的提高了整体吞吐量，在 Hotspot中把OnDeck的选择行为称之为“竞争切换”。
> 3. ③ OnDeck线程获得锁后即变为owner线程，无法获得锁则会依然留在EntryList中，考虑到公平性，在EntryList中的位置不 发生变化（依然在队头）。如果Owner线程被wait方法阻塞，则转移到WaitSet队列；如果在某个时刻被notify/notifyAll唤醒， 则再次转移到EntryList。

### 锁机制

#### 自旋锁

> 多核下使用，单核下，自旋锁是没有意义的，执行空语句.线程进入ContentionList时，也即第一步操作前。线程在进入等待队列时 首先进行自旋尝试获得锁，如果不成功再进入等待队列。这对那些已经在等待队列中的线程来说，稍微显得不公平。

> 自旋锁的原因：阻塞操作由操作系统完成（在Linxu下通 过pthread_mutex_lock函数）。线程被阻塞后便进入内核（Linux）调度状态，这个会导致系统在用户态与内核态之间来回切换，严重影响 锁的性能。

> 适用范围：不成功再阻塞，尽量降低阻塞的可能性，这对那些执行时间很短的代码块来说有非 常重要的性能提高。

#### 悲观锁 &乐观锁

> 1. 悲观锁：synchronized就是一种独占锁，会使线程等待挂起。
> 2. 乐观锁：线程获得它们想修改的数据的拷贝并做出修改，在乐观的假在此期间没有线程对共享内存做出修改的情况下。当这个乐观假设成立时，这个线程仅仅在无锁的情况下完成共享内存的更新。当这个假设不成立时，线程所做的工作就会被丢弃，再次读取拷贝，修改。


#### 同步锁Lock

- 优点

> 1. ① 比synchronized灵活。控制和释放锁可以不在同一个代码块中
> 2. ② tryLock( ) 获取锁，不会立即阻塞，可轮询的锁请求，减轻死锁的可能性
> 3. ③ 提供Read，Write 读写锁分离
> 4. ④ 公平锁 fair   ReentrantLock, ReentrantReadWriteLock的构造器 (fair)

- 可重入锁：ReentrantLock：

> 1. java.util.concurrent.locks.Lock;接口
> 2. java.util.concurrent.locks.ReentrantLock; Lock的唯一实现类

```java
    final Lock lock = new ReentrantLock();
```

- 读锁写锁：ReadWriteLock

> 1. java.util.concurrent.locks.ReadWriteLock; 接口
> 2. java.util.concurrent.locks.ReentrantReadWriteLock;实现类

```java
	final ReadWriteLock rwLock = new ReentrantReadWriteLock();
	Lock readLock =  rwLock.writeLock();
	readLock.lock();		
			.unlock();
```

#### Synchronized与Lock区别

> 1. synchronized是不公平的
> 2. synchronized同步块，在发生异常时，会自动释放锁，因此不会导致死锁现象发生；而Lock在发生异常时，如果不会主动通过unLock()去释放锁，则很可能造成死锁现象，因此使用Lock时需要在finally块中释放锁；所谓fair lock就是看获得锁的顺序是不是和申请锁的时间的顺序是一致的可重入锁：synchronized和ReentrantLock都是可重入锁，当一个线程执行到某个synchronized方法时，比如说method1，而在method1中会调用另外一个synchronized方法method2，此时线程不必重新去申请锁，而是可以直接执行方法

#### 死锁与饥饿

- 避免死锁：

> 1. ① 顺序加锁、放锁：是一种有效的死锁预防机制。但是，这种方式需要你事先知道所有可能会用到的锁
> 2. ② 加锁时限：尝试获取锁的过程中若超过了这个时限该线程则放弃对该锁请求
> 3. ③ 死锁检测：一个更好的死锁预防机制。每当一个线程获得了锁，会在线程和锁相关的数据结构中（map、graph等等）将其记下。每当有线程请求锁，也需要记录在这个数据结构中。

> 当检测到死锁：① 释放所有锁； ② 给拥有所得线程设置优先级，只让一个线程改变

- 饥饿和公平

> 一个线程因为CPU时间全部被其他线程抢走而得不到CPU运行时间，这种状态被称之为“饥饿”。而该线程被“饥饿致死”正是因为它得不到CPU运行时间的机会。解决饥饿的方案被称之为“公平性” – 即所有线程均能公平地获得运行机会。

- Java 引起饥饿原因：

> 1. A.高优先级线程吞噬所有的低优先级线程的CPU时间
> 2. B.线程被永久堵塞在一个等待进入同步块的状态，因为其他线程总是能在它之前持续地对该同步块进行访问。1到10级
> 3. C.线程在等待一个本身(在其上调用wait())也处于永久等待完成的对象，因为其他线程总是被持续地获得唤醒。

- Java 公平方案：

> 1. A.使用锁，而不是同步块。
> 2. B.公平锁：FairLock新创建了一个QueueObject的实例（线程队列），并对每个调用lock()的线程进行入队列。调用unlock()的线程将从队列头部获取QueueObject，并对其调用doNotify()，以唤醒在该对象上等待的线程。通过这种方式，在同一时间仅有一个等待线程获得唤醒，而不是所有的等待线程。

### 进程通信

#### 进程之间通信

- 操作系统中进程的8种通信方式

> 1. 无名管道( pipe )：管道是一种半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系
> 2. 高级管道(popen)：将另一个程序当做一个新的进程在当前程序进程中启动，则它算是当前程序的子进程，这种方式我们成为高级管道方式
> 3. 有名管道 (named pipe) ： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。
> 4. 消息队列( message queue ) ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点
> 5. 信号量( semophore ) ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。
> 6. 信号 ( sinal ) ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。
> 7. 共享内存( shared memory ) ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。
> 8. 套接字( socket ) ： 套解口也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同机器间的进程通信。

#### Java进程间通信

- IO 

- RPC

- 使用管道流线程通信：

> 线程通信使用管道流，管道流有3种形式：

> 1. 管道流的字节流：PipedInputStream、PipedOutputStream
> 2. 管道字符流：PipedReader、PipedWriter
> 3. 管道Channel：Pipe.SinkChannel、Pipe.SourceChannel     

- 管道流通信基本步骤：

> 1. A、使用new操作法来创建管道输入、输出流
> 2. B、使用管道输入流、输出流的connect方法把2个输入、输出流连接起来
> 3. C、将管道输入、输出流分别传入2个线程
> 4. D、2个线程可以分别依赖各自的管道输入流、管道输出流进行通信


### Java线程通信

> 每个锁对(JLS中叫monitor)都有两个队列：notfy后，就绪队列，等待CPU的调度，反之，当一个线程被wait后，就会进入阻塞队列，等待下一次被唤醒

#### ① 共享对象

> 通过共享对象通信：共享对象的变量里设置信号值

```java
	public class MySignal{ //共享对象，让线程获取其引用

	  protected boolean hasDataToProcess = false; //通信的变量

	  public synchronized boolean hasDataToProcess(){
			return this.hasDataToProcess;
	  }
	  public synchronized void setHasDataToProcess(boolean hasData){
				this.hasDataToProcess = hasData;
	  }
	}
```

#### ② 忙等待（BusyWait）

> 线程B一直在一个循环里，等待A执行完发出信号后，跳出循环

```java
	protected MySignal sharedSignal = ......
	
	while(!sharedSignal.hasDataToProcess()){ 
		// busy waiting do nothing
	}
```

> 忙等待没有对运行等待线程的CPU进行有效的利用，除非平均等待时间非常短。否则，让等待线程进入睡眠或者非运行状态更为明智，直到它接收到它等待的信号

#### ③ synchronized 同步

> wait(),notify()和notifyAll()  .是Object 类定义了三个方法， 这3个方法必须由同步监视器调用，均为final方法，无法被重写

> 1. A、对于使用synchronized修饰的同步方法，因为该类的默认实例this就是同步监视器，所以可以在同步中直接调用这3个方法。
> 2. B、对于使用synchronized修改的同步代码块，同步监视器是synchronized后可括号中的对象，所以必须使用括号中的对象调用这3个方法

> Wait方法：导致当前线程进入等待，直到其他线程调用该同步监视器的notify方法或notifyAll方法来唤醒该线程。wait方法有3中形式：无参数的wait方法，会一直等待，直到其他线程通知；带毫秒参数的wait和微妙参数的wait，等待时间到达后苏醒

> notify方法：唤醒在此同步监视器上等待的单个线程。如果所有线程都在此同步监视器上等待，则会随机选择唤醒其中一个可用的线程。(用wait方法，才可以执行被唤醒的线程)
> 注：wait(), notify() ,notifyAll()只能在同步代码块中使用，同步代码块外（当前线程没有获得该对象的锁）调用会有异常IllegalMonitorStateException

#### ③ Lock同步

> 使用Lock对象来保证同步，则系统中不存在隐式的同步监视器对象，不能使用wait、notify、notifyAll方法来协调进程的运行。

> Condition接口来保持协调 ，await，signal，signalAll
> Condition实例实质上被绑定在一个Lock对象上，要获得特定的Lock实例的Condition实例，调用Lock对象的newCondition即可。

```java
	Condition condition =lock.newCondition();
	condition.await();//当前程序等待，直到被唤醒
	condition.signal：//唤醒在此condition对象上等待的单个线程
```

### volatile使用及原理

- synchronized同步的机制：保证了原子性、（修改的）可见性、（指令的）有序性。

- volatile同步的机制：可确保`可见性`、`有序性`，`不能保证原子操作`

> ①：可见性：volatile关键字变量修改的值，会强制立即写入主存，线程进行修改时，会导致其他线程CPU的工作内存中该变量的缓存行无效。
> ②：有序性：禁止了部分指令重排。进行指令优化时，不能会将volatile变量后的语句放在volatile变量之前，之前的也不会放到之后。保证 volatile变量之前的操作全部已经进行，且结果已对后面的操作可见。

- 原理：volatile变量修饰的共享变量进行写操作的时候会多lock前缀汇编代码(通过JIT编译器生成的汇编指令)。lock前缀的指令功能如下：

> ① 将当前处理器缓存行的数据会写回到系统内存。
> ② 这个写回内存的操作会引起在其他CPU里缓存了该内存地址的数据无效
> ③ 指令重排时，确保volatile修饰的指令前后位置指令，不会越过volatile修饰指令

> 处理器为了提高处理速度，不直接和内存进行通讯，而是先将系统内存的数据读到内部缓存，后再进行操作，但操作完之后不知道何时会写到内存，如果对声明了Volatile变量进行写操作，JVM就会向处理器发送一条Lock前缀的指令，将这个变量所在缓存行的数据写回到系统内存。但是就算写回到内存，如果其他处理器缓存的值还是旧的，再执行计算操作就会有问题，所以在多处理器下，为了保证各个处理器的缓存是一致的，就会实现缓存一致性协议，每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器要对这个数据进行修改操作的时候，会强制重新从系统内存里把数据读到处理器缓存里。

### 线程局部变量：TheadLocal

> 每个线程中都创建了一个副本，每个线程可以访问自己内部的副本变量。缺点，看不到不同线程的修改值

> 底层实现：为全局的Map实现，key为线程名。

> ThreadLocal 方法：设置值.set()，取值get()方法。

- TheadLocal用途：

> Connection放在localthread里面，在service层取出来使用

### CAS & Java原子类

- CAS（Compare and swap）

> 比较和替换是使用一个期望值和一个变量的当前值进行比较，如果当前变量的值与我们期望的值相等，就使用一个新值替换当前变量的值。否则什么都不做。

- CAS原理：

>　CAS实际上是利用处理器提供的CMPXCHG指令实现的，而处理器执行CMPXCHG指令是一个原子性操作

- Java的原子原子类实现

> 现在CPU内部已经执行原子的CAS操作。Java5以来，你可以使用java.util.concurrent.atomic包中的一些原子类来使用CPU中的这些功能。

> Java原子类：有一个compareAndSet()方法，它使用一个期望值和AtomicBoolean实例的值比较，和两者相等，则使用一个新值替换原来的值。

> 利用CPU的CAS指令，同时借助JNI :Java Native Interface来完成Java的非阻塞算法。其它原子操作都是利用类似的特性完成的。

- CAS缺点:

> ABA问题。线程1修改预期值A。突然线程2优先修改了A到B，然后又改回到A。那么使用CAS进行检查时，线程1会发现它的值没有发生变化，但是实际上却变化了

- ABA问题解决思路

> 就是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加一，那么A－B－A 就会变成1A-2B－3A 

> Java1.5开始JDK的atomic包里提供了一个类AtomicStampedReference来解决ABA问题。这个类的compareAndSet方法作用是首先检查当前引用是否等于预期引用，并且当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。

#### 原子类优点

- ① 非阻塞结构：原子类AtomicBoolean

> 当请求操作不能够执行时，立即返回做自己的事.

> 1. java中阻塞结构：阻塞队列
> 2. java.util.concurrent.BlockingQueue(接口)
> 3. 如果一个线程要往阻塞队列中插入一个元素，队列中没有足够的空间，执行插入操作的线程就会阻塞，直到队列中有了空间

- 非阻塞优缺点

> 1. 非阻塞优点：① 没有死锁; ② 没有线程挂起：挂起和恢复一个线程的代价比较高，CPU上下文切换
> 2. 非阻塞缺点：CPU在忙等待期间可能消耗大量CPU时间，不适合较多线程争用情况

### 线程同步辅助类

- Java同步方式：
> 1. ① synchronized 
> 2. ② Lock接口的实现类，ReentrantLock，ReentrantReadWrite.ReadLock/..
> 3. ③ 同步辅助类：

#### 同步辅助类：

- ① Semaphore:信号量：限制只有1 or n个线程，进入访问某些资源（和锁有点类似）

> 1. ㈠ new Semaphore( n )  让计数器为n
> 2. ㈡ semaphore.acquire( ) 计数器减1，当计数器为0时，线程阻塞等待
> 3. ㈢ semaphore.release( ) 释放信号量，计数器加1
> 4. 用途：数据库连接池

- ② CountDownLatch：等待n个线程同时到达，后继续执行

> 1. ㈠  new CountDownLatch( n ) 指定等待n个线程
> 2. ㈡  countDownLatch.countDown(); 计数器减1
> 3. ㈢  countDownLatch.await(); 线程休眠等待，直到计数器为0，才能继续

- ③ CyclicBarrier 等待n个线程同时到达，然后执行指定的Runnable任务

> 1. 与CountDownLatch区别：线程都越过barrier状态后，又可以用来进行新一轮的使用。而CountDownLatch无法进行重复使用。
> 2. ㈠  new CyclicBarrier(int n,Runnable) 指定等待n个线程,后执行Runnable任务（分治编程）
> 3. ㈡  cyclicBarrier.await(); 线程休眠等待，直到计数器为0

- 总结：
　
> 1. CountDownLatch一般用于某个线程A等待若干个其他线程执行完任务之后，它才执
> 2. CyclicBarrier一般用于一组线程互相等待至某个状态，然后这一组线程再同时执行
> 3. 区别：CountDownLatch是不能重用的，而CyclicBarrier是可以重用的，可再开一轮CountDownLatch构造器可传入任务，都到达后可执行，该任务

- ④ Phaser：线程同步类，可以动态修改同步线程的个数，功能更强大

> 1. ㈠  new Phaser( n ) 指定等待n个线程
> 2. ㈡  phaser.arriveAndAwaitAdvance() 到达后，计数器减1，休眠等待

- ⑤ Exchanger:同步两个线程之间的数据，可用作生产者、消费者

> 1. ㈠ new Exchanger<>()
> 2. ㈡ buffer = exchanger.exchange(buffer) 交换两线程buffer中的数据

### 多线程中异常处理

> java.lang.Runnable.run()方法声明(因为此方法声明上没有throw exception部分)进行了约束。当线程抛出异常时，如果没有捕获，该线程就会终止，而对于主线程和其他线程完全不受影响，且完全感知不到某个线程抛出的异常(也是说完全无法catch到这个异常)。在Java中， run方法内进行try catch并处理掉异常。

> 如果线程确实没有自己try catch某个异常，而我们又想在线程代码边界之外（run方法之外）来捕获和处理这个异常。

- Thread类中提供2个方法来设置异常处理器：

#### 异常处理器

> ① 为该线程类的所有线程实例设置默认的异常处理器
 
```java
   staticsetDefaultUnaughtExceptionHandler( UncaughtExceptionHandler)
```

> ② 为一个线程实例设置异常处理器：

```java
    setUncaughtExceptionHandler(Thread.UncaughtExceptionHandler)
    //例：为某个线程设置异常处理器
	Thread thread = new Thread(runnable);
	thread.setUncaughtExceptionHandler(new UncaughtExceptionHandler() {
		@Override
		public void uncaughtException(Thread th, Throwable e) {
			th.getName()    出现异常的线程名字
			e.getMessage()  异常消息
		}
	});
	thread.start();
```

#### 线程组

> 线程组：Java允许直接对线程组控制，同时控制这批线程，如设置所有的最大优先权，每一个线程都归属于某个线程组管理的一员，如在主函数main()主工作流程中产生一个线程，则产生的线程属于main这个线程组管理的一员。

> 线程组管理类java.lang.ThreadGroup类：实现了 Thread.UncaughtExceptionHandler接口，可以接受组内的异常

```java
	ThreadGroup  group=new ThreadGroup("group");
	Thread  thread=new Thread(group, Runnable);
```

### 线程池

> 频繁创建线程和销毁线程需要时间, 大大降低系统的效率; 并且线程是计算机中宝贵的资源

#### 关键类

> 关键类： java.uitl.concurrent.ThreadPoolExecutor类是线程池中最核心的一个类

```java
   public class ThreadPoolExecutor extends AbstractExecutorService{ 
   }
```

- 继承关系：

> 1. Executor是一个顶层接口：只声明了一个方法 void execute(Runnable)
> 2. ↑ ExecutorService接口：继承了Executor接口，并声明了一些方法：submit、invokeAll、invokeAny以及shutDown等；
> 3. ↑ AbstractExecutorService抽象类：实现了ExecutorService接口
> 4. ↑ ThreadPoolExecutor类方法：
> 5. execute()：向线程池提交一个任务，交由线程池去执行
> 6. submit()：实际上是调用的execute()方法，可以利用了Future来获取任务结果
> 7. shutdown()：在终止线程池前，允许执行以前提交的任务
> 8. shutdownNow()阻止等待任务，并试图停止当前正在执行的任务

#### 线程池处理逻辑

- corePoolSize：核心线程数。设定用setCorePoolSize ()
- maximumPoolSize：最大线程数。设定用setMaximumPoolSize()

> 1. ① 当前线程池中的线程数目<corePoolSize，则每来一个任务，就会创建一个线程去执行这个任务;
> 2. ② 当前线程池中的线程数目>=corePoolSize，每来一个任务，会尝试将其添加到任务队列当中，若添加成功，则该任务会等待空闲线程将其取出去执行；若添加失败（一般来说是任务缓存队列已满），则会尝试创建新的线程去执行这个任务；
> 3. ③ 当前线程池中的线程数目达到maximumPoolSize，则会采取任务拒绝策略进行处理（任务拒绝策略，默认的拒绝策略会抛异常：RejectedExecutionException）
> 4. ④ 如果线程池中的线程数量大于 corePoolSize时，如果某线程空闲时间超过keepAliveTime，线程将被终止，则任务完成后，最终剩下corePoolSize个
> 5. ⑤ 也可以为核心池中的线程设置存活时间，那么核心池中的线程空闲时间超过keepAliveTime，线程会被终止。

> 注意：线程初始化：默认，创建线程池之后，线程池中是没有线程的，提交任务后才会创建线程

- 可以使用以下两个方法创建之后立即创建线程：

> 1. ① prestartCoreThread()：初始化一个核心线程
> 2. ② prestartAllCoreThreads()：初始化所有核心线程

-  任务缓存队列：类型为BlockingQueue<Runnable>可以取下面三种类型

> 1. ① ArrayBlockingQueue：基于数组的先进先出队列，此队列创建时必须指定大小
> 2. ② LinkedBlockingQueue：基于链表的先进先出队列
> 3. ③ synchronousQueue：这个队列比较特殊，它不保存提交的任务，而是将直接新建一个线程来执行新来的任务

- 任务拒绝策略（4种）：

> 任务缓存队列已满，并池中的线程数目达到maximumPoolSize，在方法 execute(java.lang.Runnable) 中提交的新任务将被拒绝。execute 方法都将调用其RejectedExecutionHandler.rejectedExecution(,)方法

> 1. ① ThreadPoolExecutor.AbortPolicy:丢弃任务并抛出RejectedExecutionException异常。
> 2. ② ThreadPoolExecutor.DiscardPolicy：也是丢弃任务，但是不抛出异常。
> 3. ③ ThreadPoolExecutor.DiscardOldestPolicy：丢弃队列最前面的任务，然后重新尝试执行任务（重复此过程）
> 4. ④ ThreadPoolExecutor.CallerRunsPolicy：由调用线程处理该任务

#### ThreadPoolExecutor

用：ThreadPoolExecutor创建线程池
例：用创建核心线程数5，最大线程数10 的线程池

```java
	//构造器：
	ThreadPoolExecutor(int corePoolSize,    //核心线程数
						int maximumPoolSize,//最大线程数
						long keepAliveTime, //线程存活时间 
						TimeUnit unit,      
						BlockingQueue<Runnable> workQueue) //队列
	ThreadPoolExecutor executor = new ThreadPoolExecutor(5, 10, 200,TimeUnit.MILLISECONDS, 
									new ArrayBlockingQueue<Runnable>(5));
	//执行线程任务：
	executor.execute(myTask);
	//关闭线程池：
	executor.shutdown()
```

#### Executors工具类
 
> 实际中并不使用ThreadPoolExecutor创建线程池，而是用Executors工具类，的静态方法。

> Java.util.concurrent.Executors工具类: 对ThreadPoolExecutor或ScheduledThreadPoolExecutor使用进行封装。

```java
    //ScheduledThreadPoolExecutor：
    ScheduledThreadPoolExecutor extends ThreadPoolExecutor
                         implements ScheduledExecutorService
						 
	//ScheduledExecutorService
    interface ScheduledExecutorService extends ExecutorService
```

- 四种线程的使用方法：

- ① Executors.newFixedThreadPool() ：固定大小线程池，以共享的线程队列方式来运行这些线程（只有要请求的过来，就会在一个队列里等待执行）。
- ② Executors.newCachedThreadPool()：无界线程池，可以进行自动线程回收.如果线程池中有可用，将重用它们。如果现没有可用的，则创建一个新线程并添加到池中。
- ③ Executors.newSingleThreadExecutor() ：单个后台线程，以共享的线程队列方式来运行这些线程，可保证顺序地执行各个任务，并且在任意给定的时间不会有多个线程是活动的。与其他等效的 newFixedThreadPool(1)

> ExecutorService接口方法 interface ExecutorService extends Executor

> 1. Void shutdown()  关闭执行器
> 2. List<Runnable> shutdownNow(); 关闭执行器，返回等待的执行任务
> 3. isShutdown();
> 4. isTerminated();
> 5. <T> Future<T> submit(Callable<T> task);
> 6. <T> Future<T> submit(Runnable task, T result);


- ④ Executors.newScheduledThreadPool()：给定的延迟后运行或定期执行的命令

> 1. 返回ScheduledExecutorService接口：继承ExecutorService
> 2. ScheduledExecutorService新添方法：
> 3. <V> ScheduledFuture<V> schedule(Callable<V> callable,long delay, TimeUnit unit);

- 置线程池大小设置

> 1. ① 如果是`CPU密集型`任务，就需要尽量压榨CPU，参考值可以设为 NCPU+1
> 2. ② 如果是`IO密集型`任务，参考值可以设置为2*NCPU

> 只是一个参考值，具体的设置还需要根据实际情况进行调整，比如可以先将线程池大小设置为参考值，再观察任务运行情况和系统负载、资源利用率来进行适当调



