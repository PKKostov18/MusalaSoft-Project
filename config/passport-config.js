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
        'insert-jobs',
        new LocalStrategy(
        {
            jobTitleField : 'jobTitle',
            companyNameField : 'companyName',
            cityField : 'city',
            workTimeField : 'workTime',
            descriptionField : 'description',
            salaryField : 'salary',
            passReqToCallback : true 
        },
        function(req, jobTitle, password, done) 
        {
            request.query("SELECT * FROM JobApplication WHERE JobTitle ='" + jobTitle + "'", function(err, rows) 
            {
                if (err)
                {
                    return done(err);
                }

                console.log(jobTitle)

                var newJobMysql = 
                {
                    jobTitle: req.body.jobTitle,
                    companyName: req.body.companyName,
                    city: req.body.city,
                    workTime: req.body.workTime,
                    description: req.body.description,
                    salary: req.body.salary
                };

                console.log(newJobMysql)

                request
                .input('JopTitle', sql.NVarChar(50), newJobMysql.jobTitle)
                .input('CompanyName', sql.NVarChar(50), newJobMysql.companyName)
                .input('City', sql.NVarChar(50), newJobMysql.city)
                .input('WorkTime', sql.NVarChar(50), newJobMysql.workTime)
                .input('Description', sql.NVarChar(100), newJobMysql.description)
                .input('Salary', sql.Decimal(18, 0), newJobMysql.salary)
                .query('INSERT INTO JobApplication (JopTitle, CompanyName, City, WorkTime, Description, Salary) VALUES (@JopTitle, @CompanyName, @City, @WorkTime, @Description, @Salary); SELECT SCOPE_IDENTITY() AS Id;', function(err, rows) 
                {
                    console.log(rows)
                    newJobMysql.id = rows.recordset[0].id
                    return done(null, newJobMysql)
                });
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
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, null, null)  
                };

                bcrypt.compare(newUserMysql.password ,rows.recordset[0].password, function(err, res) 
                {
                    console.log( res )
                    if( res == null )
                    {
                      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                    }
                    else
                    {
                      return done(null, rows.recordset[0])
                    }
                })

                if (!bcrypt.compareSync(newUserMysql.password, rows.recordset[0].password))
                {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                }
            })
        })
    )
}