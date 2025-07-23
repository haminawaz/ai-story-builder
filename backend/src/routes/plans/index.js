const { Router } = require("express");
const router = Router();
const { getAllPlans } = require("../../controllers/plans/index.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.get("/", verifyUserToken, getAllPlans);

module.exports = router;
