const mongoose = require('mongoose');
const respsonseHelper = require('../../plugins/respsonseHelper');

const Car = mongoose.model('Car');
const getAllCars = async (req, res) => {
  const response = respsonseHelper(res);
  //  Get all cars and their count
  const {
    offset, limit, sort, order,
  } = req.query;
  const sorter = sort && order ? {
    [sort]: order === 'ascend' ? 1 : -1,
  } : {
    createdAt: -1,
  };
  const options = {
    offset: parseInt(offset, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };
  const count = await Car.countDocuments();
  const cars = await Car.find({}, null)
    .populate('category', 'name')
    .skip(options.offset)
    .limit(options.limit)
    .sort(sorter);
  return response.success({ count, data: cars });
};
//
const getCarById = async (req, res) => {
  const response = respsonseHelper(res);
  // Get Car by id
  const { id } = req.params;
  const car = await Car.findById(id);
  if (!car) {
    return response.notFound({ message: 'Car not found' });
  }
  return response.success(car);
};
//
const createCar = async (req, res) => {
  const response = respsonseHelper(res);
  // Create new car
  const car = new Car(req.body);
  await car.save();
  return response.created(car);
};
//
const updateCar = async (req, res) => {
  const response = respsonseHelper(res);
  // Update car
  const { id } = req.params;
  const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
  if (!car) {
    return response.notFound({ message: 'Car not found' });
  }
  return response.updated(car);
};
const deleteCar = async (req, res) => {
  const response = respsonseHelper(res);
  // Delete car
  const { id } = req.params;
  const car = await Car.findByIdAndDelete(id);
  if (!car) {
    return response.notFound({ message: 'Car not found' });
  }
  return response.success({ status: 'ok' });
};
module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
