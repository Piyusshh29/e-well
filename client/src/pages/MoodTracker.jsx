import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentNeutral,
  SentimentVerySatisfied,
  MoodBad,
} from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/mood";

const MOODS = [
  { label: "Happy", icon: <SentimentVerySatisfied />, color: "success" },
  { label: "Good", icon: <SentimentSatisfiedAlt />, color: "primary" },
  { label: "Neutral", icon: <SentimentNeutral />, color: "info" },
  { label: "Sad", icon: <SentimentVeryDissatisfied />, color: "warning" },
  { label: "Stressed", icon: <MoodBad />, color: "error" },
];

export default function MoodTracker() {
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMoods(response.data.moods);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      setError(`Failed to load mood history: ${errorMsg}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleLogMood = async (moodLabel) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        API_URL,
        { mood: moodLabel },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMoods();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to log mood: ${errorMsg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Mood Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        How are you feeling today?
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Log Your Mood
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {MOODS.map((mood) => (
                  <Grid item xs={6} sm={4} key={mood.label}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color={mood.color}
                      size="large"
                      startIcon={mood.icon}
                      onClick={() => handleLogMood(mood.label)}
                      disabled={submitting}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      {mood.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mood History
              </Typography>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : moods.length === 0 ? (
                <Typography color="text.secondary">No moods logged yet.</Typography>
              ) : (
                <Paper variant="outlined" sx={{ maxHeight: 300, overflow: "auto", borderRadius: 2 }}>
                  <List>
                    {moods.map((entry, index) => (
                      <div key={entry.id || index}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight="bold">
                                {entry.mood}
                              </Typography>
                            }
                            secondary={new Date(entry.created_at).toLocaleString()}
                          />
                        </ListItem>
                        {index < moods.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}