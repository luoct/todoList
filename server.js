const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const routes = require('./routes/index');

const app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

//  multer插件创建一个文件上传的目录
var createFolder = folder => {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './upload/';  //定义文件上传的目录
createFolder(uploadFolder);  //创建文件上传的目录

//磁盘存储引擎可以让你控制文件的存储。
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });


//  bodyParser 对发送的请求的数据进行处理
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));  //处理from表单使用

routes(app);

//上传文件的路由
app.post('/upload', upload.single('pic'), (req, res) => {
    res.send('ok');
});

app.listen(3000);
console.log('listening on port 3000');
