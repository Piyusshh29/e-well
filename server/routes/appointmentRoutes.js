const express = require("express");
const router = express.Router();
const { logAppointment, getAppointments, updateStatus } = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, logAppointment);
router.get("/", authMiddleware, getAppointments);
router.patch("/:id", authMiddleware, updateStatus);

module.exports = router;
