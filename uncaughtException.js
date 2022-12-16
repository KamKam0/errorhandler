module.exports = async (prog, err) =>{
    if(err.code === "ECONNREFUSED" && err.syscall === "connect" && !isNaN(err.errno)){
        console.log("SQL fatal error, safety killswitch activated")
        process.exit()
    }

    if((err.code === "ECONNRESET" && err.name === "Error"  && err.syscall === "read") || err.code === "PROTOCOL_CONNECTION_LOST") return

    let check = require("./Utils/first_checks")(prog.name, err, true)
    
    if(check) require("./Utils/treat_error")(prog, err, check, "uncaughtException")
}