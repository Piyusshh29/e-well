
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const moodRoutes = require("./routes/moodRoutes");
const waterRoutes = require("./routes/waterRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const profileRoutes = require("./routes/profileRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const stressRoutes = require("./routes/stressRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to E-WELL Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rpg", rpgRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stress", stressRoutes);

module.exports = app;
