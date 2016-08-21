---
layout: post
title:  "JAVA创建对象的方式：Objenesis不用构造器创建对象"
date:  2016-05-19
categories: JAVA
---

Java创建对象方式：new 、clone、反射、反序列化、Objenesis简介

---

- 目录
{:toc}

### 创建对象方式(4种)

> 1. 1.直接 new 一个
> 2. 2.clone  ,重写Object类的clone()方法即可   
> 3. 3.通过反射创建newInstance()，要求实现类必须有无参数构造器
> 4. 4.反序列化

> - Objenesis 类没有参数为空的构造方法也可创建

- 本文 Objenesis类，与 

### Objenesis

#### 功能介绍

> 不使用构造器创建对象

> 如果一个类没有参数为空的构造方法时候，那么你直接调用newInstance方法试图得到一个实例对象的时候是会抛出异常的，使用Objenesis，可以绕过构造器实例化一个对象


#### Objenesis原理

- Objenesis 为其提供了在四个不同的jvm上的解决方案

> 1. Sun Hotspot VM, versions 1.3, 1.4, 1.5 and 1.6
> 2. GCJ version 3.4.4 (tested on Windows/Cygwin)
> 3. BEA JRockit versions 7.0 (1.3.1), 1.4.2 and 1.5
> 4. Aonix PERC (no serialization support), tested on version  5.0.0667

- 根据得到平台提供的jvm版本和供应商来选择不同的实例化策略。

- Sun Hotspot的hotspot虚拟机中，`使用 ReflectionFactory`可以不调用构造参数创建对象`（即使是，私有构造器的类也可以创建类）

#### ReflectionFactory类库介绍

- jdk中该类库是和java核心类库放在一起的，只是文档少了点


- 例: 通过sun.reflect.ReflectionFactory这个类来实例化一个对象，不使用类中的任何构造方法

```java
import java.lang.reflect.Constructor;
import java.security.AccessController;
import sun.reflect.ReflectionFactory;

/**
 * ReflectionFactory不使用构造器，创建类的实例
 * @author 周力
 */
class Person {
	private String name;

	public Person() {
		System.out.println(" Person的无参数构造器...");
	}
	public Person(String name) {
		this.name = name;
		System.out.println(" Person的有参数构造器...");
	}
	public void show() {
		System.out.println("My name is " + name);
	}
}
public class Main {

	public static void main(String[] args) throws Exception {
		// 创建ReflectionFactory工厂
		ReflectionFactory reflectionFactory = (ReflectionFactory) AccessController
				.doPrivileged(new ReflectionFactory.GetReflectionFactoryAction());

		@SuppressWarnings("unchecked")
		Constructor<Person> constr = (Constructor<Person>) reflectionFactory
				.newConstructorForSerialization(Person.class, Object.class.getConstructor(new Class[0]));
		Person person = (Person) constr.newInstance(new Object[0]);
		person.show();
	}

}
```

- 运行结果（没有执行任何构造器中的代码）

> My name is null 

### Java反射创建对象

#### 简介

-  利用java.lang.Class类的newInstance方法，则可根据Class对象的实例，建立该Class所表示的类的对象实例。

#### 代码

```java
	//1.获取Class对象
	Class<?> clazz = Class.forName("com.zl.Person");
	//2.调用 Class的newInstance()方法
	Person p = (Person) clazz.newInstance();
	p.show();
```



