import { useState } from "react";
import { Box, Typography, Card, CardContent, Slider, Button, Chip } from "@mui/material";
import { Psychology, LocalFireDepartment, Spa, SentimentSatisfied, SentimentVeryDissatisfied } from "@mui/icons-material";

const stressTriggers = ["Work", "Finances", "Health", "Relationships", "Family", "Lack of Sleep"];

export default function StressMonitor() {
  const [level, setLevel] = useState(5);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTrigger = (trigger) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const getLevelColor = (val) => {
    if (val <= 3) return "#22c55e"; // green
    if (val <= 7) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Psychology sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Stress Monitor
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Log your current stress level and identify common triggers.
          </Typography>
        </Box>
      </Box>

      {!submitted ? (
        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              How stressed are you feeling right now?
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', my: 4, px: 2 }}>
              <SentimentSatisfied sx={{ color: '#22c55e', mr: 2, fontSize: 32 }} />
              <Slider
                value={level}
                onChange={(_, val) => setLevel(val)}
                step={1}
                marks
                min={1}
                max={10}
                valueLabelDisplay="on"
                sx={{
                  color: getLevelColor(level),
                  '& .MuiSlider-valueLabel': {
                    bgcolor: getLevelColor(level),
                  }
                }}
              />
              <SentimentVeryDissatisfied sx={{ color: '#ef4444', ml: 2, fontSize: 32 }} />
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              What's contributing to your stress?
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {stressTriggers.map((trigger) => (
                <Chip
                  key={trigger}
                  label={trigger}
                  onClick={() => toggleTrigger(trigger)}
                  color={selectedTriggers.includes(trigger) ? "primary" : "default"}
                  variant={selectedTriggers.includes(trigger) ? "filled" : "outlined"}
                  sx={{ borderRadius: 2, px: 1 }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" size="large" onClick={() => setSubmitted(true)} sx={{ borderRadius: 4, px: 4 }}>
                Log Stress Level
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 6 }}>
          <CardContent>
            {level >= 7 ? (
              <LocalFireDepartment sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            ) : (
              <Spa sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            )}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Stress Level Logged
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {level >= 7 
                ? "Your stress level is high. We strongly recommend trying the Meditation timer to decompress."
                : "Your stress is manageable right now. Keep monitoring it!"}
            </Typography>
            <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ borderRadius: 4, px: 4 }}>
              Log Another Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}