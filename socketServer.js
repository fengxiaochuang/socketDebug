/**
 * Created by Administrator on 2017/3/28.
 */
/**
 * Module dependencies.
 */
const http = require('http');
const RequestInfo = require("./util/requestInfo");

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || '3000');

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

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
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

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
