const db = require("../config/db");

const createAppointment = async (user_id, doctor_name, date, time, notes) => {
  const result = await db.query(
    `
    INSERT INTO appointments (user_id, doctor_name, date, time, notes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [user_id, doctor_name, date, time, notes]
  );

  return result.rows[0];
};

const getAppointmentsByUser = async (user_id) => {
  const result = await db.query(
    `
    SELECT *
    FROM appointments
    WHERE user_id = $1
    ORDER BY date ASC, time ASC;
    `,
    [user_id]
  );

  return result.rows;
};

const updateAppointmentStatus = async (appointment_id, user_id, status) => {
  const result = await db.query(
    `
    UPDATE appointments
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
    `,
    [status, appointment_id, user_id]
  );

  return result.rows[0];
};

module.exports = {
  createAppointment,
  getAppointmentsByUser,
  updateAppointmentStatus,
};
