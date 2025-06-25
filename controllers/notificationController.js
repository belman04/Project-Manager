const { getNotifications , markNotificationAsRead , markAllNotificationsAsRead} = require('../models/notification'); // imports notification model functions

const notificationList = (req, res) => { // function to list notifications from a user
    const user_id = req.user.id; // getting the user id from the request

    getNotifications(user_id, (err, results) => { // calling the model function 
        if (err) return res.status(500).json({ msg: 'Error in the database'}); // if there is an error send 500 status (Internal Server Error)

        if (results.length === 0) return res.status(204).json({ msg: 'No notifications found' }); // if there are no notifications send 204 status (No Content)
        res.json(results);
    });
};

const markAsRead = (req, res) => { // function to mark a notification as read
    const { notification_id } = req.body; // structure of the request body

    markNotificationAsRead(notification_id, (err) => { // calling the model function to mark as read a notification
        if(err) return res.status(500).json({ msg: 'Error marking as read' });

        res.status(201).json({ msg: 'Notification mark as read' });
    });
};

const markAllAsRead = (req, res) => { // function to mark a notification as read
    const user_id = req.user.id; // getting the user id from the request

    markAllNotificationsAsRead(user_id, (err) => { // calling the model function to marks as read all notifications
        if(err) return res.status(500).json({ msg: 'Error marking as read all notifications' });

        res.status(201).json({ msg: 'All notifications mark as read' });
    });
};

module.exports = { notificationList , markAsRead , markAllAsRead}; // exports functiona so they can be used in other files