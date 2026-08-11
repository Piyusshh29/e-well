const { getProfileByUserId, upsertProfile } = require("../models/profileModel");

const getProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const profile = await getProfileByUserId(user_id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error in getProfile controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const user_id = req.user.id;
  const { age, height, weight, fitness_goals } = req.body;

  try {
    await upsertProfile(user_id, age || null, height || null, weight || null, fitness_goals || "");
    const updatedProfile = await getProfileByUserId(user_id);
    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
