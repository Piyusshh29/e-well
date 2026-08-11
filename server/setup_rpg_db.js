const db = require('./config/db');

const checkAndCreateTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_rpg_stats (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        hp INTEGER DEFAULT 100,
        mp INTEGER DEFAULT 100,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'user_rpg_stats' verified/created successfully.");
  } catch (error) {
    console.error("Error checking/creating table:", error);
  } finally {
    process.exit();
  }
};

checkAndCreateTable();
