const Validators = require("../schemas/index");

module.exports = function bodyJoiValidator(validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'Joi ${validator}' does not exist`);
  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body, {
        abortEarly: false,
      });
      if (validated.error) {
        return res.status(400).json({
          message: validated.error.details[0].message,
          response: null,
          error: validated.error.details[0].message,
        });
      }
      next();
    } catch (err) {
      if (err.isJoi) {
        const errors = err.details.reduce((acc, err) => {
          if (!acc[err.path[0]]) {
            acc[err.path[0]] = [];
          }
          acc[err.path[0]].push(err.message);
          return acc;
        }, {});

        return res.status(403).json({
          message: "Invalid format",
          error: errors,
          response: null,
        });
      }
      return res.status(500).json({
        message: "Internal server error",
        error: err,
        response: null,
      });
    }
  };
};
