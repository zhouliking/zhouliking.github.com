---
layout: post
title:  "最小生成树"
date:  2016-05-18
categories: Algorithm
---

最小生成树.prim（普里姆)/kruskal（克鲁斯卡尔）

---

- 目录
  {:toc}

### 最小生成树简介

> 一个有 n 个结点的连通图的生成树是原图的极小连通子图，且包含原图中的所有 n 个结点，并且有保持图连通的最少的边。最小生成树可以用kruskal（克鲁斯卡尔）算法或prim（普里姆）算法求出

> 在一给定的无向图G = (V, E) 中，(u, v) 代表连接顶点 u 与顶点 v 的边（即），而 w(u, v) 代表此边的权重，若存在 T 为 E 的子集（即）且为无循环图，使得w(T) 最小，则此 T 为 G 的最小生成树。


### prim（普里姆)算法

```java
public static void prim(int g[][],int n){
		
	int index[] = new int[n]; //index[i]:到 i的 起点下标
	int lowcost[] = new int[n]; //lowcost[i] :得到的最小点集中所有点到i的最小距离

	//任意取一点，取 0 处
	for (int i = 0; i < n; i++) {
		lowcost[i] = g[0][i];
		index[i] = 0; //初始起点均为 0
	}

	for (int i = 1; i < n; i++) {
		int min = Integer.MAX_VALUE;

		int minIndex = 0;
		for (int j = 1; i < n; j++) { // 遍历lowcost[]
			if (lowcost[j] != 0 && min > lowcost[j]) {
				min = lowcost[j];
				minIndex = j;
			}
		}

		//从 index[minIndex]点   -->  minIndex点
		System.out.println(index[minIndex]+"->" + minIndex );

		lowcost[minIndex] = 0;
		
		//因为新加入了点，更新lowcost[]
		for (int j = 1; i < n; j++) { 
			if (lowcost[j] != 0 && g[minIndex][j] < lowcost[j]) {
				lowcost[j] = g[minIndex][j];
				index[j] = minIndex; //更新起点的下标
			}
		}
	}
}
```

### kruskal（克鲁斯卡尔）

