const {
  createMood,
  getMoodsByUser,
} = require("../models/moodModel");

const addMood = async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood is required",
      });
    }

    const entry = await createMood(req.user.id, mood);

    res.status(201).json({
      success: true,
      message: "Mood saved successfully",
      entry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save mood",
    });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await getMoodsByUser(req.user.id);

    res.status(200).json({
      success: true,
      moods,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch moods",
    });
  }
};

module.exports = {
  addMood,
  getMoods,
};
