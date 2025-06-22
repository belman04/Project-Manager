const jwt = require('jsonwebtoken'); // to import a JSON Web Token library

// function to authenticate the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // getting the authorization header from the request
    const token = authHeader && authHeader.split(' ')[1]; // extracting the token from the header and splitting it to get the actual token part

    if(!token) return res.sendStatus(401); // if there is no token send a 401 Status (Unauthorized)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if there is an error verifying the token send a 403 Status (Forbidden)
        req.user = user; // if the user is valid it's added to the request object
        next(); // calling the next middleware or route handler
    });
};

module.exports = authenticateToken; // exporting the autenticateToken function so it can be used in other files