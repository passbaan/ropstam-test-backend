const config = {
  dbUrl: process.env.db_link || 'mongodb://localhost:27017/ropstam-test-db',
  port: process.env.PORT || 3200,
  saltRounds: process.env.saltRounds || 10,
  secret: process.env.jwtSecret || '&V&tJW9Cl$g3*lqWg1!&@Bec0wqsn!',
};
module.exports = config;
