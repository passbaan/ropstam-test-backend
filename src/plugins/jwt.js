const jwt = require('jsonwebtoken');
const { config } = require('../setup');
// signToken
/**
 *
 * @param {string} data
 * @returns
 */
exports.signToken = (data) => jwt
  .sign(
    data,
    config.secret,
    { expiresIn: '1d' },
  );
// decodeToken
/**
 *
 * @param {string} token
 * @returns
 */
exports.decodeToken = (token) => {
  const decoded = {
    data: null,
    error: null,
  };
  try {
    decoded.data = jwt.verify(token, config.secret);
  } catch (error) {
    decoded.error = error;
  }
  return decoded;
};
