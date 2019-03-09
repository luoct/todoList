const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://localhost:27017/todo');
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = (app) => {
    app.get('/index', (req, res) => {
        res.render('welcome.ejs');
    });
    app.get('/todo', (req, res) => {
        Todo.find({}, (err, data) => {
            res.render('todo.ejs', { todos: data });
        });
    });
    app.get('/getTodo', (req, res) => {
        Todo.find({}, (err, data) => {
            let datas = [];
            for (let i = 0; i < data.length; i++) {
                datas[i] = data[i].item;
            }
            console.log(datas);
            res.render('getTodo.ejs', { datas: datas });
        });
    });
    app.post('/todo', urlencodedParser, (req, res, data) => {
        //把表单传过来的数据添加到数据库中
        //data.push(req.body);
        Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', (req, res) => {
        Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });

        //filter函数把所以和item相同的过滤
        // data = data.filter((todo) => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
}