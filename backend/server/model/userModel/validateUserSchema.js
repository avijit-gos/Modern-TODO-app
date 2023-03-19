/** @format */

const Joi = require("@hapi/joi");

const validateUserSchema = Joi.object({
  name: Joi.string().min(5).required(),
  username: Joi.string().min(5).max(12).required(),
  email: Joi.string().email().min(8).max(50).required(),
  password: Joi.string(),
});

const validateLoginCredentials = Joi.object({
  username: Joi.string().min(5).max(12),
  email: Joi.string().email().min(8).max(20),
  password: Joi.string(),
});

const validatePassword = Joi.object({
  password: Joi.string(),
});

module.exports = {
  validateUserSchema,
  validateLoginCredentials,
  validatePassword,
};
