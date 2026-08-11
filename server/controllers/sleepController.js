const { createSleepEntry, getSleepHistoryByUser } = require("../models/sleepModel");

const logSleep = async (req, res) => {
  const { hours, quality } = req.body;
  const user_id = req.user.id;

  if (!hours || !quality) {
    return res.status(400).json({ success: false, message: "Please provide hours and quality" });
  }

  try {
    const newEntry = await createSleepEntry(user_id, hours, quality);
    res.status(201).json({ success: true, sleepEntry: newEntry });
  } catch (error) {
    console.error("Error in logSleep controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getSleepHistory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const history = await getSleepHistoryByUser(user_id);
    res.status(200).json({ success: true, sleepHistory: history });
  } catch (error) {
    console.error("Error in getSleepHistory controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  logSleep,
  getSleepHistory,
};
