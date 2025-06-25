const express = require('express'); // to import express
const router = express.Router(); // router isntance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware

const { notificationList } = require('../controllers/notificationController'); // imports functions from projectController

router.get('', authenticateToken, notificationList); // endpoint to get notifications 

module.exports = router; // exports the router so it can be used in other files
