
import { useState, useEffect } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import axios from "axios";

import StatCard from "../components/StatCard";
import HealthChart from "../components/HealthChart";
import AppointmentCard from "../components/AppointmentCard";
import AIHealthCard from "../components/AIHealthCard";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import WellnessCoach from "../components/WellnessCoach";

export default function Dashboard() {
  const [stats, setStats] = useState({
    heartRate: "76",
    sleep: "0",
    water: "0",
    mood: "Not Logged",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && response.data.stats) {
          setStats((previous) => ({
            ...previous,
            ...response.data.stats,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Heart Rate" value={`${stats.heartRate} BPM`} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Sleep" value={`${stats.sleep} hrs`} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Water Intake" value={`${stats.water} L`} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Mood" value={stats.mood} />
      </Grid>

      <Grid item xs={12} md={8}>
        <HealthChart />
      </Grid>

      <Grid item xs={12} md={4}>
        <AppointmentCard />
      </Grid>
      <Grid item xs={12}>
        <WellnessCoach />
      </Grid>

      <Grid item xs={12} md={6}>
        <AIHealthCard />
      </Grid>

      <Grid item xs={12} md={6}>
        <ActivityTimeline />
      </Grid>

      <Grid item xs={12}>
        <QuickActions />
      </Grid>
    </Grid>
  );
}
