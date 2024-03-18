let name = require("./get_name")()
const fs = require("node:fs")
const os = require('node:os')

let osSymbol = '/'
if (os.platform() === 'win32') {
    osSymbol = "\\"
}

let basePath = `${process.cwd()}${osSymbol}${name}_Erreurs${osSymbol}`

module.exports = () => {
    let number;

    if(!fs.readdirSync(process.cwd()).includes(`${name}_Erreurs`)){
        fs.mkdirSync(basePath.slice(0, -1))
        fs.writeFileSync(`${basePath}db_errors.json`, JSON.stringify({count: 0}, null, 4))
        number = 0
    }
    if(!fs.readdirSync(basePath.slice(0, -1)).includes("db_errors.json")) {
        fs.writeFileSync(`${basePath}db_errors.json`, JSON.stringify({count: 0}, null, 4))
        number = 0
    }

    let acountFolder = require(`${basePath}db_errors.json`)

    number = acountFolder.count

    if(Number(number) >= 100) {
        console.log('Too many errors, safety killswitch activated')
        process.exit()
    }
    
    number++
    acountFolder.count = number
    fs.writeFileSync(`${basePath}db_errors.json`, JSON.stringify(acountFolder, null, 4))
    acountFolder[`error_${number}`] = Date.now()
    fs.writeFileSync(`${basePath}db_errors.json`, JSON.stringify(acountFolder, null, 4))
    
    let errors = Object.entries(acountFolder).reverse()
    
    if(errors.length > 7){
        errors.splice(5, Object.entries(acountFolder).length - 6)

        errors.shift()
        errors = errors.filter(e => e[0].startsWith("error_")).map(e => (-(e[1] - Date.now()))/1000).sort((a,b) => b - a)
        errors = errors.reduce((a, b) => a += b, 0) / errors.length
        
        if(errors < 5){
            console.log("Trop d'erreurs ont été constatées en moins de 5 secondes, kill swicth a été activé")
            process.exit()
        }
    } 

    return number

}