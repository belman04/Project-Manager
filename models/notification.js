const db = require('../config/db'); // imports the database connection from config/db.js

const getNotifications = (user_id, callback) => { // function to get user's notifications
    const select_query = 'SELECT * FROM notification WHERE fk_user_id = ? ORDER BY created_at DESC';
    db.query(select_query, [user_id], callback);
};

const createNotification = (user_id, project_id, task_id, message, n_type, callback) => { // function to create a new notification
    const insert_task = 'INSERT INTO notification (fk_user_id, fk_project_id, fk_task_id, message, n_type) VALUES (?, ?, ?, ?, ?)';
    db.query(insert_task, [user_id, project_id, task_id, message, n_type], callback); 
};


module.exports = { getNotifications , createNotification}; // exports the queries to be used in other files
