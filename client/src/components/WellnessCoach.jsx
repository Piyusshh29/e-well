
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import axios from "axios";

export default function WellnessCoach() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAdvice = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in again to continue.");
      return;
    }

    setLoading(true);
    setError("");
    setAdvice("");

    try {
      const response = await axios.get("/api/ai/wellness-coach", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.advice) {
        setAdvice(response.data.advice);
      } else {
        setError("No advice received. Please try again.");
      }
    } catch (err) {
      console.error("Wellness Coach error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to get wellness advice. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid #dcebe3",
        background:
          "linear-gradient(125deg, #f0faf5 0%, #f4f8ff 58%, #f8f7ff 100%)",
      }}
    >
      {/* Decorative header */}
      <Box
        sx={{
          px: { xs: 2.5, md: 4 },
          pt: { xs: 3, md: 4 },
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 2.5,
          }}
        >
          <Chip
            label="YOUR PERSONAL WELLNESS SPACE"
            size="small"
            sx={{
              bgcolor: "#d9f3e5",
              color: "#176b4d",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: 0.7,
              borderRadius: 2,
            }}
          />

          <Typography
            variant="caption"
            sx={{ color: "#527568", fontWeight: 600 }}
          >
            Small steps. Better days.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              minWidth: 54,
              borderRadius: 3,
              bgcolor: "#d9f3e5",
              color: "#176b4d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 27,
            }}
          >
            ✦
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#183d32",
                fontWeight: 800,
                letterSpacing: -0.5,
                mb: 0.8,
              }}
            >
              Your AI Wellness Coach
            </Typography>

            <Typography
              sx={{
                color: "#5d756d",
                fontSize: 14,
                lineHeight: 1.8,
                maxWidth: 620,
              }}
            >
              Take a moment for yourself. Get personalized suggestions
              based on your wellness records and build healthier daily habits.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(205,229,216,0.8)",
          }}
        >
          <Typography
            sx={{
              color: "#36594b",
              fontWeight: 700,
              fontSize: 14,
              mb: 0.5,
            }}
          >
            A little guidance can go a long way
          </Typography>

          <Typography
            sx={{
              color: "#6a8077",
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            Review your recent wellness patterns and discover practical
            steps to support your everyday well-being.
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          px: { xs: 2.5, md: 4 },
          pt: 1,
          pb: "28px !important",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={getAdvice}
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: 15,
            fontWeight: 700,
            color: "#ffffff",
            bgcolor: "#217a58",
            boxShadow: "0 5px 14px rgba(33,122,88,0.16)",
            "&:hover": {
              bgcolor: "#176747",
              boxShadow: "0 7px 18px rgba(33,122,88,0.23)",
            },
            "&.Mui-disabled": {
              bgcolor: "#a8cdbb",
              color: "#ffffff",
            },
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <CircularProgress size={19} color="inherit" />
              <span>Preparing your recommendations...</span>
            </Box>
          ) : (
            "Get My Wellness Advice  →"
          )}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {advice && (
          <Box
            sx={{
              mt: 3,
              bgcolor: "#ffffff",
              border: "1px solid #dcebe3",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(34,78,58,0.04)",
            }}
          >
            <Box sx={{ px: 2.5, py: 2, bgcolor: "#eaf7ef" }}>
              <Typography
                sx={{
                  color: "#205b43",
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                Your Personalized Recommendations
              </Typography>

              <Typography
                sx={{ color: "#688276", fontSize: 12, mt: 0.5 }}
              >
                Suggestions from your AI wellness coach
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography
                component="div"
                sx={{
                  color: "#354b41",
                  fontSize: 14,
                  lineHeight: 2,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {advice}
              </Typography>
            </Box>

            <Box
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: "#f6faf7",
                borderTop: "1px solid #e7f0ea",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#70877b", lineHeight: 1.6 }}
              >
                Your wellness journey is personal. Choose the suggestions
                that feel right for you.
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
