---
layout: post
title:  "最长公共子序列(LCS)&最长递增子序列(LIS)小结"
date:  2016-05-17
categories: Algorithm
---

最长递增子序列(LIS)、最长公共子序列(LCS)、最长公共子串（连续）

---

- 目录
{:toc}

### 简介

- 1.最长递增子序列(LIS) 不连续

> 作用：求一个数组中最长的、不连续的、递增的、子序列

- 2.最长公共子串       连续

> 作用：求两个序列的公共的、最长的、子串

- 3.最长公共子序列(LCS) 不连续

> 作用：求两个序列的公共的、最长的、子序列

### 动态规划法求LIS

##### 思想

> 总体思想，从1到n 逐个顺序逐个添加，并用 等长数组(longest[]) 记录每次添加该字符是时的最长序列长度

##### 步骤

> 1. 定义longest[n]数组，储存添加元素i时，与前面构成的最长递增子序列，可初始化每一位为1（因为每个元素自身构成长度为1的增序列）
> 2. 从1到n 逐个添加，并更新longest[i],为与之前i-1构成的最大子序列

```java
	longest[0] = 1;
	for (int i = 1; i < a.length; i++) {
		longest[i] = 1;
		for (int j = 0; j < i; j++) {
			if (a[i] > a[j]) {
				longest[i] = Math.max(longest[i], longest[j] + 1);
		}
	}
```

### 最长公共子串

##### 思想

> "bab"和"caba"(当然我们现在一眼就可以看出来最长公共子串是"ba"或"ab"),用矩阵表示为：

>  XY   b　　a　　b
>  c　　0　　0　　0
>  a　　0　　1　　0
>  b　　1　　0　　1
>  a　　0　　1　　0

> 改进一下上述矩阵：当要在矩阵是填1时让它等于其左上角元素加

>  XY   b　　a　　b
>  c　　0　　0　　0
>  a　　0　　1　　0 
>  b　　1　　0　　2
>  a　　0　　2　　0

> 这样矩阵中的最大元素就是 最长公共子串的长度。在构造这个二维矩阵的过程中由于得出矩阵的某一行后其上一行就没用了，所以实际上在程序中可以用一维数组来代替这个矩阵。


##### 步骤

> 1. a.定义二维矩阵chess[n+1][n+1],存储所有情况，初始化值为0
> 2. b.两层for循环遍历两个字符串，并将比较结果存入chess[n+1][m+1]数组,chess中最大值为最长公共子串的长度
> 3. c.逆序遍历 chess[][]数组，得到最长公共子串

##### 代码

```java
```

### 动态规划法求LIS

##### 思想

> 总体思想，逐个添加比较两个串，并用二维数组(chess[][]) 记录长度

##### 步骤

> 1. a.定义chess[n+1][m+1]数组(n,m为序列1、2的长度)，存储所有情况，初始化值为0

```java
	int chess[][] = new int[size1+1][size2+1];		
	for(int i=0;i<size1+1;i++){
		chess[i][0]=0;
	}
	for(int i=0;i<size2+1;i++){
		chess[0][i]=0;
	}
```

> 2. b.两层for循环遍历两个字符串，并将比较结果存入chess[n+1][m+1]数组

- ***chess[][]矩阵的最后一个值，最大值为公共子序列长度***

```java
for(int i=1;i<size1+1;i++){
	for(int j=1;j<size2+1;j++){
		if(str1.charAt(i-1) == str2.charAt(j-1)){
			chess[i][j] = chess[i-1][j-1]+1;
		} else {
			chess[i][j] = Math.max(chess[i-1][j],chess[i][j-1]);
		}
	}
}
```

> 3. 逆序遍历 chess[][]数组，得到最长公共子串

```java
	String commonStr = "";
	//从矩阵的末尾开始遍历
	while(size1>0 && size2>0){
		if(str1.charAt(size1-1) == str2.charAt(size2-1)){
			commonStr = str1.charAt(size1-1)+commonStr;
			size1--;
			size2--;				
		}else{
			if(chess[size1-1][size2]>chess[size1][size2-1]){
				size1--;
			}else{
				size2--;
			}
		}
	}
```

![LCS](/images/LCS.png)

#### LCS代码:

```java
public static void findLCS(String str1,String str2){
	
	int size1 = str1.length();
	int size2 = str2.length();
	
	int chess[][] = new int[size1+1][size2+1];		
	for(int i=0;i<size1+1;i++){
		chess[i][0]=0;
	}
	for(int i=0;i<size2+1;i++){
		chess[0][i]=0;
	}
	//矩阵的最后一个值，最大值为公共子序列长度
	for(int i=1;i<size1+1;i++){
		for(int j=1;j<size2+1;j++){
			if(str1.charAt(i-1) == str2.charAt(j-1)){
				chess[i][j] = chess[i-1][j-1]+1;
			} else {
				chess[i][j] = Math.max(chess[i-1][j],chess[i][j-1]);
			}
		}
	}
	//遍历上述矩阵
	String commonStr = "";
	while(size1>0 && size2>0){
		if(str1.charAt(size1-1) == str2.charAt(size2-1)){
			commonStr = str1.charAt(size1-1)+commonStr;
			size1--;
			size2--;				
		}else{
			if(chess[size1-1][size2]>chess[size1][size2-1]){
				size1--;
			}else{
				size2--;
			}
		}
	}
	System.out.println(commonStr);
}
```

### 应用

#### 1.LIS合唱队排序

- LIS最长递增子序列

> 题目(华为机试)：N位同学站成一排，音乐老师要请其中的(N-K)位同学出列，使得剩下的K位同学排成合唱队形。合唱队形是指这样的一种队形：设K位同学从左到右依次编号为1，2…，K，他们的身高分别为T1，T2，…，TK，   则他们的身高满足存在i（1<=i<=K）使得Ti<T2<......<Ti-1<Ti>Ti+1>......>TK。 你的任务是，已知所有N位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。

- 分析

> 矮 -> 高

```java
	public static int LIS(int a[],int n){
		int asc[] =  new int[n];
		int desc[] = new int[n];		
		
		//从1-> n 升序 的LCS
		for(int i=0;i<n;i++){
			asc[i] = 1;
			for(int j=0;j<i;j++){
				if(a[i]>a[j]){
					asc[i] = Math.max(asc[j]+1,asc[i]);
				}					
			}
		}
		//从n->1  升序 的LCS
		for(int i=n-1;i>=0;i--){
			desc[i] = 1;
			for(int j=n-1;j>i;j--){
				if(a[i]>a[j]){
					desc[i] = Math.max(desc[j]+1,desc[i]);
				}					
			}
		}
		//两矩阵对应位置，相加 取最大值
		int max=0;
		for(int i=0;i<n;i++){
			if(max<desc[i]+asc[i]){
				max = desc[i]+asc[i];
			}
		}
		return n-max+1;
	}
```
