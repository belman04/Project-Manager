const express = require('express'); // imports express
const router = express.Router(); // router instance
const { register, login } = require('../controllers/authController'); // imports the register and login functions from authController
router.post('/register', register); // endpoint for user registration
router.post('/login', login); // endpoint for user login

module.exports = router; // exports the router so it can be used in app.js or other files