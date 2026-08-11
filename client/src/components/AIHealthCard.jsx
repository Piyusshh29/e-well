import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AIHealthCard() {
  const navigate = useNavigate();
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        🤖 AI Health Assistant
      </Typography>

      <Box mb={2}>
        <Typography>💧 Drink at least 2.5 L of water today.</Typography>
      </Box>

      <Box mb={2}>
        <Typography>🚶 Walk 6000+ steps today.</Typography>
      </Box>

      <Box mb={2}>
        <Typography>😴 Sleep before 11:00 PM.</Typography>
      </Box>

      <Box mb={3}>
        <Typography>🍎 Include more fruits in your diet.</Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={() => navigate('/ai-chat')}>
        View Suggestions
      </Button>
    </Paper>
  );
}