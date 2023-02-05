/** @format */

const Joi = require("@hapi/joi");

const validateTaskCreate = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().max(200),
  priority: Joi.string().required(),
  type: Joi.string().required(),
});

module.exports = {
  validateTaskCreate,
};
