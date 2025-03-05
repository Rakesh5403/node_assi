const Joi = require('joi');

const validateData = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return { isValid: false, errors: errorMessages };
  }
  return { isValid: true };
};

module.exports = { validateData };
