const db = require('../config/db'); // imports the database connection from config/db.js

const getTasksByProject = (project_id, callback) => { // function to get project's tasks
    const select_query = `
    SELECT 
      t.*,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('user_id', au.user_id, 'first_name', au.first_name, 'last_name', au.last_name))
        FROM (
          SELECT DISTINCT au.user_id, au.first_name, au.last_name
          FROM user_task ut
          JOIN app_user au ON ut.fk_user_id = au.user_id
          WHERE ut.fk_task_id = t.task_id
        ) au
      ) AS assign_to,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('url', i.url, 'image_id', i.image_id, 'public_id', i.public_id))
        FROM (
          SELECT DISTINCT i.url, i.image_id, i.public_id
          FROM image i
          WHERE i.fk_task_id = t.task_id
        ) i
      ) AS images
    FROM task t
    WHERE t.fk_project_id = ?
    `;
    db.query(select_query, [project_id], callback);
};

const createTasks = (project_id, name, description, finished_date, priority, callback) => { // function to create a new task
    const insert_task = 'INSERT INTO task (fk_project_id, name, description, finished_date, priority) VALUES (?, ?, ?, ?, ?)';
    db.query(insert_task, [project_id, name, description, finished_date, priority], callback); 
};

const addUserToTask = (user_id, task_id, callback) => { // function to assing task
    const insert_user_task = 'INSERT INTO user_task (fk_user_id, fk_task_id) VALUES (?, ?)';
    db.query(insert_user_task, [user_id, task_id], callback);;
};

const deleteUserFromTask = (user_id, task_id, callback) => { // function to removome user from task
    const delete_user_task = 'DELETE FROM user_task WHERE fk_user_id = ? AND fk_task_id = ?';
    db.query(delete_user_task, [user_id, task_id], callback);;
};

const updateTask = (task_id, name, description, finished_date, priority, callback) => { // function to update a task
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

    const update_task = `UPDATE task SET ${fields.join(", ")} WHERE task_id = ?`;
    values.push(task_id);

    db.query(update_task, values, callback);
};

const uploadTaskImg = (img_url, public_id, callback) => { // function to add image to a task
    const insert_img = 'INSERT INTO image (fk_task_id, url, public_id) VALUES (?, ?, ?)';
    db.query(insert_img, [task_id, img_url, public_id], callback);
};

const deleteTaskImg = (image_id, callback) => { // function to remove image from task
    const delete_img = 'DELETE FROM image WHERE image_id = ?';
    db.query(delete_img, [image_id], callback);
};

const updateStatus = (task_id, status, callback) => { // function to change the status of a task
    const update_status = 'UPDATE task SET status = ? WHERE task_id = ?';
    db.query(update_status, [status, task_id], callback);
};

const deleteTask = (task_id, callback) => { // function to delete project
    const delete_task = 'DELETE FROM task WHERE task_id = ?';
    db.query(delete_task, [task_id], callback);
};

module.exports = { getTasksByProject, createTasks , addUserToTask , deleteUserFromTask, updateTask, uploadTaskImg , deleteTaskImg , updateStatus, deleteTask}; // exports the queries to be used in other files
