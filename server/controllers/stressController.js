
const stressModel = require("../models/stressModel");

const allowedTriggers = [
  "Work",
  "Finances",
  "Health",
  "Relationships",
  "Family",
  "Lack of Sleep",
];

const logStress = async (req, res) => {
  try {
    const { level, triggers = [] } = req.body;
    const userId = req.user.id;

    if (!Number.isInteger(level) || level < 1 || level > 10) {
      return res.status(400).json({
        success: false,
        message: "Stress level must be an integer from 1 to 10.",
      });
    }

    if (
      !Array.isArray(triggers) ||
      !triggers.every(
        (trigger) =>
          typeof trigger === "string" &&
          allowedTriggers.includes(trigger)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid stress triggers.",
      });
    }

    const entry = await stressModel.createStressEntry(
      userId,
      level,
      triggers
    );

    return res.status(201).json({
      success: true,
      message: "Stress entry saved successfully.",
      entry,
    });
  } catch (error) {
    console.error("Log stress error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save stress entry.",
    });
  }
};

const getStressHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await stressModel.getStressHistoryByUser(userId);

    return res.status(200).json({
      success: true,
      entries,
    });
  } catch (error) {
    console.error("Get stress history error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve stress history.",
    });
  }
};

module.exports = {
  logStress,
  getStressHistory,
};
