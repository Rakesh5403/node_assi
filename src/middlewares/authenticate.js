

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
      return res.status(clientErrorCode.FORBIDDEN).json({statusCode:clientErrorCode.FORBIDDEN, message: errorMessages.FORBIDDEN });
    }

    next();  
  } catch (err) {
    res.status(clientErrorCode.UNAUTHORIZED).json({ message: errorMessages.INVALID_TOKEN });
  }
};

module.exports = authenticateToken;

