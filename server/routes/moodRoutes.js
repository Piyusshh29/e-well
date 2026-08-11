const express = require("express");

const router = express.Router();

const {
  addMood,
  getMoods,
} = require("../controllers/moodController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addMood);
router.get("/", authMiddleware, getMoods);

module.exports = router;
