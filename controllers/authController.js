const bcrypt = require('bcryptjs'); // to hash passwords
const jwt = require('jsonwebtoken'); // to create JSON Web Tokens
const { createUser, getUserByEmail} = require('../models/user'); // imports user model functions

const register = (req, res) => { // function to register users
    const { first_name, last_name, email, password } = req.body; // structure of the request body

    if (!first_name || !last_name ||!email || !password) { // checking if all fields are provided
        return res.status(400).json({ msg: 'Missing fields' });
    }

    getUserByEmail(email, (err, results) => {  // checking if the user already exists
        if (err) return res.status(500).json({ msg: 'Error in the database' });
        
        if (results.length > 0) { // if results are returned, the user already exists
            return res.status(400).json({ msg: 'User already registered'});
        }

        const passwordHash = bcrypt.hashSync(password, 10); // hashing the password

        createUser(first_name, last_name, email, passwordHash, (err, results) => {
            if(err) return res.status(500).json({ msg: 'Error creating user' });

            res.status(201).json({ msg: 'User created' });
        });
    });
};

const login = (req, res) => { // function to login
    const { email, password } = req.body; // structure of the request body

    if (!email || !password) { // checking if all fields are provided
        return res.status(400).json({ msg: 'Missing fields' });
    }
    
    getUserByEmail(email, (err, results) => {  // checking if the user exists
        if (err) return res.status(500).json({ msg: 'Error in the database' });
        // === means strict equality
        if (results.length === 0) return res.status(400).json({ msg: 'User not found' });

        const user = results[0]; // getting the first result
        const passwordMatch = bcrypt.compareSync(password, user.password_hash);

        if (!passwordMatch) return res.status(400).json({ msg: 'Incorrect password' }); // checking if the password matches

        const token = jwt.sign({id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // creating a token with user id and email, expires in 1 hour

        res.json({ token, 
            user: {
                id: user.user_id, 
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email}}); // sending the token and user data in the response
    });
};

module.exports = { register, login }; // exports the register and login functions so they can be used in other files