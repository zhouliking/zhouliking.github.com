---
layout: post
title:  "gulp简单使用"
date:  2015-12-27
categories: Node
---

gulp简单使用方法

---

* content
{:toc}

### Gulp？

[Gulp](http://gulpjs.com/)是一个构建系统，开发者可以使用它在网站开发过程中自动执行常见任务。Gulp是基于Node.js构建的，因此Gulp源文件和你用来定义任务的Gulp文件都被写进了JavaScript里。前端开发者可以使用它来处理常见任务：

* 搭建web服务器
* 文件保存时自动重载浏览器
* 使用预处理器如Sass、LESS
* 优化资源，比如压缩CSS、JavaScript、压缩图片

### Node.js

[Node.js](http://nodejs.cn/)就是运行在服务端的 JavaScript。Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。Gulp和所有插件都通过JavaScript编写并依托Node.js平台。作为前端工程师你最好了解简单的Node.js。


下面提供一些Node.js的入门教程，当然你暂时不用去看，等你有足够的时间和精力的时候建议你去学习下：

[Node初学者入门，一本全面的NodeJS教程](https://cnodejs.org/getstart)

[Node.js 入门](http://ourjs.com/detail/529ca5950cb6498814000005)

[Node.js入门By Welefen Lee](http://www.welefen.com/ppt/Node-Primer.htm#0)

[Node.js v4.2.2 手册 & 文档](http://nodeapi.ucdok.com/#/api/)

有精力最好看英文的API。

下面回到我们的重点gulp


### 全局安装Gulp

首先我们需要安装Node.js的环境这个就不介绍了。推荐[教程](http://www.runoob.com/nodejs/nodejs-install-setup.html)自己安装配置好。

然后在命令行输入

	npm install -g gulp

就这么简单，安装好在继续后面的。


### 使用Gulp

首先，我们新建一个project文件夹，并在该目录下执行`npm init`命令：

	npm init

npm init命令会为你创建一个package.json文件，这个文件保存着这个项目相关信息。简单说来呢，这个 package.json 文件就是定义了项目的各种元信息，包括项目的名称，git repo 的地址，作者等等。最重要的是，其中定义了我们项目的依赖，这样这个项目在部署时，我们就不必将 node_modules 目录也上传到服务器，服务器在拿到我们的项目时，只需要执行 npm install，则 npm 会自动读取 package.json 中的依赖并安装在项目的 node_modules 下面，然后程序就可以在服务器上跑起来了。现在随便填写就好了。

	{
	  "name": "project",
	  "version": "1.0.0",
	  "description": "",
	  "main": "app.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "",
	  "license": "ISC"
	}


现在我们创建一个Gulp任务来编译[sass](https://github.com/sindresorhus/gulp-ruby-sass)。首先创建一个名为gulpfile.js的文件，这是定义Gulp任务的地方，它可以通过gulp命令来运行，接着把下面的代码放到gulpfile.js文件里面。

	var gulp = require('gulp');
	var sass = require('gulp-ruby-sass');

	gulp.task('sass', function () {
	  return sass('app/css/index.scss')
	    .on('error', sass.logError)
	    .pipe(gulp.dest('app/css/'));
	});

接下来还需要安装上面使用的依赖gulp和sass。运行下面命令：

	npm install gulp gulp-ruby-sass --save-dev

当然如果自己临时使用时可以省去--save-dev的


> 注意gulp-ruby-sass和gulp-sass的区别，前者需要需要ruby环境，需要生成临时目录和临时文件。因为之前使用的是gulp-sass这里使用gulp-ruby-sass玩玩。没有本质的区别。注意下就好了，当然了代码是有点区别的。[gulp-sass](https://github.com/dlmanning/gulp-sass)代码参考下这里的readme。其实都很简单的。

	
我们可以看见project目录中生成了文件node_modules。而且project.json中引入了依赖

	"devDependencies": {
	    "gulp": "^3.9.0",
	    "gulp-ruby-sass": "^2.0.6"
	  }

测试一下命令行输入
	
	gulp sass

你会发现css文件夹下面生成了index.css文件，运行index.html可以查效果。


其实说到这里gulp也基本讲完了，因为其他操作都大同小异，查看帮助文档就能解决了。主要是入门问题，下面给出常用的帮助文档。


* 编译Sass [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass)与[gulp-sass](https://github.com/dlmanning/gulp-sass)
* Autoprefixer [gulp-autoprefixer](https://github.com/Metrime/gulp-autoprefixer)
* 缩小化(minify)CSS [gulp-minify-css](https://github.com/murphydanger/gulp-minify-css)
* JSHint [gulp-jshint](https://github.com/spalger/gulp-jshint)
* 拼接 [gulp-concat](https://github.com/contra/gulp-concat)
* 丑化(Uglify) [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
* 图片压缩 [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
* 即时重整(LiveReload) [gulp-livereload](https://github.com/vohof/gulp-livereload)
* 清理档案 [gulp-clean](https://github.com/peter-vilja/gulp-clean)
* 图片快取，只有更改过得图片会进行压缩 [gulp-cache](https://github.com/jgable/gulp-cache/)
* 更动通知 [gulp-notify](https://github.com/mikaelbr/gulp-notify)


### 参考资料
1、[gulp中文网](http://www.gulpjs.com.cn/)

2、[gulp入门指南](http://www.open-open.com/lib/view/open1417068223049.html)

3、[Gulp新手入门教程](http://www.w3ctrain.com/2015/12/22/gulp-for-beginners/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

4、[Gulp开发教程](http://www.imooc.com/article/2364)