const express = require("express");
const router = express.Router();
const { logSleep, getSleepHistory } = require("../controllers/sleepController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, logSleep);
router.get("/", authMiddleware, getSleepHistory);

module.exports = router;
