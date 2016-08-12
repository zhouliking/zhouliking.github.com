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

#### 递归讲解

- 递归满足2个条件：

> 1. 1）有反复执行的过程（调用自身）
> 2. 2）有跳出反复执行过程的条件（递归出口）

#### 换钱币问题分析

##### 题目

> <华为笔试题>
> 我们知道人民币有1元，2元，5元，10元，20元 ，50元 100元，现在给你n元（要求兑换钱总数不超过100张）
> 如，4元能用 2 张两元；一张2元，两张1元; 4张1元。共4种方案


##### 题分析

> 1. 第一步：输入n确定，钱币范围 
> 2. 第二步：含最大钱币的多少种，含次大钱币的多少种，...,一直到钱币兑换完，或到达最小钱币1元为止 
> 3. 如，输入4元，① 确定钱币范围（1元，2元）。 ② 含2元的：2种；不含2元，只含有1元的1种

- 递归思路

>  1. 总钱数 = 含有当前比值的所有数目 + 不含当前比值的所有数目
>  2. moneys = {1,2}
>  3. f(n) = f(n - moneys[i], i) + f(n, i-1)

##### 代码实现

```java
import java.util.Scanner;

/**
 * n 元钱，用 1元，2元，5元，10元，20元 ，50元，100元兑换有多少种方案？
 * 
 * @author 周力
 */
public class Main {
	public static void main(String[] args) {
		// 钱币种类 1元，2元，5元，10元，20元 ，50元，100元
		int moneys[] = { 1, 2, 5, 10, 20, 50, 100 };

		Scanner sc = new Scanner(System.in);
		while (sc.hasNext()) {
			int index = 0;
			int input = sc.nextInt();
			for (int i = moneys.length - 1; i >= 0; i--) {
				if (input >= moneys[i]) {
					index = i;
					break;
				}
			}
			System.out.println(ChangeMoney(moneys, input, index));
		}

	}
	// 递归
	public static int ChangeMoney(int moneys[], int n, int index) {
		if (n < 0 || index < 0) {
			return 0;
		}
		if (n == 1 || n == 0 || index == 0) {
			return 1;
		}
	  return ChangeMoney(moneys, n - moneys[index], index) + ChangeMoney(moneys, n, index - 1);
	}
}
```
