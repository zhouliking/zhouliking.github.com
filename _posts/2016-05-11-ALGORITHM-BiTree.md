---
layout: post
title:  "二叉树建立与遍历"
date:  2016-05-11
categories: Algorithm
---

二叉树建立、遍历、知中/前序求后序,知中/后序求前序

---

- 目录
  {:toc}

#### 二叉树定义与创建

##### 定义二叉树数据结构

```java
class BiTree{  
	private String data;
	private BiTree letf;
	private BiTree right;	
	public BiTree(String data){
		this.letf = null;
		this.right = null;
		this.data = data;
	}
    // …geter/setter
}
```

##### 建立二叉树

```java
	static String str = "ab#d##c#e##";
	
	public static BiTree craetBiTree(BiTree node){ //创建
	    char c = str.charAt(i++); 
		if(c =='#'){
			node = null;
		}else{
			node = new BiTree(c+"");
			node.setLetf(craetBiTree(node.getLetf()));
			node.setRight(craetBiTree(node.getRight()));		
		}
		return node;	
	}
```	
	
#### 二叉树遍历

##### 递归方式遍历二叉树

```java
	public static void preOderTraverse(BiTree node){//前序
		if(node != null){
			System.out.println(node.getData());
			preOderTraverse(node.getLetf());
			preOderTraverse(node.getRight());
		}
	}
	public static void inOderTraverse(BiTree node){//中序
		if(node != null){			
			inOderTraverse(node.getLetf());
			System.out.println(node.getData());
			inOderTraverse(node.getRight());
		}
	}
	public static void postOderTraverse(BiTree node){//后序
		if(node != null){			
			postOderTraverse(node.getLetf());
			postOderTraverse(node.getRight());
			System.out.println(node.getData());
		}
	}
```

#### 二叉树题目

##### 已知中+前序，求后续

- 思路：

> 不断的输出根节点，利用前序先出现的为root，不断的将中序分成，root右、左边递归,将root输出
> 输出结果与后序相反

```java
	public static void preAndInToPostOder(char mids[],char pres[],int start,int end){
		int rootIndex=0;
		if(start>end)
			return;
		for(int i=0;i<pres.length;i++){ 在中序中寻找，根节点
			for(int j=start;j<=end;j++){
				if(pres[i]==mids[j]){
					rootIndex = j;
					i=pres.length;break;
				}
			}
		}
		//反向输出后续，可以用数组或list先存着
		System.out.println(mids[rootIndex]);		
		preAndInToPostOder(mids, pres, rootIndex+1,end); root右边
		preAndInToPostOder(mids, pres, start, rootIndex-1); root左边	
	}
```

##### 已知：中序 +后序，求前续：

- 思路：

> 不断的输出根节点，反向取出后序点，极为root节点，然后在中序中寻找，将中序分成，root左，右边依次遍历
> 输出结果即为前序

```java
	public static void postAndInToPreOder(char mids[],char post[],int start,int end){
		int rootIndex=0;
		if(start>end)
			return;
		for(int i=post.length-1;i>=0;i--){
			for(int j=start;j<=end;j++){
				if(post[i]==mids[j]){
					rootIndex = j;
					i=-1;break;
				}
			}
		}
		System.out.println(mids[rootIndex]);直接输出中序，中的root节点
		postAndInToPreOder(mids, post, start, rootIndex-1); root左边
		postAndInToPreOder(mids, post, rootIndex+1,end);    root右边
	}
```
