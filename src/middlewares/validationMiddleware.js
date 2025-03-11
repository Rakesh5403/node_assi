
const Joi = require('joi');
const {  clientErrorCode } = require('../constants/messages');
const { taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation } = require('../constants/validationConstant');

const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(clientErrorCode.BAD_REQUEST).json({ isValid: false, errors: errorMessages });
    }
    next();
  };
};

module.exports = { validateData,  taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation };





