
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  logStress,
  getStressHistory,
} = require("../controllers/stressController");

router.post("/", authMiddleware, logStress);
router.get("/", authMiddleware, getStressHistory);

module.exports = router;
