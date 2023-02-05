const mongoose = require('mongoose');

const { Schema } = mongoose;
const cars = new Schema({
  model: { type: String, required: true },
  company: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  regNumber: { type: String, required: false, default: '' },
  color: { type: String, required: false, default: '' },
}, {
  timestamps: true,
});

const CarsModel = mongoose.model('Car', cars);
module.exports = CarsModel;
