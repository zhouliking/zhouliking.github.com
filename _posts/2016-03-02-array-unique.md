---
layout: post
title:  "数组常见去重方法"
date:  2016-03-02
categories: JavaScript
---

数组常见去重方法总结

---

* content
{:toc}

### 方法1

使用了双重循环，并且只考虑了数组中只有数字或者字符串的情况，效率比较低

	Array.prototype.uniqArray = function(){
	  for(var i=0;i<this.length;i++){
	    for(var j=i+1;j<this.length;j++){
	      if(this[i] == this[j]){
	        this.splice(j,1);
	        j--;
	      }
	    }
	  }
	  return this;
	}
	console.log(([3,4,2,5,4,3,4,8,1,3,3,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, 8, 1, 6, 7 ]

	console.log(([3,4,2,5,{a:3},4,3,4,{a:3},8,true,1,3,3,true,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, { a: 3 }, { a: 3 }, 8, true, 6, 7 ]

### 方法2

通过一个缓存保存去重后的数组，并通过indexOf判断是否去重，也是只能去重数字或者字符串或者布尔值

	Array.prototype.uniqArray = function(){
	  var buf = [];
	  for(var i = 0; i < this.length;i++){
	    if(buf.indexOf(this[i]) === -1){
	      buf.push(this[i]);
	    }
	  }
	  return buf;
	}
	console.log(([3,4,2,5,4,3,4,8,1,3,3,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, 8, 1, 6, 7 ]

	console.log(([3,4,2,5,{a:3},4,3,4,{a:3},8,true,1,3,3,true,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, { a: 3 }, { a: 3 }, 8, true, 1, 6, 7 ]

### 方法3

类似方法2

	Array.prototype.uniqArray = function(){
      var buf = [this[0]]; 
      for(var i = 1; i < this.length; i++){
        if (this.indexOf(this[i]) == i){
		  buf.push(this[i]);
	    } 
      }
      return buf;
  	}

    console.log(([3,4,2,5,4,3,4,8,1,3,3,4,5,6,7]).uniqArray())
    //[ 3, 4, 2, 5, 8, 1, 6, 7 ]

	console.log(([3,4,2,5,{a:3},4,3,4,{a:3},8,true,1,3,3,true,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, { a: 3 }, { a: 3 }, 8, true, 1, 6, 7 ]

### 方法4

通过一个hash保存已经提取出来的元素，效率高，可以去除对象和布尔值

	Array.prototype.uniqArray = function(){
	  var hash = {}, buf = [];
	  for(var i = 0; i < this.length; i++){
	    if(!hash[this[i]]){
	      hash[this[i]] = true;
	      buf.push(this[i]);
	    }
	  }
	  return buf;
	}
	console.log(([3,4,2,5,4,3,4,8,1,3,3,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, 8, 1, 6, 7 ]
	
	console.log(([3,4,2,5,{a:3},4,3,4,{a:3},8,true,1,3,3,true,4,5,6,7]).uniqArray())
	//[ 3, 4, 2, 5, { a: 3 }, 8, true, 1, 6, 7 ]


当然ES6又提供了更高效的选择，，不过貌似空对象不能去掉啊。

### 方法5

	function uniqArray(arr) {
	  return Array.from(new Set(arr));
	}
	
	uniqArray([1,1,2,3]) // [1, 2, 3]