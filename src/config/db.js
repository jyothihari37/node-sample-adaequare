const sql = require('mssql');

const config = {
    user: 'admin',
    password: 'MIJZvgUkxPpUa9xGfEV0',
    server: 'sample-nodejs-db.cm0cbncfyes6.us-east-2.rds.amazonaws.com', // or IP address of your server
    database: 'sample_nodejs_db',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false
    },
    debug: true
};

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports =
{
    sql,
    pool
};
