const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
}, {
  timestamps: true,
});
userSchema.virtual('fullName').get(function fullNameGet() {
  return `${this.firstName} ${this.lastName}`;
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
