const db = require('../config/db'); // imports the database connection from config/db.js

const getNotifications = (user_id, callback) => { // function to get user's notifications
    const select_query = 'SELECT * FROM notification WHERE fk_user_id = ? ORDER BY created_at DESC';
    db.query(select_query, [user_id], callback);
};

const createNotification = (user_id, project_id, task_id, message, n_type, callback) => { // function to create a new notification
    const insert_task = 'INSERT INTO notification (fk_user_id, fk_project_id, fk_task_id, message, n_type) VALUES (?, ?, ?, ?, ?)';
    db.query(insert_task, [user_id, project_id, task_id, message, n_type], callback); 
};

const markNotificationAsRead = (notification_id, callback) => { // function to mark a notification as read
    const update_is_read = 'UPDATE notification SET is_read = 1 WHERE notification_id = ?';
    db.query(update_is_read, [notification_id], callback);
};

const markAllNotificationsAsRead = (user_id, callback) => { // function to mark all notifications as read
    const update_all_read = 'UPDATE notification SET is_read = 1 WHERE fk_user_id = ?';
    db.query(update_all_read, [user_id], callback);
};

module.exports = { getNotifications , createNotification , markNotificationAsRead , markAllNotificationsAsRead}; // exports the queries to be used in other files