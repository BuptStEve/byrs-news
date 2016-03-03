# byrs-news

## 零、前言
日常使用[北邮人论坛](http://bbs.byr.cn)时，常感觉到浏览帖子不太方便╮(╯▽╰)╭，于是就用寒假时间捣鼓了一下这个项目。

不想看废话的直接点击这里：

* [外网：每小时更新](http://182.254.241.100)
* [内网：每10分钟更新](http://10.108.114.205)

![时间](http://7xlxvm.com1.z0.glb.clouddn.com/byrs-news.jpg)

## 一、功能
### 0. 无刷新（采用 websocket 通信）
举个栗子：采用降序的方式浏览某个帖子，不用刷新就可以看到最新的回帖。

此处应有图～=￣ω￣=～，然而并没有...

### 1. 首页十大导航（其实就是affix_(:3 」∠)_）
![feat1:affix](http://7xlxvm.com1.z0.glb.clouddn.com/feat1.gif)

### 2. 类似知乎的预览（单击切换摘要和正文）
![feat2:toggle](http://7xlxvm.com1.z0.glb.clouddn.com/feat2.gif)

### 3. 帖子详情
#### 3.1. 升序、降序浏览方式切换
#### 3.2. 类似 facebook 的无限滚动加载
#### 3.3. 浏览进度条
![feat3](http://7xlxvm.com1.z0.glb.clouddn.com/feat3.gif)

## 二、进度
当前进展到 v0.3.0+，搜索功能计划在 v0.4.0+ 实现。进展估计不会太快...

~~啊！啊！啊！因为简历还没写啊！摔！人家居然都已经去面试了啊！~~

* roadmap: [点击这里查看](https://wekan.io/b/5b7v6YC5dMbTrpkkX/byrs-news)

## 三、Q&A
### 1. 是否开源？
开源，但是需要等一哈...

### 2. 内容来源？
另一个基于 nodeJs(superagent/cheerio/async/mongoose) 爬虫的项目，爬取并整理来自 [北邮人论坛移动版](http://m.byr.cn) 的内容。~~代码写得太丑...需要大改先~~

### 3. 项目架构？
* 语言：JavaScript
* 框架：Meteor（一个基于nodeJs的全栈式开发框架）
* 数据库：MongoDB（一个 nosql 数据库）
* 更多技术细节请提问，或者关注我的~~有时间才会写的~~[Blog](http://buptsteve.github.io/blog/) （ps 搭建服务器那篇需要大改...）

### 4. ...?
持续更新ing...

## 四、one more thing...
暂时（以后也）不支持发布内容（除了点赞），所以并没有另立山头的意思呀亲！~~（此外也容易被查水表）~~

只是校内热门内容的搬运工罢了╮(╯▽╰)╭
