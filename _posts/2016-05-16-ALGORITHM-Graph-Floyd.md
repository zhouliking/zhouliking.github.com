---
layout: post
title:  "最短路算法：Floyd算法简述与实现"
date:  2016-05-16
categories: Algorithm
---

Floyd算法简述与实现

---

- 目录
{:toc}

### Floyd算法思想

> 作用：求最短路。路径 及权重

>  Floyd算法是一个经典的动态规划算法。用通俗的语言来描述的话，首先我们的目标是寻找从点i到点j的最短路径。从任意节点i到任意节点j的最短路径不外乎2种可能，1是直接从i到j，2是从i经过若干个节点k到j。所以，我们假设Dis(i,j)为节点u到节点v的最短路径的距离，对于每一个节点k，我们检查Dis(i,k) + Dis(k,j) < Dis(i,j)是否成立，如果成立，证明从i到k再到j的路径比i直接到j的路径短，我们便设置Dis(i,j) = Dis(i,k) + Dis(k,j)，这样一来，当我们遍历完所有节点k，Dis(i,j)中记录的便是i到j的最短路径的距离。

### Floyd算法描述

> 1. a.从任意一条单边路径开始。所有两点之间的距离是边的权，如果两点之间没有边相连，则权为无穷大。 　　

> 2. b.对于每一对顶点 u 和 v，看看是否存在一个顶点 w 使得从 u 到 w 再到 v 比己知的路径更短。如果是更新它。

### 代码实现

#### 步骤：

> 1. a.将点到点间距离存入d[n][n]中;
> 2. b.初始化`p[i][j]={{0,1,2,3,...,n},{0,1,2,3,...,n},....}}`;该矩阵存储i->j点，进过点的最后一个，初始化直接赋值为j点

```java
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			p[i][j] = j; // 初始化点
		}
	}
```

> 1. c.三层for循环，遍历所有 `i-> k ->j` （起点i,中途经过点k,终点j)
> 2. d.因为p[i][j]存储 i->j中途经过最短的点的最后一个，遍历p[i][j]即可得到i->中途的点

```java
	// 不断的遍历 p[i][end],直到 p[i][end]值为 end为止
	int start = 0;
	int end = n - 1;
	while (start != end) {
		System.out.println(start);
		start = p[start][n - 1];
	}
	System.out.println(start);
```
 

#### 代码:

```java
/**
 * Floyd算法，最短路算法
 * @author 周力
 */
public class Floyd {
	public static void main(String[] args) {
		int d[][] = { 
				{ 0, 1, 5, 100, 100, 100, 100, 100, 100 },
				{ 1, 0, 3, 7, 5, 100, 100, 100, 100 },
				{ 5, 3, 0, 100, 1, 7, 100, 100, 100 }, 
				{ 100, 7, 100, 0, 2, 100, 3, 100, 100 },
				{ 100, 5, 1, 2, 0, 3, 6, 9, 100 }, 
				{ 100, 100, 7, 100, 3, 0, 100, 5, 100 },
				{ 100, 100, 100, 3, 6, 100, 0, 2, 7 },
				{ 100, 100, 100, 100, 9, 5, 2, 0, 4 },
				{ 100, 100, 100, 100, 100, 100, 7, 4, 0 } };		
		int n = a.length;
		// 存储 i->j需要经过的j的前一个点
		
		int p[][] = new int[n][n];

		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				p[i][j] = j; // 初始化点
			}
		}
		for (int k = 0; k < n; k++) {
			for (int v = 0; v < n; v++) {
				for (int w = 0; w < n; w++) {
					if (d[v][w] > d[v][k] + d[k][w]) {
						d[v][w] = d[v][k] + d[k][w];
						p[v][w] = p[v][k]; // 存储V-> W 的中间点
					}
				}
			}
		}
		// 输出start-> end 的路径
		// 不断的遍历 p[i][end],直到 p[i][end]值为 end为止
		int start = 0;
		int end = n - 1;
		while (start != end) {
			System.out.println(start);
			start = p[start][n - 1];
		}
		System.out.println(start);
	}
}
```
