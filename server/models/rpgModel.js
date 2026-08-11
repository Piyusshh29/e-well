const db = require("../config/db");

const getStatsByUserId = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM user_rpg_stats
    WHERE user_id = $1;
    `,
    [user_id]
  );
  
  if (result.rows.length === 0) {
    const newStats = await db.query(
      `
      INSERT INTO user_rpg_stats (user_id)
      VALUES ($1)
      RETURNING *;
      `,
      [user_id]
    );
    return newStats.rows[0];
  }
  
  return result.rows[0];
};

const updateStats = async (user_id, level, xp, hp, mp) => {
  const result = await db.query(
    `
    UPDATE user_rpg_stats
    SET level = $1, xp = $2, hp = $3, mp = $4, last_updated = CURRENT_TIMESTAMP
    WHERE user_id = $5
    RETURNING *;
    `,
    [level, xp, hp, mp, user_id]
  );
  return result.rows[0];
};

const getRecentData = async (user_id) => {
  // Aggregate recent sleep, water, and mood data to calculate dynamic stats
  const sleepRes = await db.query(
    `SELECT COALESCE(SUM(hours), 0) as total_sleep FROM sleep_entries WHERE user_id = $1 AND created_at >= CURRENT_DATE - INTERVAL '1 day'`,
    [user_id]
  );
  
  const waterRes = await db.query(
    `SELECT COALESCE(SUM(amount), 0) as total_water FROM water_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE`,
    [user_id]
  );
  
  const moodRes = await db.query(
    `SELECT mood FROM mood_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE LIMIT 1`,
    [user_id]
  );
  
  return {
    sleepHours: parseFloat(sleepRes.rows[0].total_sleep) || 0,
    waterGlasses: parseInt(waterRes.rows[0].total_water) || 0,
    mood: moodRes.rows.length > 0 ? moodRes.rows[0].mood : null
  };
};

module.exports = {
  getStatsByUserId,
  updateStats,
  getRecentData
};
