const { Router } = require("express");
const router = Router();
const { createStory, generateStory } = require("../../controllers/story/index");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.post("/", verifyUserToken, createStory);
router.post("/generate", verifyUserToken, generateStory);

module.exports = router;
