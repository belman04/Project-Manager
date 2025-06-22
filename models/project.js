const db = require('../config/db'); // imports the database connection from config/db.js

const getProjectsByUser = (user_id, callback) => { // function to get user's projects
    const select_query = 'SELECT p.*, up.is_admin FROM project p LEFT JOIN user_project up ON p.project_id = up.fk_project_id WHERE up.fk_user_id = ?';
    db.query(select_query, [user_id], callback);
};

module.exports = { getProjectsByUser }; // exports the queries to be used in other files