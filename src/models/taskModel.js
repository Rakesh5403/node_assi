
const pool = require('../config/db');

const createTask = async ({ title, description, status, due_date, user_id, created_by ,updated_by}) => {
  try {
    const query = 'INSERT INTO tasklist (title, description, status, due_date, user_id, created_by,updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const result = await new Promise((resolve, reject) => {
      pool.query(query, [title, description, status, due_date, user_id, created_by,updated_by], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async ({ user_id, status, search, sortField = 'due_date', sortOrder = 'ASC' }) => {
  try {
    let query = 'SELECT id, title, description, due_date FROM tasklist WHERE user_id = ? AND deleted = FALSE';
    const params = [user_id];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY ?? ${sortOrder}`;
    params.push(sortField);

    const result = await new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const filterTasksByStatus = async ({ user_id, status }) => {
  try {
    let query = 'SELECT id, title, description, status FROM tasklist WHERE user_id = ?';
    const params = [user_id];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    const result = await new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('SELECT id FROM tasklist WHERE id = ?', [taskId], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length === 0) {
          reject('Task not found');
        } else {
          resolve(result[0]);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, { title, description, status, due_date}) => {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('UPDATE tasklist SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?',
        [title, description, status, due_date, taskId], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.affectedRows === 0) {
            reject(error);
          } else {
            resolve(results);
          }
        });
    });

    return result;
  } catch (error) {
    throw error;
  }
};


const softDeleteTask = async (id, userId) => {
  try {
      const result = await new Promise((resolve, reject) => {
          pool.query(
              'UPDATE tasklist SET deleted = TRUE WHERE id = ? AND user_id = ?',
              [id, userId],
              (error, results) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(results);
                  }
              }
          );
      });
      return result;
  } catch (error) {
      throw error;
  }
};



const titleStatusUpdateTask = async (taskId, { title, description, status, due_date }) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const updateFields = [];
      const updateValues = [];

      if (title) {
        updateFields.push('title = ?');
        updateValues.push(title);
      }
      if (description) {
        updateFields.push('description = ?');
        updateValues.push(description);
      }
      if (status) {
        updateFields.push('status = ?');
        updateValues.push(status);
      }
      if (due_date) {
        updateFields.push('due_date = ?');
        updateValues.push(due_date);
      }

      if (updateFields.length === 0) {
        reject('No fields provided for update');
        return;
      }

      updateValues.push(taskId);
      const query = `UPDATE tasklist SET ${updateFields.join(', ')} WHERE id = ?`;

      pool.query(query, updateValues, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, titleStatusUpdateTask, softDeleteTask, filterTasksByStatus };
