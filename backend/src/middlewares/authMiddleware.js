const jwt = require("jsonwebtoken");
const User = require("../models/users/model");

const jwtSecret = process.env.JWT_SECRET;

const verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token or expired",
          response: null,
          error: err,
        });
      }
      const email = decoded?.user?.email;
      const user = await User.findOne({ email }).select("email emailVerified");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          response: null,
          error: "User not found",
        });
      }
      if (!user.emailVerified) {
        return res.status(400).json({
          message: "Email not verified",
          response: null,
          error: "Email not verified",
        });
      }
      req.decoded = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Access denied",
      response: null,
      error: "Access denied, authentication token missing",
    });
  }
};

module.exports = {
  verifyUserToken,
};
