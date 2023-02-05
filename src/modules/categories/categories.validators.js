const Joi = require('joi');
const { genericSchemas } = require('../../plugins/validationHelper');

const createCategorySchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
}).unknown(false);

module.exports = {

  getOneCategory: (req, res, next) => {
    req.requirements = {
      param: genericSchemas.objectId,
    };
    next();
  },
  getAllCategories: (req, res, next) => {
    req.requirements = {
      query: genericSchemas.pagination,
    };
    next();
  },
  createCategory: (req, res, next) => {
    req.requirements = {
      body: createCategorySchema,
    };
    next();
  },
  updateCategory: (req, res, next) => {
    req.requirements = {
      params: genericSchemas.objectId,
      body: createCategorySchema,
    };
    next();
  },
  deleteCategory: (req, res, next) => {
    req.requirements = {
      param: genericSchemas.objectId,
    };
    next();
  },
};
