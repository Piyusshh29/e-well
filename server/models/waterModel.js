const db = require("../config/db");

const createWaterEntry = async (user_id, amount) => {
  const result = await db.query(
    `
    INSERT INTO water_entries (user_id, amount)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [user_id, amount]
  );

  return result.rows[0];
};

const getWaterHistoryByUser = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM water_entries
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

module.exports = {
  createWaterEntry,
  getWaterHistoryByUser,
};
