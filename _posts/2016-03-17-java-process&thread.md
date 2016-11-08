---
layout: post
title:  "线程与进程学习小结(Java)"
date:  2016-03-17
categories: Java
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
java.lang.下：
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
 
> 1. 1.用ExecutorService类submit()方法中

```java
	<T> Future<T> submit(Callable<T> task);
```

> 2. 2.用 Future接口唯一实现类 FutureTask,包装callable对象

```java
	futureTask = new FutureTask<>( Callable对象)
	thread = new Thread(futureTask); 因FutureTask继承了Runable接口
```

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


