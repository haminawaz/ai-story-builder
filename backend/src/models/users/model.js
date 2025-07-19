const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
      default: null,
    },
    emailVerificationCodeExpiry: {
      type: Date,
      default: null,
    },
    forgotPasswordCode: {
      type: String,
      default: null,
    },
    forgotPasswordCodeExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
