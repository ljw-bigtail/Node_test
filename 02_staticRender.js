// 引入包
var http = require('http');
var fs = require('fs');

// 创建服务器
// 表示有请求进来需要做的事
var server = http.createServer(function (req, res) {
    // req require
    // res response
    // 状态码、文件类型、字符集
    if (req.url == '/a') {
        fs.readFile('./html/1.html', (err, data) => {
            res.writeHead(200, {
                'Content-type': 'text/html;charset=UTF-8'
            });
            res.end('Hello World' + data);
        });
    } else if (req.url == '/b') {
        fs.readFile('./html/2.html', (err, data) => {
            res.writeHead(200, {
                'Content-type': 'text/html;charset=UTF-8'
            });
            res.end(data);
        });
    } else if (req.url == '/1.jpg') {
        fs.readFile('./img/1.jpg', (err, data) => {
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html;charset=UTF-8'
        });
        res.end('找不到了');
    }
});
// 运行服务器来某一端口
server.listen(3000, '127.0.0.1');