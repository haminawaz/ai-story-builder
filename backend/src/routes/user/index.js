const { Router } = require("express");
const router = Router();
const {
  registerUser,
  googleLoginUser,
  verifyUser,
  resendOtp,
  loginUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../../controllers/user/index.js");
const joiValidator = require("../../middlewares/joi.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.post("/register", joiValidator("userRegisterSchema"), registerUser);

router.post("/verify-email", joiValidator("verifyUserSchema"), verifyUser);

router.post("/resend-otp", joiValidator("resendSchema"), resendOtp);

router.post("/google-login", joiValidator("googleLogin"), googleLoginUser);

router.post("/login", joiValidator("login"), loginUser);

router.post("/forgot-password", joiValidator("emailSchema"), forgotPassword);

router.post("/reset-password", joiValidator("resetPassword"), resetPassword);

router.put(
  "/update-password",
  verifyUserToken,
  joiValidator("passwordUpdate"),
  updatePassword
);

module.exports = router;
