/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');
var config = require('../db');
var logConfig = require('../config/log');
var fs = require('fs');

const servers = require("../ipc/Server");
const IPCHelper = require("../ipc/IPCHelper");
const LogUtils = require('../utils/LogUtil');


/**
 * 确定目录是否存在，如果不存在则创建目录
 */
var confirmPath = function(pathStr) {

  if(!fs.existsSync(pathStr)){
      fs.mkdirSync(pathStr);
      console.log('createPath: ' + pathStr);
    }
}

/**
 * 初始化log相关目录
 */
var initLogPath = function(){
  //创建log的根目录'logs'
  if(logConfig.baseLogPath){
    confirmPath(logConfig.baseLogPath)
    //根据不同的logType创建不同的文件目录
    for(var i = 0, len = logConfig.appenders.length; i < len; i++){
      if(logConfig.appenders[i].path){
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
      }
    }
  }
}

initLogPath();

/**
 * 启动websocket服务，前端访问
 */
var startSocket = function () {
    // servers.start();
    // IPCHelper.init();
};

//startSocket();


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort('3001');
console.log("process.env.NODE_ENV=" + process.env.NODE_ENV);
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', function (err) {
    LogUtils.logErrorWithoutCxt('uncaughtException:  ', err.stack);
    LogUtils.logErrorWithoutCxt("Node NOT Exiting...");
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

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
    LogUtils.logErrorWithoutCxt('app error:  ', error);
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
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
    LogUtils.logErrorWithoutCxt('app error---:  ', error.stack);
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
