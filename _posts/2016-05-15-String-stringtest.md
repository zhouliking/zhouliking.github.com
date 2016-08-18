---
layout: post
title:  "字符串处理：移位.全排"
date:  2016-05-15
categories: String
---

字符串：移位&全排

---

- 目录
{:toc}

#### 1.串的循环移位：
 
![1](/images/s1.png)
![2](/images/s2.png)

#### 2.符串全排（无重复）：

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

#### 2.字符串全排（有重复）

```java
	public static boolean isDuplicate(char a[],int n,int i){
		for(int j=n;j<i;j++){
			if(a[j] == a[i]){
				return true;
			}
		}
		return false;
	}
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
