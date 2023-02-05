/* eslint-disable no-eval */
/**
 *
 * @param {string} path
 * @returns
 */
function requireDynamically(path) {
  const newPath = path.split('\\').join('/'); // Normalize windows slashes
  return eval(`require('${newPath}');`); // Ensure Webpack does not analyze the require statement
}
module.exports = requireDynamically;
