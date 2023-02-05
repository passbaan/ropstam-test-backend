const server = require('./server');

(async function start() {
  await server.init();
}());
