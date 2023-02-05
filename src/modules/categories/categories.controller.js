const mongoose = require('mongoose');
const { responseHelper } = require('../../plugins');
//
const Category = mongoose.model('Category');
const Car = mongoose.model('Car');
//
const getAllCategories = async (req, res) => {
  const { offset, limit } = req.query;
  const options = {
    offset: parseInt(offset, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };
  const count = await Category.countDocuments();
  const cats = await Category
    .find({})
    .skip(options.offset)
    .limit(options.limit)
    .sort({ createdAt: -1 });
  return responseHelper(res).success({
    count,
    data: cats,
  });
};
//
const getOneCategory = async (req, res) => {
  const { id } = req.params;
  const cat = await Category.findById(id);
  if (!cat) {
    return responseHelper(res).notFound('Category not found');
  }
  return responseHelper.success(cat);
};
//
const createCategory = async (req, res) => {
  const { body } = req;
  const cat = await Category.findOneAndUpdate(
    { name: body.name },
    body,
    { upsert: true, new: true },
  );
  return responseHelper(res).success(cat);
};
//
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updated = await Category.findOneAndUpdate({
    _id: id,
  }, body, { new: true });
  if (!updated) {
    return responseHelper(res).notFound('Category not found');
  }
  return responseHelper(res).success(updated);
};
//
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deleted = await Category.findOneAndDelete({
    _id: id,
  });
  if (!deleted) {
    return responseHelper(res).notFound('Category not found');
  }
  await Car.deleteMany({ category: id });
  return responseHelper(res).success(deleted);
};
module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
