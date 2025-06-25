const db = require('../config/db'); // imports the database connection from config/db.js

const createUser = (first_name, last_name, email, password, callback) => { // function to create a new user
    const insert_query = 'INSERT INTO app_user (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
    db.query(insert_query, [first_name, last_name, email, password], callback);
};

const getUserByEmail = (email, callback) => { // function to get a user by email
    const select_query = 'SELECT * FROM app_user WHERE email = ?';
    db.query(select_query, [email], callback);
}

const updateProfile = (user_id, first_name, last_name, email, callback) => { // function to update user info
    const fields = [];
    const values = [];
    // first we check which fields are provided to update
    if (first_name !== undefined){ // if name is provided we add it to the fields and values arrays
        fields.push('first_name = ?');
        values.push(first_name);
    }
    if (last_name !== undefined){
        fields.push('last_name = ?');
        values.push(last_name);
    }    
    if (email !== undefined){
        fields.push('email = ?');
        values.push(email);
    }   

    if (fields.length === 0) { // if there are fields provided to update we return an error
        return callback(new Error('No fields to update'));
    }

    const update_user = `UPDATE app_user SET ${fields.join(", ")} WHERE user_id = ?`;
    values.push(user_id);

    db.query(update_user, values, callback);
};

const updateProfileImg = (user_id, img_url, callback) => { // function to change profile image
    const update_img = 'UPDATE app_user SET profile_img = ? WHERE user_id = ?';
    db.query(update_img, [img_url, user_id], callback);
};


module.exports = { createUser, getUserByEmail , updateProfile , updateProfileImg }; // exports the queries to be used in other files