var LocalStrategy = require('passport-local').Strategy

var bcrypt = require('bcrypt-nodejs')
var dbconfig = require('../config/database-config')

var sql = require('mssql/msnodesqlv8')
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

module.exports = function(passport) 
{
    passport.serializeUser(function(user, done) 
    {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) 
    {
        console.log('USER ID : ' + id);
        request.query("select * from Users where Id =" + id, function(err, rows)
        {
            console.log('RESULT : ' + rows);
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) 
        {
            request.query("SELECT * FROM Users WHERE Username ='" + username + "'", function(err, rows) 
            {
                if (err)
                {
                    return done(err);
                }
                if (rows.length) 
                {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'))
                } 
                else 
                {
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
                      newUserMysql.id = rows.recordset[0].Id
                      return done(null, newUserMysql)
                  });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy(
        {
            usernameField : 'Username',
            passwordField : 'Password',
            passReqToCallback : true
        },
        function(req, username, password, done) 
        { 
            request.query("SELECT * FROM Users WHERE Username ='" + username + "'", function(err, rows)
            {
                if (err)
                {
                    return done(err);
                }
                if (!rows.length) 
                {
                    return done(null, false, req.flash('loginMessage', 'No user found.'))
                }

                bcrypt.compare('Password', rows[0].password, function(err, res) 
                {
                    console.log( res )
                    if( res == null )
                    {
                      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                    }
                    else
                    {
                      return done(null, rows[0])
                    }
                })

                if (!bcrypt.compareSync(password, rows[0].password))
                {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                }
            })
        })
    )
}