const Joi = require("joi");

module.exports = {
  userRegisterSchema: Joi.object({
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
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.email": "Enter valid email",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
        "string.trim":
          "Email should not contain any spaces at the beginning or end",
      }),
    password: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 30 characters long",
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
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

  login: Joi.object({
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.email": "Enter valid email",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
        "string.trim":
          "Email should not contain any spaces at the beginning or end",
      }),
    password: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 30 characters long",
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
      }),
  }),

  userStatusUpdate: Joi.object({
    status: Joi.string().valid("blocked", "unblocked").required().messages({
      "any.only": "Status must be either 'blocked' or 'unblocked'",
      "any.required": "Status is required",
    }),
  }),

  resetPassword: Joi.object().keys({
    password: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 30 characters long",
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
      }),
    confirmPassword: Joi.string()
      .trim()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Password do not match",
      }),
  }),

  passwordUpdate: Joi.object().keys({
    currentPassword: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 30 characters long",
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
      }),
    newPassword: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 30 characters long",
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
      }),
    confirmPassword: Joi.string()
      .trim()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Password do not match",
      }),
  }),
};
