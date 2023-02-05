/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const generator = require('generate-password');
const sendMail = require('../../setup/mailer');
const registeration = require('../../templates/registeration');

const {
  signToken,
  decodeToken,
  compareEncrypted,
  responseHelper,
  encryptString,
} = require('../../plugins');

const User = mongoose.model('User');
//
module.exports = {
  login: async (req, res) => {
    const { body: { email, password: pwdText } } = req;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return responseHelper(res).notFound('Login failed. User with given email does not exist.');
    }
    const { password } = user;
    const matched = await compareEncrypted(pwdText, password);
    if (!matched) {
      return responseHelper(res).fieldsError([
        { message: 'Login failed. Email/Password do not match.' },
      ]);
    }
    const tokenData = {
      role: user.__t,
      name: user.fullName,
      id: user._id,
      email: user.email,
    };
    const accessToken = signToken(tokenData);
    return responseHelper(res).success({
      accessToken,
    });
  },
  verifyToken: (req, res) => {
    const { accessToken } = req.body;
    const decoded = decodeToken(accessToken);

    if (decoded.error) {
      return responseHelper(res).fieldsError([{ message: decoded.error.message }]);
    }
    return responseHelper(res).success(decoded.data);
  },
  register: async (req, res) => {
    const { body: { email } } = req;
    const user = await User.findOne({
      email,
    });
    if (user) {
      return responseHelper(res).fieldsError([
        { message: 'User with given email already exists.' },
      ]);
    }
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const hashed = await encryptString(password);
    const newUser = new User({
      ...req.body,
      password: hashed,
    });
    await newUser.save();
    const template = registeration(req.body.firstName, req.body.lastName, password);
    await sendMail(email, 'Registration Successful', template);

    return responseHelper(res).success({
      message: 'Registration successful',
      user: newUser,
    });
  },
};
