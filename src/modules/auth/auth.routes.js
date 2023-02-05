const express = require('express');

const validator = require('./auth.validators');
const controller = require('./auth.controller');
const { validateReq } = require('../../plugins/validationHelper');

const router = express.Router();

router.post('/login', validator.login, validateReq, controller.login);
router.post('/register', validator.register, validateReq, controller.register);
router.post('/verifyToken', validator.verifyToken, validateReq, controller.verifyToken);
//
module.exports = router;
