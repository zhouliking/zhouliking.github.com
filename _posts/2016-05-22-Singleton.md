---
layout: post
title:  "Singleton的写法总结"
date:  2016-05-22
categories: DesignPattern
---

Singleton的写法、饿汉式、懒汉式、静态块、静态内部类方式等

---

- 目录
{:toc}


### 单例设计模式简介

### 饿汉式

> 饿汉式线程安全:当类第一次被加载到内存它就实例化了，所以这种实例的创建方式是线程安全的。

> 这种方式基于classloder机制避免了多线程的同步问题，不过，instance在类装载时就实例化，虽然导致类装载的原因有很多种，在单例模式中大多数都是调用getInstance方法， 但是也不能确定有其他的方式（或者其他的静态方法）导致类装载，这时候初始化instance显然没有达到lazy loading的效果。

```java
// 饿汉式
	class Singleton {
		private static Singleton instance = new Singleton();

		private Singleton() {
		}

		public static Singleton getInstance() {
			return instance;
		}
	}
```

### 静态块初始化

- 和饿汉式方式差不多

```java
	class Singleton {
		private static Singleton instance = null;
		static {
			instance = new Singleton();
		}

		private Singleton() {
		}

		public static Singleton getInstance() {
			return instance;
		}
	}
```

### 懒汉式

- 线程安全写法，都是在类初始化即实例化instance。

- 双重校验写法,在JDK1.5之后，双重检查锁定才能够正常达到单例效果,双检索在java5之前是有问题的，但是java5在内存模型中有了volatile变量之后就没问题了。

```java
	// 懒汉式
	class Singleton {
		private volatile static Singleton singleton;

		private Singleton() {
		}

		public static Singleton getSingleton() {
			if (singleton == null) {
				synchronized (Singleton.class) {
					if (singleton == null) {
					
						singleton = new Singleton();
						
					}
				}
			}
			return singleton;
		}
	}
```

### 静态内部类

> 1. 线程安全：利用了classloder的机制来保证初始化instance时只有一个线程
> 2. 有懒加载效果：在饿汉式、静态代码块写法中，只要Singleton类被装载了，那么instance就会被实例化（没有达到lazy loading效果），而这种方式是Singleton类被装载了，instance不一定被初始化。因为SingletonHolder类没有被主动使用，只有显示通过调用getInstance方法时，才会显示装载SingletonHolder类，从而实例化instance。

```java
class Singleton {
	private static class SingletonHolder {
		private static final Singleton INSTANCE = new Singleton();
	}

	private Singleton() {
	}

	public static final Singleton getInstance() {
		return SingletonHolder.INSTANCE;
	}
}
```

### 枚举写法

> 1. 1）枚举单例模式代码简洁
> 2. 这是迄今为止最大的优点，如果你曾经在java5之前写过单例模式实现代码，那么你会知道即使是使用双检锁你有时候也会返回不止一个实例对象。虽然这种问 题通过改善java内存模型和使用volatile变量可以解决，但是这种方法对于很多初学者来说写起来还是很棘手。相比用 synchronization的双检索实现方式来说，枚举单例就简单多了。你不相信？比较一下下面的双检索实现代码和枚举实现代码就知道了
> 3. 枚举单例模式你只需要一行代码搞定因为枚举实例的创建是线程安全的。


```java
	enum Singleton {  
		INSTANCE;  		
	}  
```

> 代码就这么简单，你可以使用Singleton.INSTANCE调用它，比起你在单例中调用getInstance()方法容易多了。

### 序列化问题

> 传统的单例模式的另外一个问题是一旦你实现了serializable接口，他们就不再是单例的了，因为readObject()方法总是返回一个 新的实例对象，就像java中的构造器一样。你可以使用readResolve()方法来避免这种情况，通过像下面的例子中这样用单例来替换新创建的实 例：

```java
	private Object readResolve(){
		return INSTANCE;
	}
```

> 如果你的单例类包含状态的话就变的更复杂了，你需要把他们置为transient状态，但是用枚举单例的话，序列化就不要考虑了。



