const cloudinary = require('cloudinary').v2; // importing cloudinary library
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // importing cloudinary storage for multer
require('dotenv').config(); // to import dotenv, for environment variables

cloudinary.config({ // configuring cloudinary with environment variables
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profileStorage = new CloudinaryStorage({ // creating a new instance of CloudinaryStorage
    cloudinary,
    params: {
        folder: 'profile_images',
        allowed_formats: ['jpg', 'jpeg', 'png'], 
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // resizing the image 
    }
});

const taskStorage = new CloudinaryStorage({ // creating a new instance of CloudinaryStorage
    cloudinary,
    params: {
        folder: 'task_images',
        allowed_formats: ['jpg', 'jpeg', 'png'], 
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // resizing the image 
    }
});

module.exports = { cloudinary , profileStorage , taskStorage}; // exports the queries to be used in other files
