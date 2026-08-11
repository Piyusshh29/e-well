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
  TextField,
  MenuItem,
} from "@mui/material";
import { Bedtime } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:5000/api/sleep";

const QUALITIES = ["Poor", "Fair", "Good", "Excellent"];

export default function SleepTracker() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [hours, setHours] = useState("");
  const [quality, setQuality] = useState("");

  const fetchSleep = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setHistory(response.data.sleepHistory);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      setError(`Failed to load sleep history: ${errorMsg}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSleep();
  }, []);

  const handleLogSleep = async (e) => {
    e.preventDefault();
    if (!hours || !quality) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        API_URL,
        { hours: parseFloat(hours), quality },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHours("");
      setQuality("");
      fetchSleep();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to log sleep: ${errorMsg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Prepare data for chart (reverse to chronological order if it's descending from API)
  const chartData = [...history].reverse().slice(-7).map(entry => {
    const dateObj = new Date(entry.created_at);
    return {
      date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
      hours: parseFloat(entry.hours)
    };
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Sleep Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor your sleep patterns and quality to improve your well-being.
      </Typography>

      <Grid container spacing={4}>
        {/* Log Sleep Form */}
        <Grid item xs={12} md={5}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Log Sleep
              </Typography>
              <Box component="form" onSubmit={handleLogSleep} sx={{ mt: 2 }}>
                <TextField
                  label="Hours Slept"
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                  inputProps={{ step: "0.5", min: "0", max: "24" }}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <TextField
                  select
                  label="Sleep Quality"
                  fullWidth
                  required
                  margin="normal"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                >
                  {QUALITIES.map((q) => (
                    <MenuItem key={q} value={q}>
                      {q}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<Bedtime />}
                  disabled={submitting || !hours || !quality}
                  sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                >
                  Save Entry
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sleep Chart & History */}
        <Grid item xs={12} md={7}>
          <Card elevation={3} sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Recent Sleep (Last 7 Logs)
              </Typography>
              
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : history.length === 0 ? (
                <Typography color="text.secondary">No sleep logged yet.</Typography>
              ) : (
                <>
                  <Box sx={{ height: 250, mt: 2, mb: 4 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                        <Bar dataKey="hours" fill="#3f51b5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>

                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    History
                  </Typography>
                  <Paper variant="outlined" sx={{ maxHeight: 200, overflow: "auto", borderRadius: 2 }}>
                    <List>
                      {history.map((entry, index) => (
                        <div key={entry.id || index}>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {entry.hours} Hours ({entry.quality})
                                </Typography>
                              }
                              secondary={new Date(entry.created_at).toLocaleString()}
                            />
                          </ListItem>
                          {index < history.length - 1 && <Divider />}
                        </div>
                      ))}
                    </List>
                  </Paper>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}