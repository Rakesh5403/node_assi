const pool = require('../config/db');

const registerUser = async ({ username, email, password_hash }) => {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('INSERT INTO user_details (username, email, password_hash) VALUES (?, ?, ?)', 
      [username, email, password_hash], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};


const getUserByEmail = async (email) => {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('SELECT user_id, username, email, password_hash FROM user_details WHERE email = ?', [email], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject('USER_NOT_FOUND');
        } else {
          resolve(results[0]);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};


const getUserById = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('SELECT user_id, username, email FROM user_details WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};


const updateUserDetails = async ({ userId, username, email, passwordHash }) => {
  try {
    let updateQuery = 'UPDATE user_details SET username = ?, email = ?';
    let queryParams = [username, email];

    if (passwordHash) {
      updateQuery += ', password_hash = ?';
      queryParams.push(passwordHash);
    }

    updateQuery += ' WHERE user_id = ?';
    queryParams.push(userId);

    const result = await new Promise((resolve, reject) => {
      pool.query(updateQuery, queryParams, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          reject('USER_NOT_FOUND');
        } else {
          resolve();
        }
      });
    });

    return  result;
  } catch (error) {
    throw error;
  }
};




module.exports = { registerUser, getUserByEmail, getUserById, updateUserDetails };
