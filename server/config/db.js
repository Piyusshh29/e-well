const { Pool } = require("pg");

const pool = new Pool({
    user: "piyushkumar",
    host: "localhost",
    database: "ewell_db",
    password: "",
    port: 5432,
});

module.exports = pool;