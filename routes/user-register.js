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

router.post('/register', async function(req, res, next) {
    try {
        const pool = await sql.connect   (config);
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const result = await pool.request()
            .input("Username", sql.NVarChar, req.body.name)
            .input("Email", sql.NVarChar, req.body.email)
            .input("Password", sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Users (Username, Email, Password)
                VALUES (@Username, @Email, @Password)
            `)
        console.log(result)

    } catch (err) {
        console.log(err);
    }

    res.redirect("/register");
});

module.exports = router;