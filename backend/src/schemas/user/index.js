const Joi = require("joi");

module.exports = {
  userRegisterSchema: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
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
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm password must match the password",
        "any.required": "Confirm password is required",
        "string.empty": "Confirm password is not allowed to be empty",
      }),
  }),

  googleLogin: Joi.object({
    credential: Joi.string().required().messages({
      "any.required": "Credential is required",
      "string.empty": "Credential cannot be empty",
    }),
  }),

  verifyUserSchema: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
      }),
    code: Joi.string()
      .pattern(/^\d{5}$/)
      .required()
      .messages({
        "string.pattern.base": "Code must be a 5-digit number",
        "any.required": "Code is required",
        "string.empty": "Code cannot be empty",
      }),
  }),

  resendSchema: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
      }),
    type: Joi.string().valid("verify", "reset").required().messages({
      "any.only": "Type must be either 'verify' or 'reset'",
      "any.required": "Type is required",
      "string.empty": "Type cannot be empty",
    }),
  }),

  emailSchema: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
      }),
  }),

  login: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
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

  resetPassword: Joi.object().keys({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
      }),
    code: Joi.string()
      .pattern(/^\d{5}$/)
      .required()
      .messages({
        "string.pattern.base": "Code must be a 5-digit number",
        "any.required": "Code is required",
        "string.empty": "Code cannot be empty",
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
