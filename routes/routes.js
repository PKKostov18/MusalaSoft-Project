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

	app.get('/login', checkNotAuthenticated, function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post("/login", async function(req, res) {
		try {
			let loggedUserInfo = {};
			console.log(req.body);
			const pool = await sql.connect(dbconfig);
			const result = await pool
				.request()
				.input("Username", sql.NVarChar, req.body.username)
				.input("IncommingPassword", sql.NVarChar, req.body.password)
				.output("VerifiedId", sql.Int)
				.output("UsernameOut", sql.VarChar)
				.execute("LoginUser");
			loggedUserInfo.id = result.output.VerifiedId;
			loggedUserInfo.username = result.output.UsernameOut;
			console.log(loggedUserInfo);
		} catch (e) {
			console.log(e);
			if (e instanceof sql.RequestError) {
				return displayError(
					res, "A database error has occured! Please try again later."
				);
			} 
		}
		res.redirect("/homepageAfterLogin");
	});
    app.get('/homepageBeforeLogin', checkNotAuthenticated, function(req, res) {
		res.render('homepageBeforeLogin.ejs'); 
	});

	app.get('/register', checkNotAuthenticated, function(req, res) {
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
    
	app.get('/homepageAfterLogin', function(req, res) {
		res.render('homepageAfterLogin.ejs', {
			user : req.user 
		});
	});

	app.get('/jobs', checkAuthenticated, function(req, res) {
		res.render('jobs.ejs')
	});

	
	app.get('/profile', checkAuthenticated, function(req, res) {
		res.render('profile.ejs')
	});

	app.get('/postJob', checkAuthenticated, function(req, res) {
		res.render('postJob.ejs');
	});

	app.post('/postJob', async function(req, res, next) {
		try {
			const pool = await sql.connect(request);
	
			const result = await pool.request()
			.input('JobTitle', sql.NVarChar(50), req.body.jobTitle)
			.input('CompanyName', sql.NVarChar(50), req.body.companyName)
			.input('Category', sql.NVarChar(50), req.body.category)
			.input('City', sql.NVarChar(50), req.body.city)
			.input('WorkTime', sql.NVarChar(50), req.body.workTime)
			.input('Description', sql.NVarChar(100), req.body.description)
			.input('Salary', sql.Decimal(18, 0), req.body.salary)
			.query(`
				INSERT INTO JobApplication (JobTitle, CompanyName, Category, City, WorkTime, Description, Salary) 
				VALUES (@JobTitle, @CompanyName, @Category, @City, @WorkTime, @Description, @Salary)
			`)
			console.log(result)
	
		} catch (err) {
			console.log(err);
		}
		res.redirect("/postJob");
	});

	app.get('/contact', checkNotAuthenticated, function(req, res) {
		res.render('contact.ejs', { message: req.flash('contactMessage')})
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

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