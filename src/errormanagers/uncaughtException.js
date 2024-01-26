module.exports = async (functionCallback, err) =>{
    let check = require('../utils/first_checks')()
    
    if(check) require('../utils/treat_error')(functionCallback, err, check, 'uncaughtException')
}