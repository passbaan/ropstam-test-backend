const expressWinston = require('express-winston');
const winston = require('winston');
const util = require('util');

function transform(info) {
  const args = info[Symbol.for('splat')];
  if (args) {
    // eslint-disable-next-line no-param-reassign
    info.message = util.format(info.message, util.inspect(args, false, null, true));
  }
  return info;
}
function utilFormatter() {
  return { transform };
}
const routeLogger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'dd-MM-YYYY, hh:mm:ss',
    }),
    utilFormatter(),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} -- ${info.level}  - ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

module.exports = routeLogger;
