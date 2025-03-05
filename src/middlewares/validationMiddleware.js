const Joi = require('joi');
const  validateData = require('../utils/validationUtil');


const taskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('complete', 'incomplete').required(),
    due_date: Joi.date().optional()
  });

  return schema.validate(data);
};


const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = { taskValidation, userValidation };
