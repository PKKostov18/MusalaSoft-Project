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
        'local-login',
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
                if (!rows.length) 
                {
                    return done(null, false, req.flash('loginMessage', 'No user found.'))
                }

                var newUserMysql = 
                {
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, null, null)  
                };

                bcrypt.compare(newUserMysql.password ,rows.recordset[0].password, function(err, res) 
                {
                    console.log( res )
                    if( res == null )
                    {
                      return done(null, false, req.flash('loginMessage', 'Wrong password.'))
                    }
                    else
                    {
                      return done(null, rows.recordset[0])
                    }
                })

                if (!bcrypt.compareSync(newUserMysql.password, rows.recordset[0].password))
                {
                    return done(null, false, req.flash('loginMessage', 'Wrong password.'))
                }
            })
        })
    )
}