const db = require("../config/db");

// Create User
const createUser = async (full_name, email, password, role) => {

    const query = `
        INSERT INTO users (full_name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [full_name, email, password, role];

    const result = await db.query(query, values);

    return result.rows[0];
};

// Find User By Email
const findUserByEmail = async (email) => {

    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};