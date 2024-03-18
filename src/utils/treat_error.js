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

module.exports = (functionCallback, err, number, type) => {
    if(!err || !number || !type) return
    console.log(err)
    let minorType = typeConverter[type.toLowerCase()]
    if(err.stack){
        let c = err.stack.toString()
        if(err.code) fs.writeFile(`${basePath}[error] - ${number} - ${err.code.toString()} - ${minorType}.txt`, (c), err=>{})
        else fs.writeFile(`${basePath}[error] - ${number} - ${minorType}.txt`, (c), err=>{})
        console.log(`Un rapport d'erreur a été émit - ${type} - Erreur n°${number}`)
        if(functionCallback && typeof functionCallback === "function"){
            try{
                functionCallback(c)
            }catch(err){
                console.log(err)
            }
        }
    }else if(functionCallback && typeof functionCallback === "function"){
        try{
            functionCallback(err)
        }catch(err){
            console.log(err)
        }
    }
}