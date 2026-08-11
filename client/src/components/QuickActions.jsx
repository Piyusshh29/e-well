import { Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        ⚡ Quick Actions
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Button variant="contained" onClick={() => navigate('/appointments')}>
          Book Appointment
        </Button>

        <Button variant="outlined" onClick={() => navigate('/reports')}>
          View Reports
        </Button>

        <Button variant="outlined" onClick={() => navigate('/reminders')}>
          Medicine Reminder
        </Button>

        <Button color="error" variant="contained" onClick={() => alert("Dialing Emergency Services... Please hold.")}>
          Emergency
        </Button>
      </Stack>
    </Paper>
  );
}