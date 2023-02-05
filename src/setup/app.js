const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
//
const routerLogger = require('./routeLogger');
const logger = require('./logger');
const config = require('./config');
//
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${config.port}` : `Port ${config.port}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
//
const onListening = (httpServer) => () => {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Server: server is listening on ${bind}`);
};
//
const app = () => {
  const expressApp = express();
  expressApp.use(routerLogger);
  expressApp.use(cors());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());
  return expressApp;
};
const httpServer = (expressApp) => {
  const server = http.createServer(expressApp);
  server.listen(config.port);
  server.on('error', onError);
  server.on('listening', onListening(server));
  return server;
};
exports.expressApp = app;
exports.httpServer = httpServer;
