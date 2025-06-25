const db = require('../config/db'); // imports the database connection from config/db.js

const getProjectsByUser = (user_id, callback) => { // function to get user's projects
    const select_query = 'SELECT p.*, MAX(up.is_admin) AS is_admin, GROUP_CONCAT(up_all.fk_user_id) AS invited FROM project p LEFT JOIN user_project up ON p.project_id = up.fk_project_id AND up.fk_user_id = ? LEFT JOIN user_project up_all ON p.project_id = up_all.fk_project_id WHERE up.fk_user_id = ? GROUP BY p.project_id';
    db.query(select_query, [user_id, user_id], callback);
};

const createProject = (user_id, name, description, finished_date, priority, callback) => { // function to create a new project
    const insert_project = 'INSERT INTO project (name, description, finished_date, priority) VALUES (?, ?, ?, ?)';
    db.query(insert_project, [name, description, finished_date, priority], (err, result) => {

        if (err) return callback(err);

        const project_id = result.insertId; // get the id of the newly created project
        const insert_user_project = 'INSERT INTO user_project (fk_user_id, fk_project_id, is_admin) VALUES (?, ?, 1)';
        db.query(insert_user_project, [user_id, project_id], callback);
    });
};

const addUserToProject = (user_id, project_id, callback) => { // function to create a new project
    const insert_project = 'INSERT INTO user_project (fk_user_id, fk_project_id) VALUES (?, ?)';
    db.query(insert_project, [user_id, project_id], callback);;
};

const deleteUserFromProject = (user_id, project_id, callback) => { // function to removome user from project
    const delete_user = 'DELETE FROM user_project WHERE fk_user_id = ? AND fk_project_id = ?';
    db.query(delete_user, [user_id, project_id], callback);;
};

const updateProject = (project_id, name, description, finished_date, priority, callback) => { // function to update a project
    const fields = [];
    const values = [];
    // first we check which fields are provided to update
    if (name !== undefined){ // if name is provided we add it to the fields and values arrays
        fields.push('name = ?');
        values.push(name);
    }
    if (description !== undefined){
        fields.push('description = ?');
        values.push(description);
    }    
    if (finished_date !== undefined){
        fields.push('finished_date = ?');
        values.push(finished_date);
    }   
    if (priority !== undefined){
        fields.push('priority = ?');
        values.push(priority);
    }   

    if (fields.length === 0) { // if there are fields provided to update we return an error
        return callback(new Error('No fields to update'));
    }

    const update_project = `UPDATE project SET ${fields.join(", ")} WHERE project_id = ?`;
    values.push(project_id);

    db.query(update_project, values, callback);
};

const updateStatus = (project_id, status, callback) => { // function to change the status of a project
    const update_status = 'UPDATE project SET status = ? WHERE project_id = ?';
    db.query(update_status, [status, project_id], callback);
};

const deleteProject = (project_id, callback) => { // function to delete project
    const delete_project = 'DELETE FROM project WHERE project_id = ?';
    db.query(delete_project, [project_id], callback);
};

module.exports = { getProjectsByUser, createProject , addUserToProject , deleteUserFromProject, updateProject, updateStatus, deleteProject}; // exports the queries to be used in other files
