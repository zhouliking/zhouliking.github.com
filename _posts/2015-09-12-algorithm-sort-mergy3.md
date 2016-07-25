---
layout: post
title:  "多个js文件的合并压缩"
date:  2016-03-27
categories: JavaScript
---

多个js文件的合并压缩问题探讨

---

* content
{:toc}

因为一直都是自学前端，都没有合并压缩js的习惯，只知道可以用工具进行压缩，但是自己从来没有用过。直到前天面试的时候被问到，当时就蒙了，所以现在总结一点方法。

### 多个js合并压缩

在我们的项目中我们经常会看见如下形式的代码，多个js顺序加载。

	<body>
	  <script src="js/lib/librarya.js"></script>
	  <script src="js/lib/libraryb.js"></script>
	  <script src="js/app/bar.js"></script>
	  <script src="js/app/foo.js"></script>
	  <script src="js/main.js"></script>
	</body>

一下子需要加载很多js。这样就需要优化，我们需要想到：压缩，拼接。也就是减少体积和HTTP次数。

对于这种结构我们可以选择gulp来处理，可以使用gulp-useref和gulp-uglify来处理。

首先需要全局安装gulp

	$ npm install gulp -g


然后在我们的项目中执行npm init命令进行初始化：

	$ npm init

需要填写的按照要求填写，也可以不填写直接回车就好了。

我们先进行合并我们可以这样处理

	<body>
	  <!--build:js js/main.min.js -->
	  <script src="js/lib/librarya.js"></script>
	  <script src="js/lib/libraryb.js"></script>
	  <script src="js/app/bar.js"></script>
	  <script src="js/app/foo.js"></script>
	  <script src="js/main.js"></script>
	  <!-- endbuild -->
	</body>

然后安装gulp-useref，并添加依赖。

	$ npm install gulp-useref --save-dev

假设项目目录如下：

	|-project/
	  |-js/
	    |-lib/
	    |-app/
	    |-main.js
	  |-index.html

然后建立gulpfile.js文件我们写入如下代码。

	var gulp = require('gulp');
	var useref = require('gulp-useref');
	gulp.task('useref', function(){
	  return gulp.src('*.html')
	    .pipe(useref())
	    .pipe(gulp.dest('dist'));
	});

然后执行` gulp useref `就可以发现新生成了dist文件我们需要的合并js就在目录中。

	$ gulp useref

合并完成之后使用合并完之后使用gulp-uglify插件再来压缩。

首先是安装

	$ npm install gulp-uglify --save-dev

然后

	// Other requires...
	var uglify = require('gulp-uglify');
	gulp.task('useref', function(){
	  return gulp.src('*.html')
	    .pipe(uglify()) 
	    .pipe(useref())
	    .pipe(gulp.dest('dist'))
	});

但是对于requirejs定义多个模块的我们该怎么合并压缩呢。

### requirejs模块优化合并压缩

RequireJS提供一个基于node.js的命令行工具r.js，用来压缩多个js文件。它的主要作用是将多个模块文件压缩合并成一个脚本文件，以减少网页的HTTP请求数。

首先需要有node环境，安装就好了，具体怎么弄就不说了。

然后需要下载[r.js](http://requirejs.org/docs/download.html#rjs)

下载好以后就可以在命令行里对前端代码进行优化了。r.js 的参数传递使用方式，一是直接加在命令行后面，如下：

	node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js

另一种方式是构建一个配置文件(相对于执行文件夹)并包含指定的参数,构建一个配置文件比在命令行中使用参数的可读性更高.


	({
	    appDir: './',
	    baseUrl: './js',
	    dir: './dist',
	    modules: [
	        {
	            name: 'main'
	        }
	    ],
	    fileExclusionRegExp: /^(r|build)\.js$/,
	    optimizeCss: 'standard',
	    removeCombined: true,
	    paths: {
	        jquery: 'lib/jquery',
	        underscore: 'lib/underscore',
	        backbone: 'lib/backbone/backbone',
	        backboneLocalstorage: 'lib/backbone/backbone.localStorage',
	        text: 'lib/require/text'
	    },
	    shim: {
	        underscore: {
	            exports: '_'
	        },
	        backbone: {
	            deps: [
	                'underscore',
	                'jquery'
	            ],
	            exports: 'Backbone'
	        },
	        backboneLocalstorage: {
	            deps: ['backbone'],
	            exports: 'Store'
	        }
	    }
	})

然后执行
	
	$ node r.js -o build.js

就好了

下面简单说明下参数的意义。

`appDir`：应用程序的目录（即<root>）。在这个文件夹下的所有文件将会被复制到dir参数标注的文件夹下。

`baseUrl`：相对于appDir，代表查找文件的锚点（that represents the anchor path for finding files）。

`dir`：这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下。

`modules`：一个包含多个对象的数组。每个对象代表一个将被优化的模块（module）。

`fileExclusionRegExp`：任何与此规则匹配的文件或文件夹都将不会被复制到输出目录。由于我们把 r.js 和 build.js 放置在应用程序目录下，我们希望优化器（optimizer）排除这两个文件。 因此我们可以这样设置一个正则表达式。

`optimizeCss`：RequireJS Optimizer会自动优化应用程序下的CSS文件。这个参数控制CSS最优化设置。允许的值： “none”, “standard”, “standard.keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。

`removeCombined`：如果为true，优化器（optimizer）将从输出目录中删除已合并的文件。

`paths`：模块（modules）的相对目录。

`shim`：为那些没有使用define()声名依赖关系及设置模块值的模块，配置依赖关系与“浏览器全局”出口的脚本。

