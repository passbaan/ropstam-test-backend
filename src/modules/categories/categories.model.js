const mongoose = require('mongoose');

const { Schema } = mongoose;
const categories = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const CategoryModel = mongoose.model('Category', categories);
module.exports = CategoryModel;
