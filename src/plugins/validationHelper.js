const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const respsonseHelper = require('./respsonseHelper');

const genericSchemas = {
  objectId: Joi.object({
    id: Joi.objectId().required(),
  }).unknown(false),
  empty: Joi.object({}).empty(true),
  pagination: Joi.object({
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(1).required(),
    order: Joi.string().valid('ascend', 'descend').allow(null, ''),
    sort: Joi.string().allow(null, ''),
    search: Joi.string().allow(null, ''),
    exclude: Joi.string().allow(null, ''),
  }).unknown(false),
  ledger: Joi.object({
    id: Joi.alternatives().try(Joi.string().valid('all'), Joi.objectId()).required(),
  }),
};
//
const validateReq = (req, res, next) => {
  if (!req.requirements) {
    next();
  }
  let { body = null, params = null, query = null } = req.requirements;
  if (body === null) {
    body = genericSchemas.empty;
  }
  if (params === null) {
    params = genericSchemas.empty;
  }
  if (query === null) {
    query = genericSchemas.empty;
  }
  const errorsBody = body.validate(req.body);
  const errorsParams = params.validate(req.params);
  const errorsQuery = query.validate(req.query);
  if (errorsBody.error) {
    respsonseHelper(res).fieldsError(errorsBody.error.details, body.describe()?.keys || null);
    return true;
  }
  if (errorsParams.error) {
    respsonseHelper(res).fieldsError(errorsParams.error.details, params.describe()?.keys || null);
    return true;
  }
  if (errorsQuery.error) {
    respsonseHelper(res).fieldsError(errorsQuery.error.details, query.describe()?.keys || null);
    return true;
  }
  return next();
};
module.exports = {
  validateReq,
  genericSchemas,
};
