const express = require('express');
const router = express.Router();
const taskController  = require('../controller/taskController.js');
const authenticate = require('../middlewares/authenticate.js');
const { validateData } = require('../utils/validationUtil');
const { taskValidation, taskStatusValidation } = require('../middlewares/validationMiddleware.js');




router.post('/tasks/create', authenticate, validateData(taskValidation), taskController.createTask); 


router.get('/tasks', authenticate, taskController.getAllTasks);


router.get('/tasks/:taskId', authenticate, taskController.getTaskById);


router.put('/updateTask/:taskId', authenticate, validateData(taskStatusValidation), taskController.updateTask);


router.delete('/deleteTask/:id', authenticate, taskController.deleteTask);


router.patch('/tasks/:taskId', authenticate,validateData(taskStatusValidation), taskController.perticularUpdateTask);



module.exports = router;
