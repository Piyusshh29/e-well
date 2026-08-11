import { Paper, Typography, Box } from "@mui/material";

const activities = [
  "💓 Blood Pressure Checked",
  "💊 Medicine Reminder Completed",
  "🏥 Appointment Booked",
  "🚶 Daily Walk Completed",
  "💧 Water Goal Achieved",
];

export default function ActivityTimeline() {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        📋 Recent Activity
      </Typography>

      {activities.map((item, index) => (
        <Box
          key={index}
          sx={{
            py: 1,
            borderBottom:
              index !== activities.length - 1
                ? "1px solid #eee"
                : "none",
          }}
        >
          <Typography>{item}</Typography>
        </Box>
      ))}
    </Paper>
  );
}