const db = require('./config/db');

const checkAndCreateTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        age INTEGER,
        height NUMERIC,
        weight NUMERIC,
        fitness_goals TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'user_profiles' verified/created successfully.");
  } catch (error) {
    console.error("Error checking/creating table:", error);
  } finally {
    process.exit();
  }
};

checkAndCreateTable();
