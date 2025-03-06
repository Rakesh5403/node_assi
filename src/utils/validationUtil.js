const Joi = require('joi');

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

module.exports = { validateData };





