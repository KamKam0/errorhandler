exports.version = "1.2.0"
exports.rejectionHandled = require("./rejectionHandled")
exports.uncaughtException = require("./uncaughtException")
exports.uncaughtExceptionMonitor = require("./uncaughtExceptionMonitor")
exports.unhandledRejection = require("./unhandledRejection")
exports.liste = ["rejectionHandled", "uncaughtException", "uncaughtExceptionMonitor", "unhandledRejection"]
exports.select = (name) => {
    if(!name) return undefined
    if(name.includes(".")) name = name.split(".")[0]
    if(this.liste.includes(name)) return require(`./${name}`)
    else return undefined
}