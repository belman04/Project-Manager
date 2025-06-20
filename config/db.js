const mysql = require('mysql2'); // to import mysql2, a MySQL client for Node.js
require('dotenv').config(); // to import dotenv, for environment variables

// connection pool to the MySQL database 
const connection = mysql.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0 
});

module.exports = connection; // module.exports allows the connection to be used in other files