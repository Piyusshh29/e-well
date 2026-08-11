const db = require("../config/db");

const getProfileByUserId = async (user_id) => {
  const result = await db.query(
    `
    SELECT u.full_name, u.email, p.age, p.height, p.weight, p.fitness_goals
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.id = $1;
    `,
    [user_id]
  );
  return result.rows[0];
};

const upsertProfile = async (user_id, age, height, weight, fitness_goals) => {
  const result = await db.query(
    `
    INSERT INTO user_profiles (user_id, age, height, weight, fitness_goals, updated_at)
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id)
    DO UPDATE SET 
      age = EXCLUDED.age,
      height = EXCLUDED.height,
      weight = EXCLUDED.weight,
      fitness_goals = EXCLUDED.fitness_goals,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
    `,
    [user_id, age, height, weight, fitness_goals]
  );
  return result.rows[0];
};

module.exports = {
  getProfileByUserId,
  upsertProfile,
};
