module.exports = async (prog, err) =>{
    let check = require("./Utils/first_checks")(prog.name, err, true)

    if(check) require("./Utils/treat_error")(prog, err, check, "rejectionHandled")
}