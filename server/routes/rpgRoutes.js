const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/rpgController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, getStats);

module.exports = router;
