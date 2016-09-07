---
layout: post
title:  "求平方、三次方根方法总结"
date:  2016-05-17
categories: Algorithm
---

二分法、牛顿迭代法

---

- 目录
{:toc}

### 简介

- 求平方、三次方根方法，在编程中总体思想是不断逼近

> 1. 二分法:减少了迭代次数
> 2. 牛顿迭代法：性能更好，迭代次数更少



### 二分法

> 不断用二分值的n次方与，目标值比较

> 以下代码精度：1e-7 ，保留一位小数输出结果

```java
    public static void f(double y){
    	 double start = 0;
         double end = y;
         double x=1;
         do{
             x = (start + end)/2;
             if(Math.abs(x*x*x -y)<1e-7){
                 break;
             }
             if(x*x*x -y>0){
                end = (start+end)/2; 
                
               
             }else{
                 start = (start+end)/2; 
             }
         }while(true);
         System.out.printf("%.1f",x); 
    }
```

### 牛顿迭代法

- 例：求三次方根

> 设f(x)=x3-y, 求f(x)=0时的解x，即为y的立方根。根据牛顿迭代思想，xn+1=xn-f(xn)/f'(xn)即x=x-(x3-y)/(3*x2)=(2*x+y/x/x)/3;

- 实现代码如下：

```java
  public static void f(double y){
		
		double x=1;
			
        for(;Math.abs(x*x*x -y)>1e-7;x=(2*x+y/x/x)/3){        	  
        }
        System.out.printf("%.1f",x);  
  }
```

