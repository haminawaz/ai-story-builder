require("dotenv").config();
const mongoose = require("mongoose");
const {configurations} = require("./config");
const Plan = require("../models/plans/model");
const mongoString = configurations.mongoDbUrl;

mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log("Mongodb connection error:", error);
  });

const runSeeder = async () => {
  try {
    await mongoose.connect(mongoString);
    await Plan.seedDefaultPlans();
    console.log("Plans seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding plans:", err);
    process.exit(1);
  }
};

// runSeeder();

module.exports = mongoose;
