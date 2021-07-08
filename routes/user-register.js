const express = require('express');
const {config} = require('../config/database-config');
const sql = require('mssql/msnodesqlv8');
const crypto = require('crypto');
const bcrypt = require('bcrypt')

let router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/register', function (req, res)
{
    res.render('register.ejs');
});

const sha256 = crypto.createHash('sha256');

router.post('/register', async function(req, res, next) {
    try {
        const pool = await sql.connect   (config);
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const result = await pool.request()
            .input("FirstName", sql.NVarChar, req.body.FirstName)
            .input("LastName", sql.NVarChar, req.body.LastName)
            .input("Email", sql.NVarChar, req.body.Email)
            .input("Password", sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Users (FirstName, LastName, Email, Password)
                VALUES (@FirstName, @LastName, @Email, @Password)
            `)
        console.log(result)

    } catch (err) {
        console.log(err);
    }

    res.redirect("/register");
});

module.exports = router;