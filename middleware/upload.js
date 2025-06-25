const multer = require('multer'); // importing multer for file uploads
const { profileStorage, taskStorage } = require('../config/cloudinary'); // importing cloudinary storage configurations

const uploadProfile = multer({ storage: profileStorage }); // configuring multer for profile image uploads
const uploadTask = multer({ storage: taskStorage }); // configuring multer for task image uploads

module.exports = { uploadProfile , uploadTask }; // exporting the upload configurations so they can be used in other files
