module.exports = (prog, err, number, type) => {
    let name = require("./get_name")()
    const fs = require("fs")

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
        if(prog.creator && typeof prog.SendMessage === "function") prog.SendMessage(prog.creator.channel_id, {content: "```" + c + "```"})
    }else if(prog.creator && typeof prog.SendMessage === "function") prog.SendMessage(prog.creator.channel_id, {content: "```" + err + "```"})
}