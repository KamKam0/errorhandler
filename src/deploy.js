const os = require('node:os')
const fs = require("node:fs")

let osSymbol = '/'
if (os.platform() === 'win32') {
    osSymbol = "\\"
}

module.exports = (functionCallback, logError=true, createFile=true) => {
    let path = require.resolve("./errormanagers/rejectionHandled").split(osSymbol)
    path.pop()
    path = path.join(osSymbol)
    let files = fs.readdirSync(path).filter(e => e.endsWith("js") && !["index.js", "deploy.js"].includes(e))
    files.forEach(file => process.on(file.split(".js")[0], err => require(`./errormanagers/${file}`)(err, logError, createFile, functionCallback)))
    return true
}