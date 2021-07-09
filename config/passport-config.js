var LocalStrategy = require('passport-local').Strategy

var bcrypt = require('bcrypt')
var dbconfig = require('../config/database-config')

var sql = require('mssql/msnodesqlv8')
sql.connect(dbconfig.config, function(err) 
{
    if (err)
    {
        throw err
    } else
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
        request.query("select * from Users where id =" + id, function(err,rows)
        {
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
            request.query("SELECT * FROM Users WHERE username ='" + username + "'", function(err, rows) 
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
                        username: username,
                        password: bcrypt.hashSync(username, null, null)  
                    };

                    request
                    .input('Username', sql.NVarChar(50), newUserMysql.username)
                    .input('Password', sql.VarChar(100), newUserMysql.password)
                    .query('INSERT INTO Users (username, password) values (@username, @password); SELECT SCOPE_IDENTITY() AS id;', function(err, rows) 
                    {
                        newUserMysql.id = rows[0].id;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) 
        { 
            request.query("SELECT * FROM Users WHERE username ='"+username+"'", function(err, rows)
            {
                if (err)
                {
                    return done(err);
                }
                if (!rows.length) 
                {
                    return done(null, false, req.flash('loginMessage', 'No user found.'))
                }

                bcrypt.compare('password', rows[0].password, function(err, res) 
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