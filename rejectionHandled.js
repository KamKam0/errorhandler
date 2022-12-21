module.exports = async (prog, err) =>{
    let check = require("./Utils/first_checks")()

    if(check) require("./Utils/treat_error")(prog, err, check, "rejectionHandled")
}