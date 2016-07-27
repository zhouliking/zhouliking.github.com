---
layout: post
title:  "字符串"
date:  2016-05-15
categories: STRING
---

字符串

---

- 目录
{:toc}

#### 1.串的循环移位：
 
![1](/image/s1.png)
![2](/image/s2.png)

##### LCS（最长公共子序列）:Longest Common Subsequence

![3](/image/s3.png)
![4](/image/s4.png)
![5](/image/s5.png)

#### 应用：

##### 1: 求序列str1最长递增子序列:

可先将序列排序，得到str2，
求str1与str2最长公共子序列即可

##### 2.求序列str的最大回文序列

先将str反转得到str2
求str1与str2最长公共子序列即可




#### 字符串全排（无重复）：

Permutation("123".toCharArray(),3,1);
N个数全排 N! = N*(N-1)*….
则，第一个位置上n个数有 n种。第二个位置上；剩下的n-1个数，有n-1中

```java
public static void Permutation(char a[],int size,int n){
		if(n==size-1){
			print(a);			
			return ;
		}
		for(int i=n;i<size;i++){
			swap(a,i,n);
			Permutation(a,size,n+1);
			swap(a,i,n);
		}
}
```

#### 字符串全排（有重复）：

```java
public static void Permutation(char a[],int size,int n){
		if(n==size-1){
			print(a);			
			return ;
		}
		for(int i=n;i<size;i++){
			//将a[i]与 [n,i)之间的数比较
			if(isDuplicate(a,n,i)){ 
				continue;
			}				
			swap(a,i,n);
			Permutation(a,size,n+1);
			swap(a,i,n);
		}
}
```

海量数据查找---用Hash表，如10亿个Url，查找某个url位置
Tire数：一百万行文本，统计最频繁出现的前10个词
