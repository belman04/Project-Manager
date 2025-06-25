const express = require('express'); // to import express
const router = express.Router(); // router isntance
const authenticateToken = require('../middleware/authMiddleware'); // imports the authentication middleware

const { taskList , newTask , assignTask , unassignTask, editTask , changeStatus , removeTask } = require('../controllers/taskController'); // imports functions from taskController

router.get('', authenticateToken, taskList); // endpoint to get tasks 
router.post('', authenticateToken, newTask); // endpoint to post tasks 
router.post('/assign', authenticateToken, assignTask); // endpoint to assing tasks 
router.delete('/unassign', authenticateToken, unassignTask); // endpoint to unassign user from tasks 
router.put('', authenticateToken, editTask); // endpoint to put projects 
router.put('/status', authenticateToken, changeStatus); // endpoint to put tasks status 
router.delete('', authenticateToken, removeTask); // endpoint to delete tasks 

module.exports = router; // exports the router so it can be used in other files