const userModel = require('../models/userModel');
const { errorMessages, successMessages, successCodes, serverErrorCodes, clientErrorCodes } = require('../constants/messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);  
    const userId = await userModel.registerUser({ username, email, password_hash: hashedPassword });

    res.status(successCodes.CREATED).json({statusCode:successCodes.CREATED, message: successMessages.USER_REGISTERED, userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.USER_REGISTRATION_FAILED });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
    
     
      throw {statusCode:clientErrorCodes.NOT_FOUND, message: errorMessages.INVALID_CREDENTIALS};
      
    }
    const token = jwt.sign({ userId: user.user_id, username: user.username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(successCodes.OK).json({ statusCode:successCodes.OK,  message: successMessages.USER_LOGGED_IN, token });
  } catch (error) {

    console.error('Error logging in user:', error);

  
    const statusCode = error.statusCode || serverErrorCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({statusCode: statusCode, message: error.message|| errorMessages.INVALID_CREDENTIALS});
    
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.getUserById(userId);

    res.status(successCodes.OK).json({ message: 'User found', user });
  } catch (error) {
    console.error('Error fetching user details:', error);

    if (error === 'USER_NOT_FOUND') {
      return res.status(clientErrorCodes.NOT_FOUND).json({statusCode:clientErrorCodes.NOT_FOUND, message: errorMessages.USER_NOT_FOUND });
    }

    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.USER_RETRIEVAL_FAILED });
  }
};


const updateUserDetails = async (req, res) => {
  try {
    const { userId, username, email, password } = req.body;

    let passwordHash = undefined;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const result = await userModel.updateUserDetails({ userId, username, email, passwordHash });

    res.status(successCodes.OK).json({statusCode:successCodes.OK, message: result.message });
  } catch (error) {
    console.error('Error updating user details:', error);

    if (error === 'USER_NOT_FOUND') {
      return res.status(clientErrorCodes.NOT_FOUND).json({statusCode:clientErrorCodes.NOT_FOUND, message: errorMessages.USER_NOT_FOUND });
    }

    res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCodes.INTERNAL_SERVER_ERROR, message: errorMessages.USER_UPDATE_FAILED });
  }
};



module.exports = { registerUser, loginUser, getUserById, updateUserDetails };
