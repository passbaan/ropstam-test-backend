const express = require('express');

const validator = require('./categories.validators');
const controller = require('./categories.controller');
const { validateReq } = require('../../plugins/validationHelper');

const router = express.Router();
// CRUD CALLS
router.get('/', validator.getAllCategories, validateReq, controller.getAllCategories);
router.get('/:id', validator.getOneCategory, validateReq, controller.getOneCategory);
router.post('/', validator.createCategory, validateReq, controller.createCategory);
router.put('/:id', validator.updateCategory, validateReq, controller.updateCategory);
router.delete('/:id', validator.deleteCategory, controller.deleteCategory);
//
module.exports = router;
