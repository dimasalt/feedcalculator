import mysql from 'mysql2';

const pool = mysql.createPool({
        host:process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password : '',
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0      
});

const promisePool = pool.promise();
//connection.connect();

//module.exports = pool;

export default promisePool;