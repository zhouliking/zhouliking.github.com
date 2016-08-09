---
layout: post
title:  "JAVA中String/StringBuffer/StringBuilder异同"
date:  2016-06-05
categories: JAVA
---

String类，StringBuffer类，StringBuilder类

---

### String类:

##### __是不可变类__,
- 任何对String的改变都会引发新的String对象的生成。

`修饰为final的原因`：
主要是为了“效率” 和 “安全性” 的缘故。若 String允许被继承, 由于它的高度被使用率, 可能会降低程序的性能，所以String被定义成final。
将方法或类声明为final主要目的是：确保它们不会再子类中改变语义。String类是final类，这意味着不允许任何人定义String的子类。换言之，如果有一个String的引用，它引用的一定是一个String对象，而不可能是其他类的对象。《Java核心技术 卷I》
`修饰为final的缺陷`：
多次改变String后，当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，那速度是一定会相当慢的。

##### String存放区域：
```java
   String str1 = new String("123");
   
   String str2 = str1.intern();
   String str3 = "123";
   System.out.print(Str1 == str2); //false
   System.out.print(Str2 == str3); //true  
```
- 创建str1 字符串String对象，___Str1 指向堆___
- 调用 `.intern()函数` 会在常量池中寻找与该字符串相同的串，若有，则返回引用；若没有，则在常量池中创建。
str2指向常量池中该字符串值的引用。
- `String str3 = "123"`:会直接在常量池中寻找，若有，则返回引用；若没有，则在常量池中创建，并返回引用

##### JVM Sting加法“+”优化
- Java对String的变量相加是通过StringBuffer实现的，先new一个StringBuffer存放原始值，然后调用 `append()方法`
- StringBuffer转化成String对象。StringBuffer对象在堆内存中，那转换成的String对象理所应当的也是在堆内存中。

```java
	String strA = "tao"+"bao";  //String型常量，JVM 会优化合成一个串
	String strB = "tao";
	String strC = "bao";
	strA == str1           // ture
	(strB + strC) == str1  // false
	
	final String b = "tao";
	final String c = "bao";
	(b+c)== str1           //true   final类型的变量编译器会优化
```
- 常量字符串(如，"123") 或final修饰的变量，JVM会自动优化成一个
- strB + strC，结果为堆中的变量。中编译器不会对变量优化，编译器怕改变了变量的值。Java对String的变量相加是通过StringBuffer实现的，先构造一个StringBuffer里面存放值，StringBuffer转化成String对象。StringBuffer对象在堆内存中，那转换成的String对象理所应当的也是在堆内存中。

### StringBuffer可变类:
- 字符串变量（线程安全），效率不高

### StringBuilder可变类：
- 非线程安全，单线程下使用效率高

### 三者改变/对象拼接时效率比较
- stringBuilder > stringBuffer > String

```java
	stringBuilder.append(" hello").append(" joe");
	stringBuffer.append("hello").append(" Joe");
	String str = 变量1+变量2+...;
```
`注意`：常量拼接时，string 中“字符串+字符串 ” JVM 会合并后再创建String对象，效率高
String s = “This is only a” + “ simple” + “ test” 仅仅创建一个对象

### StringBuffer 与StringBuilder原理：
- 均继承自AbstractStringBuilder方法和功能完全是等价的。只是StringBuffer 用Synchronized修饰。
- 扩容均为newCapacity = value.length * 2 + 2

```java
    //StringBuilder
	public final class StringBuilder extends AbstractStringBuilder
		implements java.io.Serializable, CharSequence
	{
	   //...
	}
```
```java
    //StringBuilder
	 public final class StringBuffer extends AbstractStringBuilder
		implements java.io.Serializable, CharSequence
	{

	   //...
	}
```

### `new String("123")`创建几个对象：
- 一个或两个
- 当常量池中没有该串时，会在常量池中创建一个，然后在堆中new一个

```java
    //String的构造器，形参 String original 会在常量池中创建一个
	public String(String original) {
		int size = original.count;
		char[] originalValue = original.value;
		//...
	}
```

- 当常量池中存在该常量串时，只会在堆中new一个
