const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { configurations } = require("../../configs/config.js");
const configs = require("../../configs/email-config.js");
const { sendMail } = require("../../utils/send-mail.js");
const User = require("../../models/users/model.js");

const salt = configurations.salt;
const jwtSecret = configurations.jwtSecret;
const frontendBaseUrl = configurations.frontendBaseUrl;

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isExpired =
        existingUser.emailVerified === false &&
        existingUser.emailVerificationCodeExpiry < new Date();

      if (!isExpired) {
        return res.status(409).json({
          message: "User already exists",
          response: null,
          error: "User already exists",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const codeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (!existingUser) {
      const newUser = new User({
        email,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationCode: verificationCode,
        emailVerificationCodeExpiry: codeExpiry,
      });
      await newUser.save();
    } else {
      existingUser.password = hashedPassword;
      existingUser.emailVerificationCode = verificationCode;
      existingUser.emailVerificationCodeExpiry = codeExpiry;
      await existingUser.save();
    }

    const dynamicData = {
      verification_code: verificationCode,
      to_email: email,
    };
    await sendMail(configs.templates.verifyEmail, dynamicData);

    return res.status(201).json({
      message: "Signup successfully",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        response: null,
        error: "Invalid credentials",
      });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        message: "Email not verified",
        response: null,
        error: "Email not verified",
      });
    }

    const token = jwt.sign({ user: { email } }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "You've successfully logged in",
      response: {
        token,
        data: {
          email,
        },
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      emailVerificationCode: code,
      emailVerificationCodeExpiry: { $gt: Date.now() },
    }).select("id");
    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired verification code",
        response: null,
        error: "Invalid or expired verification code",
      });
    }

    await User.findByIdAndUpdate(user.id, {
      emailVerified: true,
      emailVerificationCode: null,
      emailVerificationCodeExpiry: null,
    });

    return res.status(200).json({
      message: "Email verification successful",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id).select("password");
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Current password does not match",
        response: null,
        error: "Current password does not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.status(200).json({
      message: "Password updated successfully",
      response: null,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select(
      "emailVerified"
    );
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

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const forgotPasswordCodeExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await User.findByIdAndUpdate(user.id, {
      forgotPasswordCode: verificationCode,
      forgotPasswordCodeExpiry,
    });

    const dynamicData = {
      verification_code: verificationCode,
      to_email: email,
    };
    await sendMail(configs.templates.userForgotPassword, dynamicData);

    return res.status(200).json({
      message: "Email has been sent successfully for reset password",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { code } = req.body;
    const { password } = req.body;

    const user = await User.findOne({
      forgotPasswordCode: code,
      forgotPasswordCodeExpiry: { $gt: Date.now() },
    }).select("email");
    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired reset code",
        response: null,
        error: "Invalid or expired reset code",
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(user.id, {
      password: hashedPassword,
      forgotPasswordCode: null,
      forgotPasswordCodeExpiry: null,
    });

    const url = `${frontendBaseUrl}/login`;
    const dynamicData = {
      url: url,
      to_email: user.email,
    };
    await sendMail(
      configs.templates.userResetPasswordConfirmation,
      dynamicData
    );

    return res.status(200).json({
      message: "Password reset successfully",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};
