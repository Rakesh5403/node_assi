const taskModel = require('../models/taskModel');
const { successMessages, errorMessages, successCodes, serverErrorCodes, clientErrorCodes } = require('../constants/messages');

const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const { userId, email: createdBy, username: updatedBy } = req.user;
    
    const result = await taskModel.createTask({ 
      title, 
      description, 
      status, 
      due_date, 
      user_id: userId, 
      created_by: createdBy,
      updated_by: updatedBy 
    });
    

    res.status(successCodes.CREATED).json({statusCode:successCodes.CREATED, message: successMessages.TASK_CREATED, taskId: result.insertId });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_CREATION_FAILED });
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

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: successMessages.TASKS_RETRIEVED, tasks: result });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_RETRIEVAL_FAILED });
    
  }
};

const filterTasksByStatus = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status } = req.query;

    const validStatuses = ['complete', 'incomplete'];
    if (status && !validStatuses.includes(status)) {

      throw {statusCode:clientErrorCodes.BAD_REQUEST, message: errorMessages.INVALID_FILTER_STATUS}
    }

    const result = await taskModel.filterTasksByStatus({
      user_id: userId,
      status
    });

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: successMessages.TASKS_RETRIEVED, tasks: result });
  } catch (error) {
    console.log(error.message)
    const statusCode = error.statusCode || serverErrorCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({statusCode: statusCode, message: error.message|| errorMessages.INVALID_FILTER_STATUS});

  }
}; 

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await taskModel.getTaskById(taskId);

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: successMessages.TASK_RETRIEVED, task: result });
  } catch (error) {
    console.error('Error getting task by ID:', error);
    res.status(clientErrorCodes.NOT_FOUND).json({statusCode:clientErrorCodes.NOT_FOUND, message: errorMessages.TASK_NOT_FOUND });
  }
};

const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const { title, description, status, due_date } = req.body;

    const result = await taskModel.updateTask(taskId, { title, description, status, due_date,userId});

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: successMessages.TASK_UPDATED });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_UPDATE_FAILED });
  }
};


const softDeleteTask = async (req, res) => {
  try {
      const { userId } = req.user;
      const { id } = req.params;

      const result = await taskModel.softDeleteTask(id, userId);

      if (result.affectedRows === 0) {

          throw {statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.TASK_NOT_FOUND};
      }

      res.status(successCodes.OK).json({ statusCode: successCodes.OK, message: successMessages.TASK_DELETED});
  } catch (error) {
    
      console.error('Error deleting task:', error);
      const statusCode = error.statusCode || serverErrorCodes.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({statusCode: statusCode, message:error.message|| errorMessages.TASK_NOT_FOUND });
  } ;
};



const titleStatusUpdateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const { title, status, due_date } = req.body;

    const result = await taskModel.titleStatusUpdateTask(taskId, { title, status, due_date, userId });

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: successMessages.TASK_UPDATED });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.TASK_UPDATE_FAILED });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, titleStatusUpdateTask, softDeleteTask, filterTasksByStatus };
