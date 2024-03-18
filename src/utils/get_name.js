const os = require('node:os')

let osSymbol = '/'
if (os.platform() === 'win32') {
    osSymbol = "\\"
}

module.exports = () => {
    let link = process.cwd()
    link = link.split(osSymbol).filter(e => e.length > 0)
    return link[link.length - 1]
}