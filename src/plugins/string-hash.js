const bcrypt = require('bcrypt');
const { config, logger } = require('../setup');
// ecnyptString
/**
 *
 * @param {string} textPass
 * @returns string
 */
exports.encryptString = async function encryptString(textPass) {
  if (!textPass || textPass === '') {
    throw new Error('Invalid textpass type passed while hashing the password.');
  }
  try {
    const hashed = await bcrypt.hash(textPass.toString(), config.saltRounds);
    return hashed;
  } catch (error) {
    logger.error('Error while encrypting the password text', error);
    throw new Error('Error while hashing the password');
  }
};
// compareEncrypted
/**
 *
 * @param {string} textPass
 * @param {string} hashed
 * @returns boolean
 */
exports.compareEncrypted = async function compareEncrypted(textPass, hashed) {
  if (textPass === '' || hashed === '') {
    throw new Error('Invalid hashed type passed while comparing the password.');
  }
  try {
    const result = await bcrypt.compare(textPass.toString(), hashed);
    return result;
  } catch (error) {
    logger.error('Error while comparing the password text', error);
    throw new Error('Error while comparing the password');
  }
};
