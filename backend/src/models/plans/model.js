const { Schema, model } = require("mongoose");

const planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: String,
      default: "monthly",
    },
    features: [String],
    featured: {
        type: Boolean,
        default: false,
    },
    bgGradient: {
        type: String,
        default: "bg-gradient-to-br from-[#565353] to-[#457B9D]"
    }
  },
  { timestamps: true }
);

planSchema.statics.seedDefaultPlans = async function () {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany([
      {
        name: "Plan A",
        type: "DIY",
        price: 20,
        billingCycle: "monthly",
        features: ["75 Free Stories"],
        bgGradient: "bg-gradient-to-br from-[#457B9D] to-[#565353]"
      },
      {
        name: "Plan B",
        type: "DWY",
        price: 50,
        billingCycle: "monthly",
        features: ["75 Free Stories", "12 week workshop"],
        featured: true,
        bgGradient: "bg-gradient-to-br from-[#457B9D] to-[#1D3557]"
      },
      {
        name: "Plan C",
        type: "DFY",
        price: 80,
        billingCycle: "monthly",
        features: [
          "75 Free Stories",
          "12 week workshop",
          "Complete guide in story publishing",
        ],
        bgGradient: "bg-gradient-to-br from-[#1D3557] to-[#565353]"
      },
    ]);
  }
};

module.exports = model("Plan", planSchema);
