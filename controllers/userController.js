const { updateProfile , updateProfileImg } = require('../models/user'); // imports user model functions

const editProfile = (req, res) => { // function to edit profile
    const user_id = req.user.id; // getting the user id from the request

    const { first_name, last_name, email } = req.body; // structure of the request body

    updateProfile(user_id, first_name, last_name, email, (err) => { // calling the model function to update user info
        if(err) return res.status(500).json({ msg: 'Error updating user profile' });

        res.status(201).json({ msg: 'User profile updated' });
    });
};

const editProfileImg = (req, res) => { // function to upload profile image
    const user_id = req.user.id; // getting the user id from the request
    const image_url = req.file.path; 

    if (!req.file) return res.status(400).json({ msg: 'No image provided' });

    updateProfileImg(user_id, image_url, (err) => { // calling the model function to update profile image
        if(err) return res.status(500).json({ msg: 'Error updating image profile' });

        res.status(201).json({ msg: 'Image profile updated' , url: image_url});
    });
};


module.exports = { editProfile , editProfileImg }; // exports functions so they can be used in other files