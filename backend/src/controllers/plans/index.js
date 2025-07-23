const Plan = require("../../models/plans/model");

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    if (plans.length === 0) {
      return res.status(404).json({
        message: "No plans found",
        response: null,
        error: "No plans found",
      });
    }

    return res.status(200).json({
      message: "All plans fetched successfully",
      response: plans,
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
  getAllPlans,
};
