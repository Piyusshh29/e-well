
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const suggestions = [
  {
    icon: "💧",
    text: "Stay hydrated throughout the day.",
  },
  {
    icon: "🚶",
    text: "Take regular walking and stretching breaks.",
  },
  {
    icon: "😴",
    text: "Maintain a consistent sleep schedule.",
  },
  {
    icon: "🍎",
    text: "Include fruits and balanced meals in your diet.",
  },
];

export default function AIHealthCard() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        🤖 AI Health Assistant
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Small steps to support your daily wellness.
      </Typography>

      {suggestions.map((suggestion) => (
        <Box
          key={suggestion.text}
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography>{suggestion.icon}</Typography>
          <Typography>{suggestion.text}</Typography>
        </Box>
      ))}

      <Box sx={{ flexGrow: 1 }} />

      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate("/ai-chat")}
      >
        Chat with E-WELL AI
      </Button>
    </Paper>
  );
}
