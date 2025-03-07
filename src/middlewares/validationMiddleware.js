// const Joi = require('joi');

// const taskValidation = Joi.object({
//   title: Joi.string().min(3).max(255).required(),
//   description: Joi.string().optional(),
//   status: Joi.string().valid('complete', 'incomplete').required(),
//   due_date: Joi.date().optional(),
// });

// const taskStatusValidation = Joi.object({
//   title: Joi.string().min(3).max(255).required(),
//   description: Joi.string().optional(),
//   status: Joi.string().valid('complete', 'incomplete').required(),
//   due_date: Joi.date().optional(),
// });

// const userValidation = Joi.object({
//   username: Joi.string().min(3).max(255).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// const userLoginValidation = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// const userUpdateValidation = Joi.object({
//   username: Joi.string().min(3).max(255).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// module.exports = { taskValidation, userValidation, taskStatusValidation, userLoginValidation, userUpdateValidation };

const Joi = require('joi');
const { taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation } = require('../constants/validationConstant');

const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ isValid: false, errors: errorMessages });
    }
    next();
  };
};

module.exports = { validateData,  taskValidation, taskStatusValidation, userValidation, userLoginValidation, userUpdateValidation };





