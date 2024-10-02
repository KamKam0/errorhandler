let name = require("./get_name")()
const fs = require("node:fs")
const os = require('node:os')
const typeConverter = {
    uncaughtexceptionmonitor: "UEM",
    unhandledrejection: "UR",
    uncaughtexception: "UE",
    rejectionhandled: "RH"
}

let osSymbol = '/'
if (os.platform() === 'win32') {
    osSymbol = "\\"
}

let basePath = `${process.cwd()}${osSymbol}${name}_Erreurs${osSymbol}`

module.exports = (err, logError, createFile, functionCallback, number, type) => {
    if(!err || !number || !type) return
    if (logError) {
        console.log(err)
    }

    let minorType = typeConverter[type.toLowerCase()]
    let errorStringified = `Error name: ${err.name}\n\nError message: ${err.message}\n\nError stack: ${err.stack?.toString()}`

    if (createFile) {
        if(err.code) fs.writeFile(`${basePath}[error] - ${number} - ${err.code.toString()} - ${minorType}.txt`, (errorStringified), err=>{})
        else fs.writeFile(`${basePath}[error] - ${number} - ${minorType}.txt`, (errorStringified), err=>{})
        console.log(`Un rapport d'erreur a été émit - ${type} - Erreur n°${number}`)
    }

    if(functionCallback && typeof functionCallback === "function"){
        try{
            functionCallback(err)
        }catch(err){
            console.log(err)
        }
    }
}