
const BasicStrategy  = require('passport-http').BasicStrategy
module.exports = new BasicStrategy(
    function(username, password, call){
        if(username == 'admin' && password == 'admin'){
            return call(null,true);
        }else{
            return call(null,false)
        }
    }
)