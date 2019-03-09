## todoList

使用Express + MongoDB 搭建的一个简单的待办事项列表
[GitHub地址](https://github.com/luoct/todoList.git)

项目运行

```
git clone https://github.com/luoct/todoList.git 

cd todoList

npm install

node server.js

```

## 开发环境

 - Node.js
 - MongoDB
 - Express
 
## 项目依赖
```
"dependencies": {
      "body-parser": "^1.18.3",
      "ejs": "^2.6.1",
      "express": "^4.16.4",
      "mongoose": "^5.4.12",
      "multer": "^1.4.1",
      "sortablejs": "^1.8.3"
}
```

## 开发
##### 1. Node.js的安装和使用 

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
> Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

 - [NodeLearn](https://github.com/luoct/nodeLearn/blob/master/README.md)
 - [node中文文档](http://nodejs.cn/api/)

#### 2. MongoDB
> 是一种NoSQL
> 高性能、易部署、易使用，存储数据非常方便
> 不适用高度事务化的系统
- database 数据库
- collection 数据库表/集合
- document 数据记录行/文档
- field 数据字段/域 由键值对组成

####  3. Express

> 基于 Node.js 平台，快速、开放、极简的 Web 开发框架
> `$ npm install express --save`

- 快速使用
	```
	const express = require('express')
	const app = express()
	
	app.get('/', (req, res) => res.send('Hello World!'))
	
	app.listen(3000, () => console.log('Example app listening on port 3000!'))
	```
- 中间件使用 middleware
   - `"body-parser": "^1.18.3",` 解析传入请求主体
   使用:
		```
		// parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({ extended: false }))
		 
		// parse application/json
		app.use(bodyParser.json())
		```

   - `"multer": "^1.4.1",`  处理 `multipart/form-data `类型的表单数据，主要用于上传文件
    使用:
		```
		var upload = multer({ dest: 'uploads/' })
		  app.post('/profile', upload.single('avatar'), function (req, res, next) {
		  // req.file 是 `avatar` 文件的信息
		  // req.body 将具有文本域数据，如果存在的话
		})
		```


#### 4. 模板引擎ejs

> ejs是一个简单高效的模板语言,通过数据和模板,可以生成HTML标记文本。

后端 `res.render('todo.ejs', { todos: data });`
```
<ul class="todos">
	<% todos.forEach((todo)=>{ %>
	<li class="todo">
		<i class="iconfont icon-circleo"></i>
		<%= todo.item %>
		</li>
	<% }) %>
</ul>
```


## 路由

```
 	app.get('/todo', (req, res) => {
        Todo.find({}, (err, data) => {
            res.render('todo.ejs', { todos: data });
        });
    });

```

```
	app.post('/todo', urlencodedParser, (req, res, data) => {
        //把表单传过来的数据添加到数据库中
        //data.push(req.body);
        Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
```

```
	app.delete('/todo/:item', (req, res) => {
        Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
```
