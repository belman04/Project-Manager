const express = require('express'); // imports express
const router = express.Router(); // router instance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware
const { uploadProfile } = require('../middleware/upload');

const { editProfile , editProfileImg } = require('../controllers/userController'); // imports the register and login functions from authController

router.put('/update', authenticateToken, editProfile); // endpoint for user update
router.put('/updateProfileImage', authenticateToken, uploadProfile.single('image'), editProfileImg); // endpoint for user update profile image

module.exports = router; // exports the router so it can be used in app.js or other files