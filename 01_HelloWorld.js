// 引入包
var http = require('http');
// 创建服务器
// 表示有请求进来需要做的事
var server = http.createServer(function (req, res) {
    // req require
    // res response
    // 状态码、文件类型、字符集
    res.writeHead(200, {
        'Content-type': 'text/html;charset=UTF-8'
    });
    res.end('Hello World');
});

// 运行服务器来某一端口
server.listen(3000, '127.0.0.1');