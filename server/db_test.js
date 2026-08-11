const db = require('./config/db');

const checkAndCreateTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS mood_entries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        mood VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'mood_entries' verified/created successfully.");
  } catch (error) {
    console.error("Error checking/creating table:", error);
  } finally {
    process.exit();
  }
};

checkAndCreateTable();
