const { Schema, model, Types } = require("mongoose");

const subscriptionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    paymentId: {
      type: Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Subscription", subscriptionSchema);
