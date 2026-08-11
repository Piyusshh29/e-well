import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import { Person, Save, Edit } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/profile";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    fitness_goals: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const { full_name, email, age, height, weight, fitness_goals } = response.data.profile;
        setProfileData({
          full_name: full_name || "",
          email: email || "",
          age: age || "",
          height: height || "",
          weight: weight || "",
          fitness_goals: fitness_goals || "",
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setError("Failed to load profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_URL,
        {
          age: profileData.age,
          height: profileData.height,
          weight: profileData.weight,
          fitness_goals: profileData.fitness_goals,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setEditing(false);
      }
    } catch (err) {
      alert("Failed to save profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

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

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        User Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information and wellness metrics.
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header section */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", mr: 3 }}>
              <Person sx={{ fontSize: 50 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {profileData.full_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Wellness Metrics</Typography>
            {!editing && (
              <Button startIcon={<Edit />} variant="outlined" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Box>

          <Box component="form" onSubmit={handleSave}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={profileData.age}
                  onChange={handleChange}
                  disabled={!editing}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={profileData.height}
                  onChange={handleChange}
                  disabled={!editing}
                  InputProps={{ inputProps: { min: 0, step: "0.1" } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={profileData.weight}
                  onChange={handleChange}
                  disabled={!editing}
                  InputProps={{ inputProps: { min: 0, step: "0.1" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Goals"
                  name="fitness_goals"
                  multiline
                  rows={4}
                  value={profileData.fitness_goals}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="E.g., Drink more water, improve sleep quality, exercise 3 times a week..."
                />
              </Grid>
            </Grid>

            {editing && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
                <Button variant="text" onClick={() => setEditing(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={saving} startIcon={saving ? <CircularProgress size={20} /> : <Save />}>
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}