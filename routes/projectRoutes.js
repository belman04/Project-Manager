const express = require('express'); // to import express
const router = express.Router(); // router isntance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware

const { projectsList , newProject , shareProject, editProject , changeStatus , removeProject } = require('../controllers/projectController'); // imports functions from projectController

router.get('', authenticateToken, projectsList); // endpoint to get projects 
router.post('', authenticateToken, newProject); // endpoint to post projects 
router.post('/invite', authenticateToken, shareProject); // endpoint to share projects 
router.put('', authenticateToken, editProject); // endpoint to put projects 
router.put('/status', authenticateToken, changeStatus); // endpoint to put projects status 
router.delete('', authenticateToken, removeProject); // endpoint to delete projects 
