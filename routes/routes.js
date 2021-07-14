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
          failureRedirect : '/login', 
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
		res.render('register.ejs', { message: req.flash('registerMessage') });
	});

	app.post('/register', async function(req, res, next) {
		try {
			const pool = await sql.connect(request);
			const hashedPassword = bcrypt.hashSync(req.body.password, null, null)
	
			const result = await pool.request()
			.input('Username', sql.NVarChar(50), req.body.username)
			.input('Email', sql.NVarChar(50), req.body.email)
			.input('Password', sql.VarChar(80), hashedPassword)
			.query(`
				INSERT INTO Users (Username, Email, Password) 
				VALUES (@Username, @Email, @Password)
			`)
			console.log(result)
	
		} catch (err) {
			console.log(err);
			req.flash('registerMessage', 'The username already exist!')
			res.redirect("/register");
		}	

		req.flash('registerMessage', 'Successfully create an account!')
		res.redirect("/register");
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

	app.post('/postJob', async function(req, res, next) {
		try {
			const pool = await sql.connect(request);
	
			const result = await pool.request()
			.input('JobTitle', sql.NVarChar(50), req.body.jobTitle)
			.input('CompanyName', sql.NVarChar(50), req.body.companyName)
			.input('City', sql.NVarChar(50), req.body.city)
			.input('WorkTime', sql.NVarChar(50), req.body.workTime)
			.input('Description', sql.NVarChar(100), req.body.description)
			.input('Salary', sql.Decimal(18, 0), req.body.salary)
			.query(`
				INSERT INTO JobApplication (JobTitle, CompanyName, City, WorkTime, Description, Salary) 
				VALUES (@JobTitle, @CompanyName, @City, @WorkTime, @Description, @Salary)
			`)
			console.log(result)
	
		} catch (err) {
			console.log(err);
		}
		res.redirect("/postJob");
	});

	app.get('/contact', function(req, res) {
		res.render('contact.ejs', { message: req.flash('contactMessage')})
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