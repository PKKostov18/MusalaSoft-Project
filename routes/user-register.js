const express = require('express');
const {config} = require('../config/database-config');
const sql = require('mssql/msnodesqlv8');
const crypto = require('crypto');

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
        const passHash = sha256.update(req.body.password).digest('hex');
        
        const result = await pool.request()
            .input("first_name", sql.NVarChar, req.body.first_name)
            .input("last_name", sql.NVarChar, req.body.last_name)
            .input("email", sql.NVarChar, req.body.email)
            .input("password", sql.NVarChar, passHash)
            .query(`
                INSERT INTO Users (first_name, last_name,age, email, password)
                VALUES (@first_name, @last_name, @age,  @email, @password)
            `)
        console.log(result)

    } catch (err) {
        console.log(err);
    }

    res.redirect("/register");
});

module.exports = router;