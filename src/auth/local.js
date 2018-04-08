
const LocalStrategy  = require('passport-local')
const User =  require('./../model/user')
module.exports = (passport) => {
    passport.serializeUser((user, call)=>{
        return call(null,user._id)
    })
    passport.deserializeUser((id, call) =>{
        User   
            .findById(id)
            .then(user => call(null,user))
            .catch(err => call(err,{}))
    })

    passport.use('local-sigunp', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,username,password,call){
        User
            .findOne({username: username})
            .then((userExiste)=>{
                if(!userExiste) {
                    let user = new User(req.body)
                    user.password = user.genHash(user.password)
                    user
                        .save()
                        .then((user)=>{
                            return call(null, user)
                        })
                        .catch((error)=>{
                            console.log(error)
                            return
                        })
                }
            })
            .catch((err)=>{
                return call(err, false)
            })
         }
    ))

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
    },
            function(req, username, password, call) {
                User
                    .findOne({ username })
                    .then((user) => {
                        
                        if (!user) {
                            return call(null, false)
                        }

                        user.validate(password, (err, result) => {
                            if(!result || err) {
                                return call(null, false)                            
                            }

                            return call(null, user)
                        })
                    })
            }
    ))
}