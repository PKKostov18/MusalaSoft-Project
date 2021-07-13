const { session } = require("passport");
var dbconfig = require('../config/database-config')
var sql = require('mssql/msnodesqlv8')
var bcrypt = require('bcrypt-nodejs')

sql.connect(dbconfig.config, function(err) 
{
    if (err)
    {
        throw err
    } 
    else
    {
        console.log('connected')
    }
})

var request = new sql.Request(dbconfig.connection)

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('homepageBeforeLogin.ejs'); 
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/homepageAfterLogin', 
          failureRedirect : '/homepageBeforeLogin', 
          failureFlash : true 
	}),
      function(req, res) {
          console.log("hello");

          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
      res.redirect('/');
    });

    app.get('/homepageBeforeLogin', function(req, res) {
		res.render('homepageBeforeLogin.ejs'); 
	});

	app.get('/register', function(req, res) {
		res.render('register.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/register', function(req, res, done){
		// register user (insert into db)
		/*
		let username = req.body.username;
		let email = req.body.email;
		let password = req.body.password;
		*/
		var newUserMysql = 
        {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, null, null)  
        };

	 	request
	 	.input('Username', sql.NVarChar(50), newUserMysql.username)
	 	.input('Email', sql.NVarChar(50), newUserMysql.email)
	 	.input('Password', sql.VarChar(80), newUserMysql.password)
	 	.query('INSERT INTO Users (Username, Email, Password) values (@Username, @Email, @Password); SELECT SCOPE_IDENTITY() AS Id;', function(err, rows) 
	 	{
	 	  console.log(rows)
	 	  newUserMysql.id = rows.recordset[0].id
	 	  return done(null, newUserMysql)

	   });
	   res.redirect('/register')
	   alert("Successfully create an account!");
	});
    
	app.get('/homepageAfterLogin', isLoggedIn, function(req, res) {
		res.render('homepageAfterLogin.ejs', {
			user : req.user 
		});
	});

	app.get('/jobs', isLoggedIn, function(req, res) {
		res.render('jobs.ejs')
	});

	app.get('/profile', function(req, res) {
		res.render('profile.ejs')
	});

	app.get('/postJob', function(req, res) {
		res.render('postJob.ejs');
	});

	app.post('/postJob', passport.authenticate('insert-jobs', {
		successRedirect : '/homepageBeforeLogin', 
		failureRedirect : '/postJob', 
		failureFlash : true
	}));

	app.get('/contact', function(req, res) {
		res.render('contact.ejs')
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	
	res.redirect('/login');
}