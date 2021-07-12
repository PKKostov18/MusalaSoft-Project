const config = {

    connection: {
        database: "MusalaSoft-Internship",
        server: "(DESKTOP-62QDEH8\\SQLEXPRESS", /*DESKTOP-62QDEH8\\SQLEXPRESS*/
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: false
    },
    users_table: 'Users',
    database: "MusalaSoft-Internship",
    server: "DESKTOP-62QDEH8\\SQLEXPRESS", /*(localdb)\\MSSQLLocalDB*/ 
};

module.exports.config = config;