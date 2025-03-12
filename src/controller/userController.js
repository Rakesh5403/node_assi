const userModel = require('../models/userModel');
const { errorMessages, successMessages, successCode, serverErrorCode, clientErrorCode } = require('../constants/messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);  
    const userId = await userModel.registerUser({ username, email, password_hash: hashedPassword });

    res.status(successCode.CREATED).json({statusCode:successCode.CREATED, message: successMessages.USER_REGISTERED, userId });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.USER_REGISTRATION_FAILED });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
    
     
      throw new Error(errorMessages.INVALID_CREDENTIALS);
      
    }
    const token = jwt.sign({ userId: user.user_id, username: user.username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(successCode.OK).json({ statusCode:successCode.OK,  message: successMessages.USER_LOGGED_IN, token });
  } catch (err) {

    console.error('Error logging in user:', err);

    if (err === 'USER_NOT_FOUND') {
      
      return res.status(clientErrorCode.NOT_FOUND).json({statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.USER_NOT_FOUND });
    }

    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.USER_LOGIN_FAILED });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.getUserById(userId);

    res.status(successFullCode.OK).json({ message: 'User found', user });
  } catch (err) {
    console.error('Error fetching user details:', err);

    if (err === 'USER_NOT_FOUND') {
      return res.status(clientErrorCode.NOT_FOUND).json({statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.USER_NOT_FOUND });
    }

    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.USER_RETRIEVAL_FAILED });
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

    res.status(successCode.OK).json({statusCode:successCode.OK, message: result.message });
  } catch (err) {
    console.error('Error updating user details:', err);

    if (err === 'USER_NOT_FOUND') {
      return res.status(clientErrorCode.NOT_FOUND).json({statusCode:clientErrorCode.NOT_FOUND, message: errorMessages.USER_NOT_FOUND });
    }

    res.status(serverErrorCode.INTERNAL_SERVER_ERROR).json({statusCode:serverErrorCode.INTERNAL_SERVER_ERROR, message: errorMessages.USER_UPDATE_FAILED });
  }
};



module.exports = { registerUser, loginUser, getUserById, updateUserDetails };
