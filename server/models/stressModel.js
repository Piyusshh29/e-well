
const db = require("../config/db");

const createStressEntry = async (userId, level, triggers) => {
  const result = await db.query(
    `INSERT INTO stress_entries (user_id, level, triggers)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, level, triggers]
  );

  return result.rows[0];
};

const getStressHistoryByUser = async (userId) => {
  const result = await db.query(
    `SELECT id, level, triggers, created_at
     FROM stress_entries
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 7`,
    [userId]
  );

  return result.rows;
};

module.exports = {
  createStressEntry,
  getStressHistoryByUser,
};
