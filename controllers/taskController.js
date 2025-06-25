const { getTasksByProject, createTasks , addUserToTask , deleteUserFromTask , updateTask, updateStatus, deleteTask } = require('../models/task'); // imports task model functions
const { createNotification } = require('../models/notification'); // imports notification model functions

const taskList = (req, res) => { // function to list tasks for a project
    const { project_id } = req.body; // structure of the request body

    getTasksByProject(project_id, (err, results) => { // calling the model function 
        if (err) return res.status(500).json({ msg: 'Error in the database'}); // if there is an error send 500 status (Internal Server Error)

        if (results.length === 0) return res.status(204).json({ msg: 'No tasks found' }); // if there are no tasks send 204 status (No Content)
        res.json(results);
    });
};

const newTask = (req, res) => { // function to create a new task
    const { project_id, name, description, finished_date, priority } = req.body; // structure of the request body

    if (!name) { // checking if the name is provided, it will be the only required field
        return res.status(400).json({ msg: 'To save the task provide a name' });
    }

    createTasks(project_id, name, description, finished_date, priority, (err) => { // calling the model function to create a new task
        if(err) return res.status(500).json({ msg: 'Error creating task' });

        res.status(201).json({ msg: 'Task created' });
    });
};

const assignTask = (req, res) => { // function to assing task
    const { user_id, task_id } = req.body; // structure of the request body

    addUserToTask(user_id, task_id, (err) => { // calling the model function to assign task
        if(err) return res.status(500).json({ msg: 'Error assining user' });

        const message = 'You have been assign to a task';
        createNotification(user_id, null, task_id, message, 'task_assinged', (err) => { // using the notification model to create a new notification
            if(err) return res.status(500).json({ msg: 'Error sending notification' });

            res.status(201).json({ msg: 'User assing to task and notification send' });
        });
    });
};

const unassignTask = (req, res) => { // function to unassign user from task
    const { user_id, task_id } = req.body; // structure of the request body

    deleteUserFromTask(user_id, task_id, (err) => { // calling the model function to unassign user from task
        if(err) return res.status(500).json({ msg: 'Error unassigning user from task' });

        const message = 'You have been unassign from a task';
        createNotification(user_id, null, task_id, message, 'task_unassigned', (err) => { // using the notification model to create a new notification
            if(err) return res.status(500).json({ msg: 'Error sending notification' });
                    
            res.status(201).json({ msg: 'User unassign from task and notification send' });
        });
    });
};

const editTask = (req, res) => { // function to edit a task
    const { task_id, name, description, finished_date, priority } = req.body; // structure of the request body

    updateTask(task_id, name, description, finished_date, priority, (err) => { // calling the model function to update task
        if(err) return res.status(500).json({ msg: 'Error updating task' });

        res.status(201).json({ msg: 'Task edited' });
    });
};

const changeStatus = (req, res) => { // function to change status of a task
    const { task_id, status } = req.body; // structure of the request body

    updateStatus(task_id, status, (err) => { // calling the model function to update task status
        if(err) return res.status(500).json({ msg: 'Error changing task status' });

        res.status(201).json({ msg: 'Task status update' });
    });
};

const removeTask = (req, res) => { // function to remove task
    const { task_id } = req.body; // structure of the request body

    deleteTask(task_id, (err) => { // calling the model function to remove task
        if(err) return res.status(500).json({ msg: 'Error deleting task' });

        res.status(201).json({ msg: 'Task deleted' });
    });
};

module.exports = { taskList , newTask , assignTask , unassignTask, editTask , changeStatus, removeTask}; // exports functiona so they can be used in other files