const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 
const { errorMessages, clientErrorCode } = require('../constants/messages');



const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  
  
  if (!token) {
    return res.status(clientErrorCode.UNAUTHORIZED).json({statusCode:clientErrorCode.UNAUTHORIZED, message: errorMessages.NO_TOKEN });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, username: decoded.username, email: decoded.email }; 

    if (req.user.userId == 'userId') {
      throw new Error(errorMessages.FORBIDDEN)
    }

    next();  
  } catch (err) {
    res.status(clientErrorCode.UNAUTHORIZED).json({statusCode:clientErrorCode.UNAUTHORIZED, message:err.Messages || errorMessages.INVALID_TOKEN });
  }
};

module.exports = authenticateToken;

