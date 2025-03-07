const taskModel = require('../models/taskModel');
const { statusCode, successMessages, errorMessages } = require('../constants/messages');

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

    res.status(statusCode.CREATED).json({ message: successMessages.TASK_CREATED, taskId: result.insertId });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessages.TASK_CREATION_FAILED, error: err.message });
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

    res.status(statusCode.OK).json({ message: successMessages.TASKS_RETRIEVED, tasks: result });
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessages.TASK_RETRIEVAL_FAILED, error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await taskModel.getTaskById(taskId);

    res.status(statusCode.OK).json({ message: successMessages.TASK_RETRIEVED, task: result });
  } catch (err) {
    console.error('Error getting task by ID:', err);
    res.status(statusCode.NOT_FOUND).json({ message: errorMessages.TASK_NOT_FOUND });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, due_date } = req.body;

    const result = await taskModel.updateTask(taskId, { title, description, status, due_date });

    res.status(statusCode.OK).json({ message: successMessages.TASK_UPDATED });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessages.TASK_UPDATE_FAILED, error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskModel.deleteTask(id);

    if (result.affectedRows === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: errorMessages.TASK_NOT_FOUND });
    }

    res.status(statusCode.OK).json({ message: successMessages.TASK_DELETED });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessages.TASK_DELETION_FAILED, error: err.message });
  }
};

const perticularUpdateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, due_date } = req.body;

    const result = await taskModel.perticularUpdateTask(taskId, { title, description, status, due_date });

    res.status(statusCode.OK).json({ message: successMessages.TASK_UPDATED });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessages.TASK_UPDATE_FAILED, error: err.message });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask, perticularUpdateTask };
