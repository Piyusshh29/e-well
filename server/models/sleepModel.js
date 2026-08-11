const db = require("../config/db");

const createSleepEntry = async (user_id, hours, quality) => {
  const result = await db.query(
    `
    INSERT INTO sleep_entries (user_id, hours, quality)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [user_id, hours, quality]
  );

  return result.rows[0];
};

const getSleepHistoryByUser = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM sleep_entries
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

module.exports = {
  createSleepEntry,
  getSleepHistoryByUser,
};
