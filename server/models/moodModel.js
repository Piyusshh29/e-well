const db = require("../config/db");

const createMood = async (user_id, mood) => {
  const result = await db.query(
    `
    INSERT INTO mood_entries (user_id, mood)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [user_id, mood]
  );

  return result.rows[0];
};

const getMoodsByUser = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM mood_entries
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

module.exports = {
  createMood,
  getMoodsByUser,
};
