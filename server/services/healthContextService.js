
const db = require("../config/db");

async function getHealthContext(userId) {
  const [moodResult, sleepResult, waterResult, stressResult] =
    await Promise.all([
      db.query(
        `SELECT mood, created_at
         FROM mood_entries
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 7`,
        [userId]
      ),

      db.query(
        `SELECT hours, quality, created_at
         FROM sleep_entries
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 7`,
        [userId]
      ),

      db.query(
        `SELECT amount, created_at
         FROM water_entries
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 7`,
        [userId]
      ),

      db.query(
        `SELECT level, triggers, created_at
         FROM stress_entries
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 7`,
        [userId]
      ),
    ]);

  return {
    mood: moodResult.rows,
    sleep: sleepResult.rows,
    water: waterResult.rows,
    stress: stressResult.rows,
  };
}

module.exports = { getHealthContext };
