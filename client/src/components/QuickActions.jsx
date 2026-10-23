import { Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  EventOutlined, 
  AssessmentOutlined, 
  NotificationsOutlined, 
  ErrorOutline,
  ArrowForward
} from "@mui/icons-material";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Book Appointment",
      subtitle: "SCHEDULE VISIT",
      actionText: "SELECT TIME",
      icon: <EventOutlined sx={{ fontSize: 20, color: '#A3E635' }} />,
      path: "/appointments",
      accent: "#A3E635"
    },
    {
      title: "View Reports",
      subtitle: "MEDICAL RECORDS",
      actionText: "VIEW DATA",
      icon: <AssessmentOutlined sx={{ fontSize: 20, color: '#A3E635' }} />,
      path: "/reports",
      accent: "#A3E635"
    },
    {
      title: "Medicine Reminder",
      subtitle: "DAILY ALERTS",
      actionText: "SET ALARM",
      icon: <NotificationsOutlined sx={{ fontSize: 20, color: '#A3E635' }} />,
      path: "/reminders",
      accent: "#A3E635"
    },
    {
      title: "Emergency",
      subtitle: "IMMEDIATE ASSISTANCE",
      actionText: "TRIGGER ALERT",
      icon: <ErrorOutline sx={{ fontSize: 20, color: '#A3E635' }} />,
      path: "/emergency", 
      accent: "#A3E635", 
      onClick: () => alert("Dialing Emergency Services... Please hold.")
    }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2} color="text.primary">
        Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              onClick={action.onClick ? action.onClick : () => navigate(action.path)}
              sx={{
                bgcolor: "#0A0D0B", 
                border: "1px solid #1E2A20", 
                borderRadius: 1,
                p: 2,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: 130,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#111713",
                  borderColor: "#2B3D2E",
                  "& .arrow-icon": {
                    transform: "translate(2px, -2px) rotate(-45deg)",
                    color: action.accent,
                  }
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: -1,
                  top: "20%",
                  bottom: "20%",
                  width: "2px",
                  bgcolor: action.accent,
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box 
                  sx={{ 
                    bgcolor: "rgba(163, 230, 53, 0.05)", 
                    p: 1, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    border: "1px solid rgba(163, 230, 53, 0.1)",
                    borderRadius: 1
                  }}
                >
                  {action.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ color: "#F3F4F6", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.2 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", letterSpacing: 1, fontSize: "0.65rem", textTransform: "uppercase" }}>
                    {action.subtitle}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 4, 
                    borderRadius: "50%", 
                    bgcolor: action.accent,
                    boxShadow: `0 0 6px ${action.accent}`,
                    mt: 1
                  }} 
                />
              </Box>

              <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Typography variant="caption" sx={{ color: "#4B5563", letterSpacing: 1.5, fontSize: "0.6rem", textTransform: "uppercase", fontWeight: 600 }}>
                  {action.actionText}
                </Typography>
                <ArrowForward 
                  className="arrow-icon"
                  sx={{ 
                    fontSize: 16, 
                    color: "#4B5563",
                    transition: "all 0.2s",
                    transform: "rotate(-45deg)"
                  }} 
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}