const db = require("../config/db");

const saveMessage = async (user_id, role, content) => {
  const result = await db.query(
    `
    INSERT INTO ai_messages (user_id, role, content)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [user_id, role, content]
  );

  return result.rows[0];
};

const getMessagesByUser = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM ai_messages
    WHERE user_id = $1
    ORDER BY created_at ASC;
    `,
    [user_id]
  );

  return result.rows;
};

module.exports = {
  saveMessage,
  getMessagesByUser,
};
