module.exports = async (prog, err) =>{
    if(err.code === "ECONNREFUSED" && err.syscall === "connect" && !isNaN(err.errno)){
        console.log("SQL fatal error, safety killswitch activated")
        process.exit()
    }

    if(err.code === "PROTOCOL_CONNECTION_LOST"){
        prog.database_state = "waiting"
        const mysql = require("mysql2")
        prog.sql = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            database: `${prog.name}`
        })
        prog.database_state = "stable"
        return
    }
    if(err.code === "ECONNRESET" && err.name === "Error"  && err.syscall === "read") return
    

    let check = require("./Utils/first_checks")(prog.name, err, true)

    if(check) require("./Utils/treat_error")(prog, err, check, "uncaughtExceptionMonitor")
    
}