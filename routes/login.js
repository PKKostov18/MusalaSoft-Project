const express = require('express')
const {config} = require('../config/database-config')
const sql = require('mssql/msnodesqlv8')

let router = express.Router()

router.use(express.json())

router.use(express.urlencoded({ extended: true }))

router.get('/login', function (req, res)
{
    res.render('login')
});

router.post('/login', async function(req, res, next) {
    try {
        const pool = await sql.connect   (config)
        
        const result = await pool.request()
        .input("Email", sql.NVarChar, req.body.email)
        .query(`
            SELECT Password FROM Users WHERE Email = @Email
        `)
        
        //Checks if the admin password matches the admin password in the database

        if(result.recordset[0].password == req.body.password)
        {
            req.session.isAdmin = true
        } else {

            req.session.isAdmin = false
        }  
        
    } catch (err) {
        console.log(err)
    }

    res.redirect("/user")
});

module.exports = router