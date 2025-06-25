const { getNotifications , createNotification } = require('../models/notification'); // imports notification model functions

const notificationList = (req, res) => { // function to list notifications from a user
    const user_id = req.user.id; // getting the user id from the request

    getNotifications(user_id, (err, results) => { // calling the model function 
        if (err) return res.status(500).json({ msg: 'Error in the database'}); // if there is an error send 500 status (Internal Server Error)

        if (results.length === 0) return res.status(204).json({ msg: 'No notifications found' }); // if there are no notifications send 204 status (No Content)
        res.json(results);
    });
};

module.exports = { notificationList }; // exports functiona so they can be used in other files