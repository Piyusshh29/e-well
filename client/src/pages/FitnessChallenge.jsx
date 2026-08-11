import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Button,
  Chip,
  Stack,
} from "@mui/material";

const challenges = [
  {
    title: "Daily Steps",
    current: 5800,
    target: 7000,
    unit: "steps",
    symbol: "🚶",
    color: "#2563EB",
  },
  {
    title: "Water Goal",
    current: 2,
    target: 2.5,
    unit: "L",
    symbol: "💧",
    color: "#06B6D4",
  },
  {
    title: "Meditation",
    current: 10,
    target: 15,
    unit: "minutes",
    symbol: "🧘",
    color: "#7C3AED",
  },
  {
    title: "Stretch Break",
    current: 3,
    target: 5,
    unit: "breaks",
    symbol: "🏃",
    color: "#10B981",
  },
];

const leaderboard = [
  {
    rank: 1,
    department: "ISE",
    points: 920,
  },
  {
    rank: 2,
    department: "CSE",
    points: 860,
  },
  {
    rank: 3,
    department: "ECE",
    points: 790,
  },
  {
    rank: 4,
    department: "EEE",
    points: 710,
  },
  {
    rank: 5,
    department: "ME",
    points: 650,
  },
];

export default function FitnessChallenge() {
  const [joined, setJoined] = useState(false);

  const progressValues = challenges.map(
    (item) =>
      Math.min((item.current / item.target) * 100, 100)
  );

  const overallProgress = Math.round(
    progressValues.reduce((a, b) => a + b, 0) /
      progressValues.length
  );

  return (
    <Box>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Fitness Challenge
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Stay active, build healthy habits, and compete
        with your department.
      </Typography>

      {/* Overall Progress */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 4,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={2}
          mb={3}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Today's Wellness Challenge
            </Typography>

            <Typography color="text.secondary">
              Complete your daily wellness activities.
            </Typography>
          </Box>

          <Chip
            label={`${overallProgress}% Complete`}
            color="primary"
          />
        </Stack>

        <LinearProgress
          variant="determinate"
          value={overallProgress}
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />
      </Paper>

      {/* Challenge Cards */}
      <Grid container spacing={3}>
        {challenges.map((challenge) => {
          const progress = Math.min(
            (challenge.current / challenge.target) * 100,
            100
          );

          return (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={challenge.title}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 4,
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    bgcolor: challenge.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    mb: 2,
                  }}
                >
                  {challenge.symbol}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {challenge.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                >
                  {challenge.current} /{" "}
                  {challenge.target}{" "}
                  {challenge.unit}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {Math.round(progress)}% Complete
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Join Challenge */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 4,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Campus Wellness Challenge
            </Typography>

            <Typography color="text.secondary">
              Earn points by completing healthy
              activities.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => setJoined(!joined)}
            sx={{
              borderRadius: 3,
              px: 4,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {joined
              ? "Challenge Joined ✓"
              : "Join Challenge"}
          </Button>
        </Stack>
      </Paper>

      {/* Leaderboard */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 4,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          🏆 Department Leaderboard
        </Typography>

        <Stack spacing={1.5}>
          {leaderboard.map((item) => (
            <Box
              key={item.department}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor:
                  item.rank === 1
                    ? "#FFF7ED"
                    : "#F8FAFC",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontWeight="bold">
                #{item.rank} &nbsp;
                {item.department}
              </Typography>

              <Typography
                fontWeight="bold"
                color="primary"
              >
                {item.points} points
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}