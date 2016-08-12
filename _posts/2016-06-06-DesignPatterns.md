---
layout: post
title:  "常用设计模式整理及小结"
date:  2016-06-06
categories: DesignPattern
---

面向对象的程序设计原则、常用设计模式小结

---

- 目录
{:toc}


### 面向对象的设计原则

##### 1.开闭原则：

> 对扩展开放，对修改关闭（需要的其他功能时，再实现一个类）

##### 2.依赖倒置：

> 代码要依赖抽象的，不要依赖与具体的

##### 3.里氏替换：

> 父类可以完全替换子类，（父类的所有功能，子类应该都有）

##### 4.单一职责：

> 高内聚，避免职责过多，相互依赖

##### 5.接口隔离：

> 接口中方法少点，接口拆分，避免实现时，实现太多

##### 6.组合聚合：
	
>  ***减少继承，多用接口聚合***

> - 聚合优点：对象之间生命周期没有影响 

```java
	private Discount discount;
	public void setDiscount(Discount discount) {
		this.discount = discount;
	}
```

> - 组合 : 生命周期相互影响

```java
	private Discount discount=new 子类()
```

##### 7.迪米特原则：

> 减少之间的耦合，一个实体尽量减少与其他实体联系，中间环节给代理	


### 常用的设计模式

#### 23种设计模式简介
	
> *MVC是三个经典的设计模式的演变：观察者模式(Observer)(Pub/Sub), 策略模式(Strategy)和组合模式(Composite)*

> ***创建型***(5个)：

>  - 工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式

***结构型模式***(7个)：
- 适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式

> ***行为型模***(11个)：

> - 策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、
> - 命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

> *还有两类*：
> *并发型模式、线程池模式*

#### Proxy代理模式

- Java.lang.reflact.Proxy类：

> - 动态的生成一个class byte，该字节码继承Proxy类，与你指定的接口。然后再利用您指定的classloader将class byte加载进系统，最后生成个Proxy对象。
> - 当用户调用，任何方法均会到InvocationHandler接口实现类中调用`invoke(Object proxy, Method method, Object[] args)`，在此方法中，通过反射调用实现类的方法。

- 代理使用场景：

- 核心业务方法*前后*做一些你所想做的 *辅助工作*，如log日志，安全检查机制

```java
	helloService = rpcProxy.create(HelloService.class)
	result = helloService.hello("World"); //结果为invoke()的返回值

```

#### Observer观察者（发布-订阅模式）

- 功能：

> 一对多的依赖关系，当一对象发生改变时，所有依赖的对象都将被通知自动更新

- 流程：

> 一个subject目标对象可以有多个Observer，
> subject目标对象提供对观察者的注册，退订、维护。并通知所有的Observer其变化
> Observer依赖于目标对象，观察者均继承一个接口。从而subject中具体观察者对象解耦。（松耦合）

- 观察者模式实现：

> - 观察者订阅时，存入list，被观察者变动消息时，遍历list即可

- Java内置观察者： 

- 目标被观察者：java.util.Observable类内置了注册、通知等方法`Observable ob = new Observable();` Observable类，用的时候要调用setChange()，才会通知
- 观察者：java.util.Observer接口

- 代理使用场景：

> - 发布消息，需要notifyAll观察者。发布消息的人（被观察者），发布消息，可遍历所有观察者的list，然后依次通知，（发邮件javaMail

#### TemplateMethod模板方法（用的抽象类，提供公共功能）

- 功能：定义一个算法的骨架(步骤)，将一些实现步骤延时到子类中。

- 好处：

> 在父类中实现固定不变的， 将变化的然子类实现。实现代码的复用，减少代码冗余

```java
	abstract class AbstractClass{
		   public abstract void mehtod1();
		   public abstract void mehtod2();
		   public abstract void mehtod3();	   
		   public void TemplateMethod(){ 固定的骨架(步骤)
			   mehtod1();
			   mehtod2();
			   //......
			   mehtod3();
			   }	   
	}
```

#### Prototype原型模式

- 功能：

> 深复制或浅复制一个对象。clone(),不需知道构造对象细节。因此，应该在类中实现，clone()方法

- 使用场景：

> 一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。

#### Strategy策略模式

- 设计步骤：

> 一系列的算法，归类成n组：（抽象成一个接口 + M个实现类）* n组策略。将一类功能抽象成接口，这一类功能均实现这个接口。从而有了一系列该接口功能的不同实现类（变化的话，只需要创建新的实现功能类）。然后以组合的方式，注入属性，使用这些实现功能类。

![1](/images/m3.png)

- 策略使用环境Context

```java
	public abstract class Duck {
	    //将策略 注入： 策略接口-具体实现类
		FlyBehavior mFlyBehavior; 策略组1
		QuackBehavior mQuackBehavior; 策略组2
```

- 好处：

> 1. 将策略都封装在一个个独立的类中，然后用多态使用。避免了用条件语句，利于扩展新策略
> 2. 用组合方式，使用功能。（用继承影响所有子类）
> 3. 简化了单元测试：每个算法都有自己的算法，与接口。可以单独测试

- ***注意***:将项目不变部分与变化部分离。设计抽象类，实现不变部分；变化部分，抽象成公共接口，然后，形成一系列功能实现类。用接口注入到抽象类中

#### Adapter适配器

- 功能： 

> - 通过适配器，达到调用目标A的方法，实际调用B的

- 实现方式：

> - 对象适配器：实现A类的接口，并以组合的方式传B对象（从而能B的方法）

```java
	class Adapter implements Ainterface {
		B b; //组合方式获取B的方法
		public Adapter (B b){ //通过构造函数传入
			this.b = b;
		}
	}
```

> - 类适配器：实现目标A接口，并***继承*** B对象(从而能B的方法)

```java
	class Adapter extends B implements Ainterface {
		//通过继承来获取B类的方法
	}
```

- 举例：

> 枚举器、迭代器适配

- 好处：

> 使不兼容的调用，兼容

- 装饰者模式与适配器模式区别

> - 装饰者模式是在原有的基础上添加新功能

##### 项目中：

- 多名同事一起开发同一个项目时，后台中需要调用的方法，但是接口不同，调用不太方便。

#### Decorator装饰设计

- 功能：

- 动态的添加，新功能添加到主体上；需要扩展一个类的功能或者给你个类增加附加责任；需要动态的给一个对象增加功能，这些功能可以再动态的撤销；需要增加有一些基本功能的排列组合而产生非常大量的功能，从而使得继承关系变得不现实。

##### 设计步骤：层层包装主体内容，可将新内容递归的方式添加到主体上

- 定义类在不必改变原类文件和使用继承的情况下, 将已有对象作为参数传入, 通过构造函数将已有对象的传入并进行功能增强的类。BufferedReader 就是一种装饰类，可以将缓冲技术单独抽取进行封装，谁要缓冲区就将谁和缓冲相关联即可。
- 如：Reader到BufferReader

#### Builder建造者，生成器

- 功能： 

> 构建复杂的产品（细化、分步骤的进行）

##### 好处：

- 例：合同中有些属性有约束条件(如：创建日期 < 修改日期)。则可用Builder创建该对象的约束属性，判定属性，约束等，然后，传入合同对象。

#### Facade外观

- 功能：

> 将系统功能组合，提供高层的类或接口，给外部使用（简易客户端的调用）

- 好处：

> 隔离了Client与服务端的关系（松散耦合）
> 多个客户端Client需调用同一组功能时，实现了功能的重用
> 让客户端Client调用内部服务模块变得简单，Client不用详细了解内部实现

- 使用场景：

- 三层构架：

> - 数据库访问层、业务逻辑层、表示层，层与层之间建立Façade，提供简单的功能接口方法，减小层与层之间调用复杂性，也降低了耦合度

- 外观类实现：

> 1.可以用单例实现，也可以用static修饰其中方法（工具类的写法：类名.方法名()）

![1](/images/facade1.png)

#### 命令模式

- 功能： 

> 将请求封装成一系列命令对象，然后对这个对象操作，这个命令对象可以存储、转发、撤销。

#### 工厂

- 功能：

> 使用者，不必知道创建的该对象复杂过程。如创建汽车类（需要先创建Engine等），用工厂方法创建只需 factory.createCar();

- 简单工厂模式 ：

> 新增对象时，需要修改代码

```java
	public static Car createCar(String car){  
		Car c = null;  
		if("Benz".equalsIgnoreCase(car))  
			c = new Benz();  
		else if("Bmw".equalsIgnoreCase(car))  
			c = new Bmw();  
		return c;  
	}
```

- 工厂方法模式：

> 具体单个工厂，只创建某个具体对象。只能实现共同接口car1;符合对修改关闭，对扩展开发原则

```java
	class BenzFactory extends Car1{  
		public Car createCar(String car) throws Exception {  
			return new Benz();  
		}  
	}  
	class BmwFactory extends Car1{  
		public Car createCar(String car) throws Exception {  
			return new Bmw();  
		}  
	}
```

- 抽象工厂方法：

> 用来生产不同产品族的全部产品，增加时需要增加产品族全部产品





















