const { createAppointment, getAppointmentsByUser, updateAppointmentStatus } = require("../models/appointmentModel");

const logAppointment = async (req, res) => {
  const { doctor_name, date, time, notes } = req.body;
  const user_id = req.user.id;

  if (!doctor_name || !date || !time) {
    return res.status(400).json({ success: false, message: "Please provide doctor name, date, and time" });
  }

  try {
    const newEntry = await createAppointment(user_id, doctor_name, date, time, notes || "");
    res.status(201).json({ success: true, appointment: newEntry });
  } catch (error) {
    console.error("Error in logAppointment controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAppointments = async (req, res) => {
  const user_id = req.user.id;

  try {
    const history = await getAppointmentsByUser(user_id);
    res.status(200).json({ success: true, appointments: history });
  } catch (error) {
    console.error("Error in getAppointments controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user_id = req.user.id;

  if (!status) {
    return res.status(400).json({ success: false, message: "Please provide a status" });
  }

  try {
    const updated = await updateAppointmentStatus(id, user_id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Error in updateStatus controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  logAppointment,
  getAppointments,
  updateStatus,
};
