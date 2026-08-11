import {
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AppointmentCard() {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Upcoming Appointment
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "#1976d2",
            fontSize: 22,
          }}
        >
          D
        </Avatar>

        <Box>
          <Typography fontWeight="bold">
            Dr. Sarah Johnson
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Cardiologist
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ mb: 1 }}>
        📅 Date: 25 July 2026
      </Typography>

      <Typography sx={{ mb: 1 }}>
        🕒 Time: 10:30 AM
      </Typography>

      <Typography sx={{ mb: 3 }}>
        📍 City Hospital
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate('/appointments')}
        sx={{
          borderRadius: 2,
          textTransform: "none",
        }}
      >
        View Details
      </Button>
    </Paper>
  );
}