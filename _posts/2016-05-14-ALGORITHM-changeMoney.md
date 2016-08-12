---
layout: post
title:  "递归：n元钱，兑换n种钱币方案递归实现"
date:  2016-05-14
categories: Algorithm
---

递归讲解、n元钱，兑换n种钱币问题程序实现

---

- 目录
  {:toc}


#### 选择排序：

```java
    int min;
    	for(int i=0;i<a.length-1;i++){
    		min=i;
    		for(int j=i+1;j<a.length;j++){
    			if(a[min]>a[j]){
    			   min=j;	
    			}
    		}
    		if(min!=i){
    			int temp =a[min];
    			a[min]=a[i];
    			a[i]=temp;
    		}
    	}
```
