const { Router } = require("express");
const router = Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../../controllers/user/index.js");
const joiValidator = require("../../middlewares/joi.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.post("/register", joiValidator("userRegisterSchema"), registerUser);
router.post("/verify-email", verifyUser);
router.post("/login", joiValidator("login"), loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", joiValidator("resetPassword"), resetPassword);
router.put(
  "/update-password",
  verifyUserToken,
  joiValidator("passwordUpdate"),
  updatePassword
);

module.exports = router;
