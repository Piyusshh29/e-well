import { Paper, Typography, Box } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressCard() {
  const progress = 78;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        height: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={4}
      >
        Today's Health Score
      </Typography>

      <Box
        sx={{
          width: 180,
          height: 180,
        }}
      >
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textColor: "#2563EB",
            pathColor: "#2563EB",
            trailColor: "#E5E7EB",
            textSize: "16px",
          })}
        />
      </Box>

      <Typography
        variant="body1"
        mt={4}
        textAlign="center"
        color="text.secondary"
      >
        Great job! Your health metrics are looking good today.
      </Typography>
    </Paper>
  );
}