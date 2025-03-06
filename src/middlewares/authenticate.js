

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 
const { errorMessages } = require('../constants/messages');



const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  
  
  if (!token) {
    return res.status(401).json({ message: errorMessages.NO_TOKEN });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, username: decoded.username }; 
    next();  
  } catch (err) {
    res.status(401).json({ message: errorMessages.INVALID_TOKEN });
  }
};

module.exports = authenticateToken;

