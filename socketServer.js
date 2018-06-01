/**
 * Created by Administrator on 2017/3/28.
 */
/**
 * Module dependencies.
 */
const http = require('http');
const RequestInfo = require("./util/requestInfo");

/**
 * Create HTTP server.
 */
    // returns content-type = text/plain
const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('server is running');
    });

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);
server.on('error', (err) => {
    console.error(err);
});
server.on('listening', function () {
    console.log("server is running on 127.0.0.1:3000");
});
// server.on("connect", function (test) {
//     console.log("1" + test);
// });
server.on("connection", function (socket) {
    // 只要连接上就触发
    // console.log(req);
    // 请求地址对象信息
    console.log(socket.address());
    // 远程访问的ip地址
    console.log(socket.remoteAddress);
    // ipv4 or ipv6
    console.log(socket.remoteFamily);
    // 远端请求端口
    console.log(socket.remotePort);
    let first = 0;
    let request = "";
    socket.on('data', function (res) {
        console.log("接受到的数据:" + res.length);
        console.log(res.toString("utf8"));
        request += res.toString();
        // if (first == 0) {
        //     console.log(res.toString("utf8"));
        //     first = 1;
        // }
    });
    // 捕获异常
    socket.on('error', function (err) {
        RequestInfo.write(request);
        console.log(err);
    });
    socket.on('end', function () {
        RequestInfo.write(request);
        console.log('connection is end');
    });
    socket.on('close', function () {
        RequestInfo.write(request);
        console.log('connection is close');
    });
    socket.on('finish', function () {
        RequestInfo.write(request);
        console.log('connection is finish');
    });

});
// 只要有标准HTTP协议请求就触发
server.on("request", function (req) {
    // http.IncomingMessage
    // header信息
    console.log(req.headers);
    // 请求方法
    console.log(req.method);
    // console.log(req.rawHeaders);
    // console.log(req.rawTrailers);
    // 请求码
    console.log(req.statusCode);
    // 状态信息
    console.log(req.statusMessage);
    // socket对象
    console.log(req.socket);
    // 请求地址
    console.log(req.url);
});