import { useState } from "react";
import { Box, Typography, Card, CardContent, Button, LinearProgress, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material";
import { Assignment, CheckCircle } from "@mui/icons-material";

const questions = [
  "How often do you feel emotionally drained by your work or studies?",
  "How often do you feel you lack energy to do things you used to enjoy?",
  "How often do you struggle to concentrate or focus on tasks?",
  "How often do you feel detached or cynical about your responsibilities?",
  "How often do you experience physical symptoms of stress (headaches, tension)?",
];

const options = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

export default function BurnoutSurvey() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const handleSelect = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = parseInt(e.target.value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQ(0);
    setFinished(false);
  };

  const score = answers.reduce((a, b) => a + (b || 0), 0);
  const maxScore = questions.length * 5;
  const percentage = (score / maxScore) * 100;

  const getResult = () => {
    if (percentage < 30) return { title: "Low Risk", color: "success.main", desc: "You are doing great! Keep up your healthy habits." };
    if (percentage < 70) return { title: "Moderate Risk", color: "warning.main", desc: "You are showing some signs of stress. Consider taking more breaks." };
    return { title: "High Risk", color: "error.main", desc: "You are at high risk of burnout. Please prioritize rest and seek support if needed." };
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Assignment sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Burnout Survey
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Take a quick self-assessment to measure your current stress and burnout levels.
          </Typography>
        </Box>
      </Box>

      {!finished ? (
        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary" fontWeight="bold">
              Question {currentQ + 1} of {questions.length}
            </Typography>
            <LinearProgress variant="determinate" value={((currentQ) / questions.length) * 100} sx={{ height: 8, borderRadius: 4, my: 2 }} />
            
            <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
              {questions[currentQ]}
            </Typography>

            <RadioGroup value={answers[currentQ] || ""} onChange={handleSelect}>
              {options.map((opt) => (
                <Paper key={opt.value} variant="outlined" sx={{ mb: 2, p: 1, borderRadius: 2, bgcolor: answers[currentQ] === opt.value ? 'primary.light' : 'transparent', borderColor: answers[currentQ] === opt.value ? 'primary.main' : 'divider' }}>
                  <FormControlLabel
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                disabled={!answers[currentQ]}
                onClick={handleNext}
                sx={{ borderRadius: 4, px: 4 }}
              >
                {currentQ === questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 6 }}>
          <CardContent>
            <CheckCircle sx={{ fontSize: 80, color: getResult().color, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom color={getResult().color}>
              {getResult().title}
            </Typography>
            <Typography variant="h1" fontWeight="bold" sx={{ my: 3 }}>
              {Math.round(percentage)}%
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              {getResult().desc}
            </Typography>
            <Button variant="outlined" onClick={handleRestart} sx={{ borderRadius: 4, px: 4 }}>
              Take Survey Again
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}