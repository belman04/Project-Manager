const { getProjectsByUser , createProject , addUserToProject, updateProject , updateStatus , deleteProject } = require('../models/project'); // imports project model functions

const projectsList = (req, res) => { // function to list projects for a user
    const user_id = req.user.id; // getting the user id from the request

    getProjectsByUser(user_id, (err, results) => { // calling the model function 
        if (err) return res.status(500).json({ msg: 'Error in the database'}); // if there is an error send 500 status (Internal Server Error)

        if (results.length === 0) return res.status(204).json({ msg: 'No projects found' }); // if there are no projects send 204 status (No Content)
        res.json(results);
    });
};

const newProject = (req, res) => { // function to create a new project
    const user_id = req.user.id; // getting the user id from the request
    const { name, description, finished_date, priority } = req.body; // structure of the request body

    if (!name) { // checking if the name is provided, it will be the only required field
        return res.status(400).json({ msg: 'To save de project provide a name' });
    }

    createProject(user_id, name, description, finished_date, priority, (err) => { // calling the model function to create a new project
        if(err) return res.status(500).json({ msg: 'Error creating project' });

        res.status(201).json({ msg: 'Project created' });
    });
};

const shareProject = (req, res) => { // function to invite other people to the project

    const { user_id, project_id } = req.body; // structure of the request body

    addUserToProject(user_id, project_id, (err) => { // calling the model function to add user to project
        if(err) return res.status(500).json({ msg: 'Error inviting user' });

        res.status(201).json({ msg: 'User added to the project' });
    });
};

const editProject = (req, res) => { // function to edit project
    const { project_id, name, description, finished_date, priority } = req.body; // structure of the request body

    updateProject(project_id, name, description, finished_date, priority, (err) => { // calling the model function to update project
        if(err) return res.status(500).json({ msg: 'Error updating project' });

        res.status(201).json({ msg: 'Project edited' });
    });
};

const changeStatus = (req, res) => { // function to change status of a project
    const { project_id, status } = req.body; // structure of the request body

    updateStatus(project_id, status, (err) => { // calling the model function to update project
        if(err) return res.status(500).json({ msg: 'Error changing project status' });

        res.status(201).json({ msg: 'Project status update' });
    });
};

const removeProject = (req, res) => { // function to remove project
    const { project_id } = req.body; // structure of the request body

    deleteProject(project_id, (err) => { // calling the model function to remove project
        if(err) return res.status(500).json({ msg: 'Error deleting project' });

        res.status(201).json({ msg: 'Project deleted' });
    });
};

module.exports = { projectsList , newProject , shareProject , editProject , changeStatus, removeProject}; // exports functiona so they can be used in other files