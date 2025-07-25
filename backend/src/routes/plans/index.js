const { Router } = require("express");
const router = Router();
const {
  getAllPlans,
  createCheckout,
  checkoutComplete,
} = require("../../controllers/plans/index.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.post("/create-checkout-session", verifyUserToken, createCheckout);

router.post("/checkout", checkoutComplete);

router.get("/", verifyUserToken, getAllPlans);

module.exports = router;
