const db = require('./config/db');

const checkAndCreateTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS water_entries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'water_entries' verified/created successfully.");
  } catch (error) {
    console.error("Error checking/creating table:", error);
  } finally {
    process.exit();
  }
};

checkAndCreateTable();
