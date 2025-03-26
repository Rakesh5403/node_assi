const {  clientErrorCodes } = require('../constants/messages');
const { taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation } = require('../constants/validationConstant');

const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message) .join(', ');
      return res.status(clientErrorCodes.BAD_REQUEST).json({statusCode:clientErrorCodes.BAD_REQUEST, error: errorMessages });
    }
    next();
  };
};

module.exports = { validateData,  taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation };





