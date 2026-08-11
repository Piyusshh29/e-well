const { createWaterEntry, getWaterHistoryByUser } = require("../models/waterModel");

const logWater = async (req, res) => {
  const { amount } = req.body;
  const user_id = req.user.id;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Please provide water amount" });
  }

  try {
    const newEntry = await createWaterEntry(user_id, amount);
    res.status(201).json({ success: true, waterEntry: newEntry });
  } catch (error) {
    console.error("Error in logWater controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getWaterHistory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const history = await getWaterHistoryByUser(user_id);
    res.status(200).json({ success: true, waterHistory: history });
  } catch (error) {
    console.error("Error in getWaterHistory controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  logWater,
  getWaterHistory,
};
