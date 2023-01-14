/**
 * @returns {string}
 */
exports.version = require("./package.json").version
/**
 * @returns {function}
 */
exports.rejectionHandled = require("./rejectionHandled")
/**
 * @returns {function}
 */
exports.uncaughtException = require("./uncaughtException")
/**
 * @returns {function}
 */
exports.uncaughtExceptionMonitor = require("./uncaughtExceptionMonitor")
/**
 * @returns {function}
 */
exports.unhandledRejection = require("./unhandledRejection")
/**
 * @returns {boolean}
 */
exports.deploy = require("./deploy.js")