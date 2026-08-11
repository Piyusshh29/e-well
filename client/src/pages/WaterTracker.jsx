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
import { LocalDrink, AddCircleOutline } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/water";
const DAILY_GOAL = 8; // 8 glasses a day

export default function WaterTracker() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchWater = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setHistory(response.data.waterHistory);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      setError(`Failed to load water history: ${errorMsg}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWater();
  }, []);

  const handleLogWater = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        API_URL,
        { amount: 1 }, // 1 glass
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWater();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to log water: ${errorMsg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate today's total
  const today = new Date().setHours(0, 0, 0, 0);
  const todaysWater = history.filter((entry) => {
    const entryDate = new Date(entry.created_at).setHours(0, 0, 0, 0);
    return entryDate === today;
  });
  
  const totalGlassesToday = todaysWater.reduce((sum, entry) => sum + entry.amount, 0);
  const progress = Math.min((totalGlassesToday / DAILY_GOAL) * 100, 100);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Water Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Stay hydrated! Track your daily water intake.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Goal: {DAILY_GOAL} Glasses
              </Typography>
              
              <Box sx={{ position: 'relative', display: 'inline-flex', mt: 3, mb: 3 }}>
                <CircularProgress variant="determinate" value={progress} size={150} thickness={4} color="info" />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" component="div" color="text.secondary" fontWeight="bold">
                    {totalGlassesToday}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  startIcon={<AddCircleOutline />}
                  onClick={handleLogWater}
                  disabled={submitting}
                  sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                >
                  Add 1 Glass
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent History
              </Typography>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : history.length === 0 ? (
                <Typography color="text.secondary">No water logged yet.</Typography>
              ) : (
                <Paper variant="outlined" sx={{ maxHeight: 300, overflow: "auto", borderRadius: 2 }}>
                  <List>
                    {history.map((entry, index) => (
                      <div key={entry.id || index}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalDrink fontSize="small" sx={{ mr: 1, color: '#0288d1' }} />
                                {entry.amount} {entry.amount > 1 ? "Glasses" : "Glass"}
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
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}