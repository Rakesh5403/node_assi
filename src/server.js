const express = require('express');
const app = express();
const todoTaskRoutes = require('../src/routes/taskRoutes'); 
const userRoutes = require('../src/routes/userRoutes');
const cors = require('cors');
const helmet = require('helmet');
const { PORT = 4000 } = process.env;

app.use(express.json()); 

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(helmet())

app.use(cors(corsOptions));

app.use('/api/tasks', todoTaskRoutes); 
app.use('/api/users', userRoutes);  


app.listen( PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})




