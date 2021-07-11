const { session } = require("passport");

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

	app.get('/register', function(req, res) {
		res.render('register.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/homepageAfterLogin', 
		failureRedirect : '/register', 
		failureFlash : true
	}));

    
	app.get('/homepageAfterLogin', isLoggedIn, function(req, res) {
		res.render('homepageAfterLogin.ejs', {
			user : req.user 
		});
	});

	app.get('/contact', isLoggedIn, function(req, res) {
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