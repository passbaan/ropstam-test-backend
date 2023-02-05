const express = require('express');

const validator = require('./cars.validators');
const controller = require('./cars.controller');
const { validateReq } = require('../../plugins/validationHelper');

const router = express.Router();
// Cars Crud with validation
router.get('/', validator.getAllCars, validateReq, controller.getAllCars);
router.get('/:id', validator.getCarById, validateReq, controller.getCarById);
router.post('/', validator.createCar, validateReq, controller.createCar);
router.put('/:id', validator.updateCar, validateReq, controller.updateCar);
router.delete('/:id', validator.deleteCar, validateReq, controller.deleteCar);
//
module.exports = router;
