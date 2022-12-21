module.exports = (prog) => {
    const fs = require("fs")
    let symbol;
    if(require("os").platform() === "darwin") symbol = "/"
    if(require("os").platform() === "win32") symbol = "\\"
    let path = require.resolve("./rejectionHandled").split(symbol)
    path.pop()
    path = path.join(symbol)
    let files = fs.readdirSync(path).filter(e => e.endsWith("js") && !["index.js", "deploy.js"].includes(e))
    files.forEach(file => process.on(file.split(".js")[0], err => require(`./${file}`)(prog, err)))
}