/* eslint-disable global-require */
/* DO NOT CHANGE THE ORDER */
require('dotenv').config();
const respsonseHelper = require('./src/plugins/respsonseHelper');
const {
  database,
  app: createApp,
  routes,
} = require('./src/setup');

const { expressApp, httpServer } = createApp;
const app = expressApp();
//
async function prepareExpress() {
  await database.connect();
  exports.dbConnection = database.db;
  require('./src/setup/models');
  await routes(app);
  app.get('/', (req, res) => respsonseHelper(res).success({ status: 'ok' }));
  app.all('*', (req, res) => respsonseHelper(res).notFound());
}
//
exports.init = async () => {
  await prepareExpress();
  httpServer(app);
};
//
exports.app = app;
exports.httpServer = httpServer;
