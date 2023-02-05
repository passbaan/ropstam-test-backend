const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const registerSchema = Joi.object({
  firstName: Joi.string().strict().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
}).unknown(false);

const verifySchema = Joi.object({
  accessToken: Joi.string().required(),
}).unknown(false);

module.exports = {
  login: (req, res, next) => {
    req.requirements = {
      body: loginSchema,
    };
    next();
  },
  verifyToken: (req, res, next) => {
    req.requirements = {
      body: verifySchema,
    };
    next();
  },
  register: (req, res, next) => {
    req.requirements = {
      body: registerSchema,
    };
    next();
  },
};
