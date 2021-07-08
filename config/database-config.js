const config = {
    database: "MusalaSoft-Internship",
    server: "localhost",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: false
    }
};

module.exports.config = config;