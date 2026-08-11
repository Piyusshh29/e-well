import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import { EventAvailable, CheckCircleOutline, CancelOutlined } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/appointments";

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      setError(`Failed to load appointments: ${errorMsg}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    if (!doctorName || !date || !time) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        API_URL,
        { doctor_name: doctorName, date, time, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDoctorName("");
      setDate("");
      setTime("");
      setNotes("");
      fetchAppointments();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to add appointment: ${errorMsg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to update appointment: ${errorMsg}`);
    }
  };

  const isPast = (dateStr) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d <= today;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'primary'; // Upcoming
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Appointments
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Schedule and track your health and wellness visits.
      </Typography>

      <Grid container spacing={4}>
        {/* Log Appointment Form */}
        <Grid item xs={12} md={5}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Appointment
              </Typography>
              <Box component="form" onSubmit={handleCreateAppointment} sx={{ mt: 2 }}>
                <TextField
                  label="Doctor / Specialist Name"
                  fullWidth
                  required
                  margin="normal"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                  label="Notes (Optional)"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<EventAvailable />}
                  disabled={submitting || !doctorName || !date || !time}
                  sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                >
                  Schedule
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12} md={7}>
          <Card elevation={3} sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Your Appointments
              </Typography>
              
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : appointments.length === 0 ? (
                <Typography color="text.secondary">No appointments scheduled.</Typography>
              ) : (
                <Paper variant="outlined" sx={{ maxHeight: 500, overflow: "auto", borderRadius: 2, mt: 2 }}>
                  <List>
                    {appointments.map((appt, index) => (
                      <div key={appt.id || index}>
                        <ListItem
                          secondaryAction={
                            appt.status === 'Upcoming' && (
                              <Box>
                                {isPast(appt.date) && (
                                  <IconButton edge="end" color="success" onClick={() => handleUpdateStatus(appt.id, 'Completed')} title="Mark Completed">
                                    <CheckCircleOutline />
                                  </IconButton>
                                )}
                                <IconButton edge="end" color="error" onClick={() => handleUpdateStatus(appt.id, 'Cancelled')} title="Cancel">
                                  <CancelOutlined />
                                </IconButton>
                              </Box>
                            )
                          }
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {appt.doctor_name}
                                </Typography>
                                <Chip label={appt.status} size="small" color={getStatusColor(appt.status)} />
                              </Box>
                            }
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {new Date(appt.date).toLocaleDateString()} at {appt.time}
                                </Typography>
                                {appt.notes && (
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Notes: {appt.notes}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                        </ListItem>
                        {index < appointments.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}