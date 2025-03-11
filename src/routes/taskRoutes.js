const express = require('express');
const router = express.Router();
const taskController  = require('../controller/taskController.js');
const authenticate = require('../middlewares/authenticate.js');
const { validateData } = require('../middlewares/validationMiddleware.js');
const { taskValidation, taskStatusValidation } = require('../constants/validationConstant.js');


router.post('/create', authenticate, validateData(taskValidation), taskController.createTask); 

router.get('/getTask', authenticate, taskController.getAllTasks);

router.get('/filterStatus', authenticate, taskController.filterTasksByStatus);

router.get('/:taskId', authenticate, taskController.getTaskById);

router.put('/updateTask/:taskId', authenticate, validateData(taskStatusValidation), taskController.updateTask);

router.delete('/deleteTask/:id',authenticate, taskController.softDeleteTask);

router.patch('/:taskId', authenticate,validateData(taskStatusValidation), taskController.titleStatusUpdateTask);

module.exports = router;
