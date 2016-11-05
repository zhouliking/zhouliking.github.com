---
layout: post
title:  "Java常见类方法小结"
date:  2016-03-29
categories: NetProtocol
---

Object String、StringBuilder Integer

---

- 目录
{:toc}

### Object类

#### 需注意的方法

> 1. ① native Object clone() 拷贝当前对象，若对象中属性是对象，仅拷贝其引用
> 2. ② native Class<?> getClass():返回该运行时类的类名，若需获取父类的类名：this.getClass().getSuperclass()
> 3. ③ native int hashCode(); 仅仅对引用值，去hashCode，不考虑对象中内容。因此实际对象需要重写hashCode
> 4. ④ boolean equals(Object obj) 仅比较引用值，因此也需要重写

#### Object中方法介绍(共9类方法)

```java
public class Object {
    //0.注册本地方法
    private static native void registerNatives();
    static {
        registerNatives();
    }
	//1.返回该运行时类的类名，若需获取父类的类名：this.getClass().getSuperclass()
	public final native Class<?> getClass();
	
	//2.仅仅对引用值，去hashCode，不考虑对象中内容。因此实际对象需要重写hashCode
	public native int hashCode();
	
	//3.仅比较引用值，因此也需要重写
	public boolean equals(Object obj) {
        return (this == obj);
    }
	
	//4.拷贝当前对象，若对象中属性是对象，仅拷贝其引用
	protected native Object clone() throws CloneNotSupportedException;
	
	//5.toString()
	public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
	
	//6.notify / notifyAll
	public final native void notify();
	public final native void notifyAll();
	
	//7.wait
	public final native void wait(long timeout) throws InterruptedException;
	public final void wait(long timeout, int nanos) throws InterruptedException {
        if (timeout < 0) {
            throw new IllegalArgumentException("timeout value is negative");
        }

        if (nanos < 0 || nanos > 999999) {
            throw new IllegalArgumentException(
                                "nanosecond timeout value out of range");
        }

        if (nanos >= 500000 || (nanos != 0 && timeout == 0)) {
            timeout++;
        }

        wait(timeout);
    }
	public final void wait() throws InterruptedException {
        wait(0);
    }
	
	//8.finalize()垃圾回收
	protected void finalize() throws Throwable { }
}
	 
```

### String类

#### 类介绍

> 见[String类分析](https://zlresource.github.io/java/2016/05/05/java-String-StringBuffer-StringBuilder.html)

#### 常用方法介绍

> 1. ① char charAt(int index)   返回index处字符，index范围0-n-1
> 2. ② int codePointAt(int index) 返回index处编码的int值（普通字符0-255，汉字两个字节）
> 3. ③ codePointBefore(int index) 返回index前一个字符编码的int值


- 将String转化为数组

> 1. void getChars(int srcBegin, int srcEnd, char dst[], int dstBegin) 复制从srcBegin到srcEnd-1处的字符到 dst[dstBegin]处开始
> 2. byte[] getBytes() 返回byte数组
> 3. char[] toCharArray()  返回char数组

- 比较String内容是否相等

> 1. boolean `equals`(Object anObject)
> 2. boolean `equalsIgnoreCase`(String anotherString) // 忽略大小写相等
> 3. boolean contentEquals(StringBuffer sb) //参数为StringBuffer类型
> 4. boolean contentEquals(CharSequence cs)

-  compareTo 逐个char比较。返回ASC码差值，前char -参数char

> 1. int compareTo(String anotherString)
> 2. int compareToIgnoreCase(String str) 比较时忽略char的大小写

- 子串比较

> 1. regionMatches(int toffset, String other, int ooffset,int len)
> 2. boolean regionMatches(boolean ignoreCase,int toffset,String other, int ooffset, int len)

> toffset: 此字符串中的起始偏移量
> ooffset: 比较字符串参数的起始偏移量
> len: 比较的字符的数目。
> ignoreCase是否忽略大小写

- 起始字符

> 1. boolean startsWith(String prefix)
> 2. boolean startsWith(String prefix, int toffset) `原串从toffset处`,是否以prefix起始

- 截止字符
> 1. boolean endsWith(String suffix)

- 从前向后，返回char/String首次出现位置，没找到返回 -1，返回绝对位置

> 1. int indexOf(int ch) 
> 2. int indexOf(int ch, int fromIndex) `原串从fromIndex处`开始`向后`搜索，返回绝对位置

> 1. int indexOf(String str)
> 2. int indexOf(String str, int fromIndex)

- 从后向前，返回char/String首次出现位置，没找到返回 -1，返回绝对位置

> 1. int lastIndexOf(int ch) 
> 2. int lastIndexOf(int ch, int fromIndex) `原串从fromIndex处`开始`向前`搜索，返回绝对位置

> 1. int lastIndexOf(String str)
> 2. int lastIndexOf(String str, int fromIndex)

- 取子串

> 1. String substring(int beginIndex)
> 2. String substring(int beginIndex, int endIndex) 取beginIndex~ endIndex-1的子串

- 连接字符串(原理：重新new了个数组，然后再new一个新的String)

> 1. String concat(String str)

- 字符串替换

> 1. String replace(char oldChar, char newChar) 替换所有的oldChar
> 2. String replaceFirst(char oldChar-regex, char newChar) 仅替换第一个
> 2. String replaceAll(String oldChar-regex, String replacement) 替换所有的oldChar,支持正则

> 1. replace/replaceAll均全替代
> 2. 不同点：replaceAll支持正则表达式，因此会对参数进行解析（两个参数均是），如replaceAll("\\d", "*")，而replace则不会，replace("\\d","*")就是替换"\\d"的字符串，而不会解析为正则。
> 3. 另外还有一个不同点：“\”在Java中是一个转义字符，所以需要用两个代表一个。例如System.out.println( "\\" ) ;只打印出一个"\"。但是“\”也是正则表达式中的转义字符，需要用两个代表一个。所以：\\\\被java转换成\\，\\又被正则表达式转换成\，因此用replaceAll替换“\”为"\\"，就要用replaceAll("\\\\","\\\\\\\\")，而replace则replace("\\","\\\\")。

- 字符分解

> 1. String[] split(String regex) 
> 2. String[] split(String regex, int limit) 

> split(String regex) 调用的是  split(regex, 0);
> limit n 大于0，则pattern（模式）应用n - 1 次
> limit n 小于0，则pattern（模式）应用无限次
> limit n 等于0，则pattern（模式）应用无限次并且省略末尾的空字串

- 是否匹配：正则匹配

> 1. boolean matches(String regex)

- 是否包含

> 1.boolean contains(CharSequence s)

- 去掉前后空格

> 1. String trim()

- 大小写转换

> String toLowerCase()
> String toUpperCase()
> String toUpperCase(Locale locale)
> String toLowerCase(Locale locale)

- 将char、char[]、int long、float变成String

> String(char value[])
> String(char value[], int offset, int count)

- 格式化字符串

> 1. static String format(String format, Object ... args)
> 2. static String format(Locale l, String format, Object ... args)

- public `native` String intern();

### StringBuilder

#### 类介绍

#### 常用方法介绍

### Integer

#### 类介绍

#### 常用方法介绍
