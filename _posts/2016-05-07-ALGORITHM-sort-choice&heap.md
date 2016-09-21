---
layout: post
title:  "常见排序算法之-选择排序 & 堆排序"
date:  2015-08-07
categories: Algorithm
---

7种常见算法实现与分析（选择排序 & 堆排序）

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
#### 堆排：

堆排序与快速排序，归并排序一样都是时间复杂度为O(N*logN) 
二叉堆是完全二叉树或者是近似完全二叉树
父结点的键值总是大于或等于（小于或等于）任何一个子节点的键值
父结点的键值总是 >= 任何一个子节点的键值时为最大堆	
存储：一般都用数组来表示堆，左右子结点下标分别为2 * i + 1和2 * i + 2

#### 堆的插入：

每次插入都是将新数据放在数组最后，然后和父节点比较，进行调整，i结点的父结点下标就为(i – 1) / 2 从0 开始标号
堆的删除：只能删除第0个数据，为了便于重建堆，实际的操作是将最后一个数据的值赋给根结点，然后再从根结点开始进行一次从上向下的调整。调整时先在左右儿子结点中找最小的，如果父结点比这个最小的子结点还小说明不需要调整了，相当于从根结点将一个数据的“下沉”过程
原理：从 底层n/2开始，比较节点左右节点的值，找到最小的，并进行替换依次 向堆的上层进行，将最小值，移到堆顶 
```java
    public static void buildMinHeap(int a[],int n) {
    		int left,right;
    		int min;
    		for(int i=(n-1)/2;i>=0;i--){
    			min=i;
    			left=i*2+1;			
    			if(left<n){
    				if(a[left]<a[min]){
    					min=left;
    				}				
    			}
    			right=i*2+2;
    			if(right<n){
    				if(a[right]<a[min]){
    					min=right;
    				}				
    			}
    			if(min!=i){
    				int temp=a[min];
    				a[min]=a[i];
    				a[i]=temp;
    			}
    		}		
    	}
    //堆排递归：依次取出，堆顶元素放到最后的位置，并重建堆


    	public static void sort2(int a[],int n){
    		 if(n<1){
    			 return;
    	  	}
    	  	buildMinHeap(a,n);
    	  	int temp=a[0]; 
          a[0]=a[n-1]; a[n-1]=temp; sort2(a,n-1);		
    	}


     //堆排非递归：依次取出，堆顶元素放到最后的位置，并重建堆
      public static void sort(int a[]) {
    	  for(int i=a.length-1;i>=0;i--){
    		  	buildMinHeap(a,i+1);
    		  	int temp=a[0]; a[0]=a[i]; a[i]=temp;
    	   }			
      }
```
