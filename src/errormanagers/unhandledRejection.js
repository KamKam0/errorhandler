module.exports = async (err, logError, createFile, functionCallback) =>{
    let check = require('../utils/first_checks.js')()

    if(check) require('../utils/treat_error')(err, logError, createFile, functionCallback, check, 'unhandledRejection')
    
}