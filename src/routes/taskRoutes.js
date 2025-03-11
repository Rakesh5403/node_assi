const express = require('express');
const router = express.Router();
const taskController  = require('../controller/taskController.js');
const authenticate = require('../middlewares/authenticate.js');
const { validateData } = require('../middlewares/validationMiddleware.js');
const { taskValidation, taskStatusValidation } = require('../constants/validationConstant.js');


router.post('/tasks/create', authenticate, validateData(taskValidation), taskController.createTask); 


router.get('/tasks', authenticate, taskController.getAllTasks);


router.get('/tasks/:taskId', authenticate, taskController.getTaskById);


router.put('/tasks/updateTask/:taskId', authenticate, validateData(taskStatusValidation), taskController.updateTask);


router.delete('/tasks/deleteTask/:id',authenticate, taskController.softDeleteTask);


router.patch('/tasks/:taskId', authenticate,validateData(taskStatusValidation), taskController.titleStatusUpdateTask);


module.exports = router;
