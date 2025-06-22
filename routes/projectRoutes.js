const express = require('express'); // to import express
const router = express.Router(); // router isntance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware

const { projectsList } = require('../controllers/projectController'); // imports the projectsList function from projectController

router.get('/getProjects', authenticateToken, projectsList); // endpoint to get projects 

module.exports = router; // exports the router so it can be used in other files