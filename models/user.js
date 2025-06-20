const db = require('../config/db'); // imports the database connection from config/db.js

const createUser = (first_name, last_name, email, password, callback) => { // function to create a new user
    const insert_query = 'INSERT INTO app_user (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
    db.query(insert_query, [first_name, last_name, email, password], callback);
};

const getUserByEmail = (email, callback) => { // function to get a user by email
    const select_query = 'SELECT * FROM app_user WHERE email = ?';
    db.query(select_query, [email], callback);
}

module.exports = { createUser, getUserByEmail }; // exports the queries to be used in other files