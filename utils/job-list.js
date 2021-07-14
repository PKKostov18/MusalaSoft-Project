const express = require('express');
const {config} = require('../config/database-config');
const sql = require('mssql/msnodesqlv8');

let router = express.Router();

(async () => {
    try{
        let connection = await sql.connect(config);
        const users_result = await connection.request().query(`SELECT * FROM JobApplication`);

        router.get('/jobs', function (req, res)
        {
            res.render('jobs', {userList: users_result.recordset});
        });
    }
    catch(err)
    {
        console.log(err);
    }
})()

module.exports = router;