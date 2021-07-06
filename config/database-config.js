const config = {
    database: "Job Posting",
    server: "localhost",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        // for Azure
        encrypt: false,
        // change to true for local dev / self-signed certs
        trustServerCertificate: false
    }
};

module.exports.config = config;