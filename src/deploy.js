const os = require('node:os')
const fs = require("node:fs")

module.exports = (functionCallback) => {
    let symbol;
    if(os.platform() === "darwin") symbol = "/"
    if(os.platform() === "win32") symbol = "\\"
    let path = require.resolve("./errormanagers/rejectionHandled").split(symbol)
    path.pop()
    path = path.join(symbol)
    let files = fs.readdirSync(path).filter(e => e.endsWith("js") && !["index.js", "deploy.js"].includes(e))
    files.forEach(file => process.on(file.split(".js")[0], err => require(`./errormanagers/${file}`)(functionCallback, err)))
    return true
}