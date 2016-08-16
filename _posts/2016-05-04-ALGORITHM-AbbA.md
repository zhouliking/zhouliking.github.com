---
layout: post
title:  "回文串：manacher算法小结与实现"
date:  2015-08-07
categories: Algorithm
---

回文串、时间复杂度O(n)的（Manacher）算法

---

- 目录
  {:toc}


### manacher算法

##### 算法推导

> S表示字符串，P[i] 表示 S[i]为中心的最长回文子串向左/右扩张的长度（包括S[i]）

> 1. S     #  1  #  2  #  2  #  1  #  2  #  3  #  2  #  1  #
> 2. P     1  2  1  2  5  2  1  4  1  2  1  6  1  2  1  2  1
> 3. 可以看出，P[i]-1正好是原字符串中回文串的总长度


- 情况一: p[i+k] = p[i]-k; 不可能比这个更长
[manacher1](/images/manacher1.png)


- 情况二: p[i+k] = p[i-k];不可能比这个更长

[manacher1](/images/manacher2.png)

- 情况三：p[i+k] >= p[i-k] 可能继续增长

[manacher1](/images/manacher3.png)

##### 算法公式

- 上述三种情况整理得公式：

> 1. 1.p[i+k] = min(p[i-k],p[i]-k);
> 2. 2.

- 问题：由于p[i]是回文串中心字符，不可能为空，则，需要把偶数串变成奇数长串

- 解决：在每个字符的两边都插入一个特殊的符号。比如 abba 变成 #a#b#b#a#， aba变成 #a#b#a#。 为了进一步减少编码的复杂度，可以在字符串的开始加入另一个特殊字符，这样就不用特殊处理越界问题，比如$#a#b#a#。



### 实现代码

```java
     
	 
```
