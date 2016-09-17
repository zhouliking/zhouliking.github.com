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
public static int prim(int g[][],int n){
	
	//已经找到点集v，lowcost[i],表示 i点到 v集中所有的点的最小权值
	//由于点集v中的所有点，lowcost[u]=0,表示已经找到，将其去除
	int lowcost[] = new int[n];
	
	//存放到已经找到点集 v的最小值，的坐标
	int index[] = new int[n]; 
	
	int minPathWeight=0;//最短路径权值
	
	//任意取一点开始 （取 0 处）
	for (int i = 0; i < n; i++) {
		lowcost[i] = g[0][i];
		index[i] = 0; //初始起点均为 0
	}
	for (int i = 1; i < n; i++) {
		int min = Integer.MAX_VALUE;

		int minIndex = 0;
		for (int j = 1; j < n; j++) { 
			// 遍历lowcost[]，由于lowcost[j]=0表示已经找出的点，去掉
			if (lowcost[j] != 0 && min > lowcost[j]) {
				min = lowcost[j];
				minIndex = j;
			}
		}
		//从 结果：经过的点： 起点 --> 终点		
		//System.out.println(index[minIndex]+"->" + minIndex );
		minPathWeight+=g[index[minIndex]][minIndex];
		
		//去除这个点
		lowcost[minIndex] = 0;
		
		//因为新加入了minIndex 点，更新lowcost[]
		for (int j = 1; j< n; j++) { 
			if (lowcost[j] != 0 && g[minIndex][j] < lowcost[j]) {
				lowcost[j] = g[minIndex][j];
				index[j] = minIndex; //更新起点的下标
			}
		}
	}
	return minPathWeight;
}
```

### kruskal（克鲁斯卡尔）

