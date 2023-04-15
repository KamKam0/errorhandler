module.exports = () => {
    let link = process.cwd()
    let symbol;
    if(require("node:os").platform() === "darwin") symbol = "/"
    else if (require("node:os").platform() === 'win32') symbol = "\\"
    link = link.split(symbol).filter(e => e.length > 0)
    return link[link.length - 1]
}