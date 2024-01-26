module.exports = async (functionCallback, err) =>{
    let check = require('../utils/first_checks.js')()

    if(check) require('../utils/treat_error')(functionCallback, err, check, 'unhandledRejection')
    
}