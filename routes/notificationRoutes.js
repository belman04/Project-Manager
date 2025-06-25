const express = require('express'); // to import express
const router = express.Router(); // router isntance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware

const { notificationList , markAsRead , markAllAsRead} = require('../controllers/notificationController'); // imports functions from projectController

router.get('', authenticateToken, notificationList); // endpoint to get notifications 
router.put('/markAsRead', authenticateToken, markAsRead); // endpoint to mark a notification as read
router.put('/markAllRead', authenticateToken, markAllAsRead); // endpoint to mark all notifications as read

module.exports = router; // exports the router so it can be used in other files
