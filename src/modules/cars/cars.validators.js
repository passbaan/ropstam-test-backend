const Joi = require('joi');
const { genericSchemas } = require('../../plugins/validationHelper');

const createCarSchema = Joi.object().keys({
  category: Joi.string()
    .required(),
  company: Joi.string()
    .min(3)
    .max(50)
    .required(),
  color: Joi.string()
    .min(3)
    .max(50)
    .allow('', null),
  model: Joi.string()
    .min(3)
    .max(50)
    .required(),
  year: Joi.number()
    .min(1990)
    .max(2023)
    .required(),
  regNumber: Joi.string()
    .min(7)
    .max(50)
    .allow('', null),
}).unknown(false);

module.exports = {

  getCarById: (req, res, next) => {
    req.requirements = {
      param: genericSchemas.objectId,
    };
    next();
  },
  getAllCars: (req, res, next) => {
    req.requirements = {
      query: genericSchemas.pagination,
    };
    next();
  },
  createCar: (req, res, next) => {
    req.requirements = {
      body: createCarSchema,
    };
    next();
  },
  updateCar: (req, res, next) => {
    req.requirements = {
      params: genericSchemas.objectId,
      body: createCarSchema,
    };
    next();
  },
  deleteCar: (req, res, next) => {
    req.requirements = {
      param: genericSchemas.objectId,
    };
    next();
  },
};
