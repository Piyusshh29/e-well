const { getRecentData } = require("../models/rpgModel");

const getDashboardStats = async (req, res) => {
  const user_id = req.user.id;

  try {
    const recentData = await getRecentData(user_id);
    
    res.status(200).json({
      success: true,
      stats: {
        sleep: recentData.sleepHours,
        water: (recentData.waterGlasses * 0.25).toFixed(1), // Convert glasses to Liters
        mood: recentData.mood || "Not Logged",
        heartRate: "76" // Stub value for hardware integration
      }
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getDashboardStats
};
