const mysql = require('mysql2');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
});

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(new Error(err));
            connection.query(sql, params, (err, result) => {
                connection.release();
                if (err) reject(new Error(err));
                resolve(result);
            });
        });
    });
};
pool.getConnection((error, connection) => {
    console.log('MySQL connected');
    if (error) {
        if (connection) connection.release();
        return;
    }
});

module.exports = {
    pool: pool,
    query: query,
};
