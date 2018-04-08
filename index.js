const path           = require('path')
const express        = require('express')
const morgan         = require('morgan')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const session        = require('express-session')
const passport       = require('passport')
const mongoose       = require('mongoose')
const app = express()

//Basic Auth
//passport.use(require('./src/auth/basic'))
//app.get('*', passport.authenticate('basic', {session: false}))
require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '*&IDSJIDJIS&', resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

require('./src/index')(app, passport)

//Dependendo da versão mongodb usar-> , { useMongoClient: true}
mongoose.connect('mongodb://127.0.0.1:27017/auth')
mongoose.Promise = global.Promise
app.listen(9000, () =>{
    console.log('express iniciou');
})