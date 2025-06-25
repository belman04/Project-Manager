const express = require ('express'); // to import express, is const because we are not going to change the value of express
const cors = require('cors'); // to import cors, for frontend and backend communication
require('dotenv').config(); // to import dotenv, for environment variables

const app = express();  // an instance of express
app.use(cors()); // using cors middleware for cross-origin requests
app.use(express.json()); // using express.json() middleware to parse JSON bodies

app.get('/', (req, res) => {  // this is the root endpoint, it will respond to GET requests
    res.send('THE API IS RUNNING!');
}); 

app.listen(process.env.PORT, () => { // this will listen to the port defined in the .env file and start the server
    console.log('Server is running on http://localhost:' + process.env.PORT);
});

// Importing routes
const authRoutes = require('./routes/authRoutes'); // imports the authRoutes from routes/authRoutes.js
app.use('/api/auth', authRoutes); // using the authRoutes for the /api/auth endpoint

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);
