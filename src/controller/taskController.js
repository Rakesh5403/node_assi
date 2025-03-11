const taskModel = require('../models/taskModel');
const { successMessages, errorMessages, successFullCode, serverErrorCode, clientErrorCode } = require('../constants/messages');

const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const { userId, username: createdBy } = req.user;

    const result = await taskModel.createTask({ 
      title, 
      description, 
      status, 
      due_date, 
      user_id: userId, 
      created_by: createdBy 
    });

    res.status(successCode.CREATED).json({statusCode:successCode.CREATED, message: successMessages.TASK_CREATED, taskId: result.insertId });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERR, message: errorMessages.TASK_CREATION_FAILED, error: err.message });
  }
};


const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status, search, sortField, sortOrder } = req.query;

    const result = await taskModel.getAllTasks({
      user_id: userId,
      status,
      search,
      sortField,
      sortOrder
    });

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASKS_RETRIEVED, tasks: result });
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_RETRIEVAL_FAILED, error: err.message });
    
  }
};

const filterTasksByStatus = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status } = req.query;

    const validStatuses = ['complete', 'incomplete'];
    if (status && !validStatuses.includes(status)) {
      return res.status(clientErrorCode.BAD_REQUEST).json({statusCode:clientErrorCode.BAD_REQUEST, message: errorMessages.INVALID_FILTERSTATUS });
    }

    const result = await taskModel.filterTasksByStatus({
      user_id: userId,
      status
    });

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASKS_RETRIEVED, tasks: result });
  } catch (err) {
    console.error('Error filtering tasks:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_RETRIEVAL_FAILED, error: err.message });
  }
}; 

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await taskModel.getTaskById(taskId);

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASK_RETRIEVED, task: result });
  } catch (err) {
    console.error('Error getting task by ID:', err);
    res.status(clientErrorCode.NOT_FOUND).json({statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.TASK_NOT_FOUND });
  }
};

const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const { title, description, status, due_date } = req.body;

    const result = await taskModel.updateTask(taskId, { title, description, status, due_date, userId});

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASK_UPDATED });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_UPDATE_FAILED, error: err.message });
  }
};

const softDeleteTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await taskModel.softDeleteTask(id, userId);

    if (result.affectedRows === 0) {
      return res.status(clientErrorCode.NOT_FOUND).json({statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.TASK_NOT_FOUND });
    }

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASK_DELETED });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_DELETION_FAILED, error: err.message });
  }
};


const titleStatusUpdateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const { title, status, due_date } = req.body;

    const result = await taskModel.titleStatusUpdateTask(taskId, { title, status, due_date, userId });

    res.status(successCode.OK).json({statusCode:successCode.OK, message: successMessages.TASK_UPDATED });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_UPDATE_FAILED, error: err.message });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, titleStatusUpdateTask, softDeleteTask, filterTasksByStatus };
