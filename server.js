if (process.env.NODE_ENV !== 'production') 
{
  require('dotenv').config()
}

//const sql = require('mssql/msnodesqlv8');
const express = require('express')
const app = express()
var morgan = require('morgan')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var cookieParser  = require('cookie-parser')
const nodemailer = require('nodemailer')
let mailer = require('./utils/mailer');
//let jobPost = require('./routes/jobPost')
require('dotenv').config()

//const {config} = require('./config/database-config')

require('./config/passport-config')(passport)

app.use(morgan('dev'))
app.use(cookieParser())


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//app.use('/', jobPost)
app.set('view engine', 'ejs') 

app.use(session(
{
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use('/', mailer);

/*
(async () =>{
  console.log('Trying to connect');
  let connection = await sql.connect(config);
  console.log('Connected');
})()
*/


require('./routes/routes.js')(app, passport, nodemailer);

app.listen(3000)