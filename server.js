if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const sql = require('mssql/msnodesqlv8');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
let user_registration_router = require('./routes/user-register')

const initializePassport = require('./config/passport-config')
initializePassport(
  passport,
  email => result.find(user => user.email === email),
  id => result.find(user => user.id === id)
)

const {config} = require('./config/database-config')

app.use('/', user_registration_router)
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

(async () =>{
  console.log('Trying to connect');
  let connection = await sql.connect(config);
  console.log('Connected');
})()

app.get('/', (req, res) => {
  res.render('homepageBeforeLogin.ejs')
})

app.get('/', checkAuthenticated, (req, res) => {
  res.render('homepageAfterLogin.ejs', {name: req.body.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)