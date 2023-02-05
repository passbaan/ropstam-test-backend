const mongoose = require('mongoose');
const { decodeToken } = require('../plugins/jwt');
const respsonseHelper = require('../plugins/respsonseHelper');

exports.authorize = (req, res, next) => {
  const response = respsonseHelper(res);
  if (!('authorization' in req.headers)) {
    response.notAuthorized();
    return;
  }
  const auth = req.headers.authorization
    .replace('Bearer ', '')
    .replace('bearer ', '');
  const decoded = decodeToken(auth);
  if (decoded.error) {
    response.notAuthorized(decoded.error.message);
    return;
  }
  req.authUser = {
    ...decoded.data,
    userId: mongoose.Types.ObjectId(decoded.data.id),
  };
  next();
};
