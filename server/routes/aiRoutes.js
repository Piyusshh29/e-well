
const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getHistory,
  getWellnessAdvice,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

// Existing chat endpoints.
router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, getHistory);

// New personalized wellness endpoint.
router.get("/wellness-coach", authMiddleware, getWellnessAdvice);

module.exports = router;
