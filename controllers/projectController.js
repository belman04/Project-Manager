const { getProjectsByUser} = require('../models/project'); // imports project model functions

const projectsList = (req, res) => { // function to list projects for a user
    const user_id = req.user.id; // getting the user id from the request

    getProjectsByUser(user_id, (err, results) => { // calling the model function 
        if (err) return res.status(500).json({ msg: 'Error in the database'}); // if there is an error send 500 status (Internal Server Error)
        res.json(results);
    });
};

module.exports = { projectsList }; // exports the listProjects function so it can be used in other files