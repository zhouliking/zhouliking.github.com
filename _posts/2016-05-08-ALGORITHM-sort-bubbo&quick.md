---
layout: post
title:  "7种常见算法实现与分析（冒泡&快速排序）"
date:  2016-05-07
categories: ALGORITHM
---

7种常见算法实现与分析（冒泡&快速排序）

---

- 目录
  {:toc}

快速排序与冒泡排序均属于交换排序，即排序过程中通过交换元素顺序使得最终顺序达到我们的要求

#### 冒泡排序：

```java
        	public static void bubbleSort(int a[]){
        		int i,j;
        		boolean falg=true; //冒泡设置标志位，序列原本	有序时复杂度可为 O(n)
        		for(i=0;falg && i<a.length-1;i++){
    				for(j=0;j<a.length-i-1;j++){
    					falg=false;
    					if(a[j]>a[j+1]){
    						falg=true;
    						int temp=a[j];
    						a[j]=a[j+1];
    						a[j+1]=temp;
    					}
 	                        }
    			}
        	}
```

冒泡排序最坏情况执行次数：(n-1-1)+（n-1-2）+....+1 --> O(n*n)
冒泡排序最好情况执行次数：n-1 -->O(n)由于设置
平均时间复杂度 O(n*n)
​  

#### 快速排序：采用分治思想

快速排序是找出一个元素（理论上可以随便找一个）作为基准。
然后对数组进行分区操作,使基准左边元素的值都不大于基准值,基准右边的元素值 都不小于基准值，如此作为基准的元素调整到排序后的正确位置
递归快速排序，将其他n-1个元素也调整到排序后的正确位置

#### 快速排序递归写法：

```java
   	   public static void sort(int a[], int start, int end) {
	  		if (end - start < 1) {
	  			return;
	  		}
	  		int mid = sortUnit(a, start, end);
	  		sort(a, start, mid - 1);
	  		sort(a, mid + 1, end)
	    }
```

#### 快速非排序递归写法：非递归可用stack保存状态

```java
 	   public static void sort2(int a[], int start, int end) {
	  		int mid;
	  		Stack<Integer> stack = new Stack<Integer>();		
	  		if (start < end) {
 	 			stack.push(start);
 	 			stack.push(end);
	  		}
	  		while (!stack.empty()) {
	  			end = stack.pop();
 	 			start = stack.pop();
 	 			mid = sortUnit(a, start, end);
 	 			if (start < mid-1) {
 	 				stack.push(start);
 	 				stack.push(mid-1);
 	 			}
  				if (mid+1 < end) {
 	 				stack.push(mid+1);
 	 				stack.push(end);
 	 			}
	  		}
	  	}
 	  //一趟排序，将第一个数作为基准


 	 public static int sortUnit(int a[], int start, int end) {
			boolean flag = true;
			int m = a[start];
			while (end > start) {
				if (flag) {
					if (m > a[end]) {
						a[start++] = a[end];
						flag = false;
					} else {
						end--;
					}	
				} else {
					if (m < a[start]) {
						a[end--] = a[start];
						flag = true;
					} else {
						start++;
					}
				}
			}
			a[start] = m;
			return start;
 	 }
```

#### 时间复杂度

快速排序最坏情况执行次数：O(n*n)
快速排序最好情况执行次数：O(nlog(n))
平均时间复杂度:O(nlog(n))







