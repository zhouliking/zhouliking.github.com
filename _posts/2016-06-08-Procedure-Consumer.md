---
layout: post
title:  "Java中生产者、消费者设计方式"
date:  2016-06-08
categories: DesignPattern
---

生产者、消费者、线程同步方式,同步类使用

---

- 目录
{:toc}


### 简介

> 生产者消费者问题:是一个著名的线程同步问题，该问题描述如下：有一个生产者在生产产品，这些产品将提供给若干个消费者去消费，为了使生产者和消费者能并发执行，在两者之间设置一个具有多个缓冲区的缓冲池，生产者将它生产的产品放入一个缓冲区中，消费者可以从缓冲区中取走产品进行消费，显然生产者和消费者之间必须保持同步，即不允许消费者到一个空的缓冲区中取产品，也不允许生产者向一个已经放入产品的缓冲区中再次投放产品

### synchronized设计

#### 设计描述

> 1. 利用Java中synchronized关键字保证线程安全
> 2. 用Object类中的方法wait();、notify();、notifyAll();进行同步
> 3. 注意：wait方法需要处理异常

```java
	//Object 类中这三个方法均是 native方法
	public final native void notifyAll();
	public final native void notifyAll();
	
	public final native void wait(long timeout) throws InterruptedException;
```

#### 设计代码

- 生产者消费者

```java
/**
 * EventStorage
 * 消费者，生产者共享区域
 * @author 周力
 */
public class EventStorage{
	private int maxSize;
	private LinkedList<Integer> storage;
	
	public EventStorage(int maxSize) {
		super();
		this.maxSize = maxSize;
		this.storage = new LinkedList<>();
	}

	public synchronized void set(){
		if(storage.size() == maxSize ){
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		storage.add(new Integer(1));
		System.out.println("set: "+storage.size());
		notify();
	}
	
	public synchronized void get(){
		if(storage.size() == 0){
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		Integer i = storage.poll();
		System.out.println("get:"+storage.size()+" " + i);
		notify();
	}
}

/**
 * Producer
 * 生成者线程
 * @author 周力
 */
public class Producer implements Runnable{
public class Producer implements Runnable{
	EventStorage eventStorage;

	public Producer(EventStorage eventStorage){
		this.eventStorage = eventStorage;
	}
	@Override
	public void run() {
		for(int i=0;i<30;i++){
			eventStorage.set();
		}
	}
	
}
/**
 * Consumer
 * 消费者线性
 * @author 周力
 */
public class Consumer implements Runnable{
	EventStorage eventStorage;

	public Consumer(EventStorage eventStorage) {
		this.eventStorage = eventStorage;
	}

	@Override
	public void run() {
		for(int i=0;i<30;i++){
			eventStorage.get();
		}
	}
}
```

- 测试

```java
	public static void main(String[] args) {
		//设置容量为20
		EventStorage eventStorage = new EventStorage(20);
		//
		Producer producer = new Producer(eventStorage);
		Consumer consumer = new Consumer(eventStorage);
		//
		new Thread(producer).start();
		new Thread(consumer).start();
		
	}
```

### Lock同步设计

#### 设计描述

> 1. 利用Java1.5以后的Lock锁机制
> 2. 用Condition类进行线程同步
> 3. 注意：await()方法需要处理异常

#### 设计代码

- 消费者、生产者

```java
/**
 * EventStorage 消费者、生产者公共区域
 * 
 * @author 周力
 */
class EventStorage<T> {
	public int maxSize;
	public LinkedList<T> buffer;
	public Lock lock;
	private Condition condition;

	public EventStorage(int maxSize) {
		super();
		this.maxSize = maxSize;
		buffer = new LinkedList<>();
		lock = new ReentrantLock();
		condition = lock.newCondition();
	}

	public T get() {
		T result = null;
		lock.lock();
		try {
			if (buffer.size() == 0) {
				condition.await();
			}
			result = buffer.poll();
			System.out.println("get:" + buffer.size() + " " + result);
			condition.signalAll();

		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			lock.unlock();
		}
		return result;
	}

	public void put(T elements) {
		lock.lock();
		try {
			if (buffer.size() == maxSize) {
				condition.await();
			}
			buffer.add(elements);
			System.out.println("put:" + buffer.size());
			condition.signalAll();

		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			lock.unlock();
		}
	}
}

/**
 * 生产者线程
 * 
 * @author 周力
 */
class Producer implements Runnable {
	EventStorage<String> storage;

	public Producer(EventStorage<String> storage) {
		this.storage = storage;
	}

	@Override
	public void run() {
		for (int i = 0; i < 50; i++) {
			storage.put("A");
			//Thread.sleep(10);	
		}
	}

}

/**
 * 消费者线程
 * 
 * @author 周力
 */
class Consumer implements Runnable {
	EventStorage<String> storage;

	public Consumer(EventStorage<String> storage) {
		this.storage = storage;
	}

	@Override
	public void run() {
		for (int i = 0; i < 50; i++) {
			storage.get();			
			//Thread.sleep(10);			
		}
	}
}
```

- 测试

```java
/**
 * 测试类
 * 
 * @author 周力
 */
public class TestProducerConsumer {

	public static void main(String[] args) {
		EventStorage<String> eventStorage = new EventStorage<>(8);
		Producer producer = new Producer(eventStorage);
		Consumer consumer = new Consumer(eventStorage);

		new Thread(producer).start();
		new Thread(consumer).start();

	}
}
```

### Lock同步设计

#### 设计描述

> 利用JUC中提供的同步工具类：Semaphore、CountDownLatch、Exchanger


#### Semaphore设计代码

#### CountDownLatch设计代码

#### Exchanger


