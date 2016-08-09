---
layout: post
title: "7种常见算法实现与分析（归并排序）"
date: 2016-05-10  13:00:00
categories: Algorithm
---

7种常见算法实现与分析（归并排序）

- 目录
  {:toc}

```java
/**
 * 归并排序
 * @author Administrator
 *
 */
public class MergeSort {
	private static void sortUnit(int[] a, int left,int mid,int right) {
		int len1=mid-left+1;
		int len2=right-mid;//
		int array1[],array2[];
		
		array1= new int[len1];
		for(int i=0;i<len1;i++){
			array1[i]=a[i+left];
		}		
		array2= new int[len2];
		for(int i=0;i<len2;i++){
			array2[i]=a[i+mid+1];
		}
		
		int j=left,m=0,n=0;
		while(m<len1&&n<len2){
			if(array1[m]>array2[n]){
                a[j++]=array2[n++];				
		    }else{
		    	a[j++]=array1[m++];
		    }
		}
		for(;m<len1;m++){
			a[j++]=array1[m++];	
		}
		for(;n<len2;n++){
			a[j++]=array2[n++];	
		}			
	}
	public static void sort(int a[],int start,int end){
		if(end<=start)
			return;
		int mid=start+(end-start)/2;
		sort(a,start,mid);
		sort(a,mid+1,end);
		sortUnit(a,start,mid,end);
	}
	public static void main(String[] args) {
		int a[] = { 7, 5, 55, 9, 4, 4, 9, 5, 1, 0, 8, 25, 15, 3, 101 };
		// int a[] = { 99, 2, 3, 45, 6, 8 };
		sort(a,0,a.length-1);
		for (int i = 0; i < a.length; i++) {
			System.out.print(a[i] + " ");
		}

	}

}
```
