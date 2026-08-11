const { getStatsByUserId, updateStats, getRecentData } = require("../models/rpgModel");

const calculateStats = (currentStats, recentData) => {
  let { level, xp, hp, mp } = currentStats;
  
  // Base values decay slightly each day if not maintained, but we'll recalculate dynamically here
  // HP maxes at 100, based on sleep (8 hours = 100 HP, 4 hours = 50 HP)
  const calculatedHp = Math.min(100, Math.floor((recentData.sleepHours / 8) * 100));
  
  // MP maxes at 100, based on water (8 glasses = 100 MP)
  const calculatedMp = Math.min(100, Math.floor((recentData.waterGlasses / 8) * 100));
  
  // If HP/MP are calculated as 0, maybe they haven't logged today. We'll fallback to their stored values but decaying by 10%
  const newHp = calculatedHp > 0 ? calculatedHp : Math.max(0, Math.floor(hp - 5));
  const newMp = calculatedMp > 0 ? calculatedMp : Math.max(0, Math.floor(mp - 5));
  
  // XP Calculation
  let newXp = xp;
  if (calculatedHp > 0) newXp += 10;
  if (calculatedMp > 0) newXp += 10;
  
  // Mood bonus
  if (recentData.mood === "Happy") newXp += 20;
  if (recentData.mood === "Neutral") newXp += 10;
  
  // Level up logic
  let newLevel = level;
  while (newXp >= newLevel * 100) {
    newXp -= newLevel * 100;
    newLevel++;
  }
  
  return { level: newLevel, xp: newXp, hp: newHp, mp: newMp };
};

const getStats = async (req, res) => {
  const user_id = req.user.id;

  try {
    const currentStats = await getStatsByUserId(user_id);
    const recentData = await getRecentData(user_id);
    
    // Calculate new stats based on recent habits
    const { level, xp, hp, mp } = calculateStats(currentStats, recentData);
    
    // Update DB with new calculated stats
    const updatedStats = await updateStats(user_id, level, xp, hp, mp);
    
    res.status(200).json({ success: true, stats: updatedStats, recentData });
  } catch (error) {
    console.error("Error in getStats controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getStats
};
