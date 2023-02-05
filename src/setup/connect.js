const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connect = async () => {
  try {
    const db = await mongoose.connect(config.dbUrl);
    logger.info(`Database: Mongodb connected mongodb://${db.connection.host}:${db.connection.port}/${db.connection.name}`);
    exports.db = db;
  } catch (error) {
    logger.error('Dataabse: Error while connecting to db:', error);
    throw new Error('An error while connecting to database');
  }
};
exports.connect = connect;
