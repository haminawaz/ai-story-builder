const Joi = require("joi");

module.exports = {
  updateProfile: Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "First name must be a string",
        "string.pattern.base":
          "First name must start with a letter and can include numbers, spaces, but cannot be entirely numbers",
        "any.required": "First name is required",
        "string.min": "First name must be at least 1 characters long",
        "string.max": "First name must not exceed 70 characters",
        "string.empty": "First name is not allowed to be empty",
        "string.trim":
          "First name should not contain any spaces at the beginning or end",
      }),
    lastName: Joi.string()
      .min(1)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .trim()
      .required()
      .messages({
        "string.base": "Last name must be a string",
        "string.pattern.base":
          "Last name must start with a letter and can include numbers, spaces, but cannot be entirely numbers",
        "any.required": "Last name is required",
        "string.empty": "Last name is not allowed to be empty",
        "string.min": "Last name must be at least 1 characters long",
        "string.max": "Last name must not exceed 70 characters",
        "string.trim":
          "Last name should not contain any spaces at the beginning or end",
      }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9+\-]{10,15}$/)
      .optional()
      .allow("", null)
      .trim()
      .messages({
        "string.empty": "Phone number is not allowed to be empty",
        "string.pattern.base": "Phone number should be 10 to 15 digits",
        "string.trim":
          "Phone number may not contain any spaces at the beginning or end",
      }),
  }),
};
