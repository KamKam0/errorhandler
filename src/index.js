/**
 * @returns {string}
 */
exports.version = require("../package.json").version
/**
 * @returns {function}
 */
exports.rejectionHandled = require("./errormanagers/rejectionHandled")
/**
 * @returns {function}
 */
exports.uncaughtException = require("./errormanagers/uncaughtException")
/**
 * @returns {function}
 */
exports.uncaughtExceptionMonitor = require("./errormanagers/uncaughtExceptionMonitor")
/**
 * @returns {function}
 */
exports.unhandledRejection = require("./errormanagers/unhandledRejection")
/**
 * @returns {boolean}
 */
exports.deploy = require("./deploy.js")