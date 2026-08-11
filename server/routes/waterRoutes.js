const express = require("express");
const router = express.Router();
const { logWater, getWaterHistory } = require("../controllers/waterController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, logWater);
router.get("/", authMiddleware, getWaterHistory);

module.exports = router;
