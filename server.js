if (process.env.NODE_ENV !== 'production') 
{
  require('dotenv').config()
}

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
let job_list_router = require('./utils/job-list');
let apply_list_router = require('./utils/candidates-list');

require('dotenv').config()
require('./config/passport-config')(passport)

app.use(morgan('dev'))
app.use(cookieParser())


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

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
app.use('/', job_list_router);
app.use('/', apply_list_router);

require('./routes/routes.js')(app, passport, nodemailer);

app.listen(3000)