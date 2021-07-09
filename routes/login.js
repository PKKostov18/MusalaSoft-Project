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

router.post('/login', async function(req, res) {
    try {
        const pool = await sql.connect   (config)
        
        const result = await pool.request()
        .input("Email", sql.NVarChar, req.body.email)
        .query(`
            SELECT Password FROM Users WHERE Email = @Email
        `)

        const initializePassport = require('./config/passport-config')
        initializePassport(
            passport,
            email => result.find(user => user.email === email),
            id => result.find(user => user.id === id)
        ) 
        
    } catch (err) {
        console.log(err)
    }

    res.redirect("/user")
});

module.exports = router