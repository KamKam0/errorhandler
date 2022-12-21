module.exports = (SendMessage, err, number, type) => {
    let name = require("./get_name")()
    const fs = require("fs")
    console.log(err)
    let minor_type = {
        uncaughtexceptionmonitor: "UEM",
        unhandledrejection: "UR",
        uncaughtexception: "UE",
        rejectionhandled: "RH"
    }[type.toLowerCase()]
    if(err.stack){
        let c = err.stack.toString()
        if(err.code) fs.writeFile(`${process.cwd()}/${name}_Erreurs/[error] - ${number} - ${err.code.toString()} - ${minor_type}.txt`, (c), err=>{})
        else fs.writeFile(`${process.cwd()}/${name}_Erreurs/[error] - ${number} - ${minor_type}.txt`, (c), err=>{})
        console.log(`Un rapport d'erreur a été émit - ${type} - Erreur n°${number}`)
        if(SendMessage && typeof SendMessage === "function"){
            try{
                SendMessage(c)
            }catch(err){
                console.log(err)
            }
        }
    }else if(SendMessage && typeof SendMessage === "function"){
        try{
            SendMessage(err)
        }catch(err){
            console.log(err)
        }
    }
}