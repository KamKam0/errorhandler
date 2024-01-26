const os = require('node:os')

module.exports = () => {
    let link = process.cwd()
    let symbol;
    if(os.platform() === "darwin") symbol = "/"
    else if (os.platform() === 'win32') symbol = "\\"
    link = link.split(symbol).filter(e => e.length > 0)
    return link[link.length - 1]
}