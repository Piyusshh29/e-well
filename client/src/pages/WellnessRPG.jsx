import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Avatar,
  Chip,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  SportsEsports,
  Favorite,
  WaterDrop,
  Star,
  EmojiEvents,
  LocalFireDepartment,
} from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/rpg/stats";

export default function WellnessRPG() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setError("Failed to load RPG stats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" sx={{ p: 3 }}>{error}</Typography>;
  }

  const { level, xp, hp, mp } = stats;
  const xpNeeded = level * 100;
  const xpProgress = (xp / xpNeeded) * 100;

  const getRank = (lvl) => {
    if (lvl < 5) return "Novice";
    if (lvl < 10) return "Apprentice";
    if (lvl < 20) return "Adept";
    if (lvl < 50) return "Master";
    return "Grandmaster";
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SportsEsports sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Wellness RPG
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your real-life health metrics power your digital avatar.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Avatar Card */}
        <Grid item xs={12} md={5}>
          <Card elevation={4} sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}>
              <LocalFireDepartment sx={{ fontSize: 250 }} />
            </Box>
            
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Avatar src="/avatar-placeholder.png" sx={{ width: 120, height: 120, mx: "auto", mb: 2, border: '4px solid rgba(255,255,255,0.3)', bgcolor: 'rgba(255,255,255,0.1)' }}>
                <EmojiEvents sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Level {level} {getRank(level)}
              </Typography>
              
              <Chip 
                icon={<Star sx={{ color: '#fbbf24 !important' }}/>} 
                label={`${xp} / ${xpNeeded} XP`} 
                sx={{ bgcolor: 'rgba(0,0,0,0.3)', color: 'white', fontWeight: 'bold', mb: 3 }} 
              />
              
              <Box sx={{ width: '100%', mb: 1, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight="bold">XP Progress</Typography>
                  <Typography variant="body2">{Math.round(xpProgress)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={xpProgress} 
                  sx={{ height: 10, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#fbbf24' } }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Vital Stats */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Favorite sx={{ color: '#ef4444', fontSize: 32, mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight="bold">HP (Health Points)</Typography>
                        <Typography variant="h6" fontWeight="bold" color={hp < 30 ? 'error' : 'text.primary'}>{hp}/100</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Powered by your Sleep Tracker. Get 8 hours to restore full HP!
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={hp} 
                        sx={{ height: 14, borderRadius: 7, bgcolor: '#fee2e2', '& .MuiLinearProgress-bar': { bgcolor: '#ef4444' } }} 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WaterDrop sx={{ color: '#3b82f6', fontSize: 32, mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight="bold">MP (Mana / Energy)</Typography>
                        <Typography variant="h6" fontWeight="bold" color={mp < 30 ? 'error' : 'text.primary'}>{mp}/100</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Powered by your Water Tracker. Drink 8 glasses to max your Mana!
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={mp} 
                        sx={{ height: 14, borderRadius: 7, bgcolor: '#dbeafe', '& .MuiLinearProgress-bar': { bgcolor: '#3b82f6' } }} 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>

          <Paper elevation={0} sx={{ mt: 3, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              📜 Today's Quests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Log 8 glasses of water to restore your Mana.<br/>
              • Maintain a "Happy" mood for a 20 XP bonus.<br/>
              • Log your sleep tonight to regenerate your HP for tomorrow.
            </Typography>
          </Paper>

        </Grid>
      </Grid>
    </Box>
  );
}
