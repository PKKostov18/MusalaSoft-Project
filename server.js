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
require('dotenv').config()
//let user_registration_router = require('./routes/user-register')

//const {config} = require('./config/database-config')

require('./config/passport-config')(passport)

app.use(morgan('dev'))
app.use(cookieParser())


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//app.use('/', user_registration_router)
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


app.post('/contact', (req, res) => {

  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
  });

  let mailOptions = {
      from: req.body.email,
      to: 'PKKostov18@codingburgas.bg',
      subject: req.body.subject,
      html: `
				<h1> ${req.body.name} sent a message </h1>
				<p> ${req.body.message} </p>
			`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) 
      {
          return console.log(error.message)
      }
      console.log('success');
      res.redirect('/contact')
  });
}) 


/*(async () =>{
  console.log('Trying to connect');
  let connection = await sql.connect(config);
  console.log('Connected');
})()
*/

require('./routes/routes.js')(app, passport, nodemailer);

app.listen(3000)