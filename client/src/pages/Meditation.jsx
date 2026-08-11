import { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { SelfImprovement, PlayArrow, Stop } from "@mui/icons-material";

export default function Meditation() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState("Inhale");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval = null;
    let phaseInterval = null;

    if (active && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      phaseInterval = setInterval(() => {
        setPhase((prev) => {
          if (prev === "Inhale") return "Hold";
          if (prev === "Hold") return "Exhale";
          return "Inhale";
        });
      }, 4000); // 4-7-8 breathing (simplified to 4s each here for symmetry)
    } else if (timeLeft === 0) {
      setActive(false);
      setPhase("Done");
    }

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, [active, timeLeft]);

  const handleToggle = () => {
    if (!active && timeLeft === 0) {
      setTimeLeft(60);
      setPhase("Inhale");
    }
    setActive(!active);
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mindful Breathing
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Take a moment to center yourself. Follow the circle's movement.
      </Typography>

      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.light",
          transition: "all 4s ease-in-out",
          transform: active && phase === "Inhale" ? "scale(1.5)" : active && phase === "Exhale" ? "scale(0.8)" : "scale(1)",
          boxShadow: active ? "0 0 40px rgba(59, 130, 246, 0.6)" : "none",
          mb: 8,
          mt: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
            zIndex: 2,
          }}
        >
          <SelfImprovement sx={{ fontSize: 60, color: "primary.main", mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {active ? phase : "Ready"}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </Typography>
        </Paper>
      </Box>

      <Button
        variant="contained"
        size="large"
        color={active ? "error" : "primary"}
        startIcon={active ? <Stop /> : <PlayArrow />}
        onClick={handleToggle}
        sx={{ borderRadius: 8, px: 4, py: 1.5, fontSize: "1.1rem" }}
      >
        {active ? "Stop Session" : timeLeft === 0 ? "Start Again" : "Start Session"}
      </Button>
    </Box>
  );
}