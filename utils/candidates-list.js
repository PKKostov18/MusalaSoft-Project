const express = require('express');
const {config} = require('../config/database-config');
const sql = require('mssql/msnodesqlv8');

let router = express.Router();

(async () => {
    try{
        let connection = await sql.connect(config);
        const users_result = await connection.request().query(`SELECT * FROM ApplyJob`);

        router.get('/candidates', function (req, res)
        {
            res.render('candidates.ejs', {userList: users_result.recordset});
        });
    }
    catch(err)
    {
        console.log(err);
    }
})()

module.exports = router;