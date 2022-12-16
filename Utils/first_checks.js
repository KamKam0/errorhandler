module.exports = (err, state) => {
    let name = require("./get_name")()
    
    if(!state){

        if((err.code === "ECONNREFUSED" && err.syscall === "connect" && !isNaN(err.errno)) || (err.code === "PROTOCOL_CONNECTION_LOST")) return false
    
        if(err.code === "ECONNRESET" && err.name === "Error"  && err.syscall === "read") return false
    }

    const fs = require("fs")

    let number;

    if(!fs.readdirSync(process.cwd()).includes(`${name}_Erreurs`)){
        fs.mkdirSync(`${process.cwd()}/${name}_Erreurs`)
        fs.writeFileSync(`${process.cwd()}/${name}_Erreurs/db_errors.json`, JSON.stringify({count: 0}, null, 4))
        number = 0
    }
    if(!fs.readdirSync(`${process.cwd()}/${name}_Erreurs`).includes("db_errors.json")) {
        fs.writeFileSync(`${process.cwd()}/${name}_Erreurs/db_errors.json`, JSON.stringify({count: 0}, null, 4))
        number = 0
    }

    let count_db = require(`${process.cwd()}/${name}_Erreurs/db_errors.json`)

    number = count_db.count

    if(Number(number) >= 100) {
        console.log('Too many errors, safety killswitch activated')
        process.exit()
    }
    
    number++
    count_db.count = number
    fs.writeFileSync(`${process.cwd()}/${name}_Erreurs/db_errors.json`, JSON.stringify(count_db, null, 4))
    count_db[`error_${number}`] = Date.now()
    fs.writeFileSync(`${process.cwd()}/${name}_Erreurs/db_errors.json`, JSON.stringify(count_db, null, 4))
    
    let errors = Object.entries(count_db).reverse()
    
    if(errors.length > 7){
        errors.splice(5, Object.entries(count_db).length - 6)

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