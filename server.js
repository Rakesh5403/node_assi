const express = require('express');
const app = express();
const todoTaskRoutes = require('./src/routes/taskRoutes'); 
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const { PORT = 5000 } = process.env;

app.use(express.json());  


app.use(cors()); // cors options

app.use('/api', todoTaskRoutes);  
app.use('/api/users', userRoutes);


app.listen( PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})



