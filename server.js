if (process.env.NODE_ENV !== 'production') 
{
  require('dotenv').config()
}

//const sql = require('mssql/msnodesqlv8');
const express = require('express')
const app = express()
var morgan = require('morgan')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var cookieParser  = require('cookie-parser')
//let user_registration_router = require('./routes/user-register')

//const {config} = require('./config/database-config')

require('./config/passport-config')(passport)

app.use(morgan('dev'))
app.use(cookieParser())

//app.use('/', user_registration_router)
app.set('view engine', 'ejs') 

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session(
{
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))

/*(async () =>{
  console.log('Trying to connect');
  let connection = await sql.connect(config);
  console.log('Connected');
})()
*/

require('./routes/routes')(app, passport);

app.listen(3000)