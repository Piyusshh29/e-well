
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Avatar,
  Paper,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import { Send, SmartToy, Person } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/ai/chat";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const message = input.trim();
    if (!message || sending) return;

    setInput("");
    setError("");
    setSending(true);

    const timestamp = new Date().toISOString();

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      created_at: timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(API_URL, { message });

      if (!response.data.success || !response.data.answer) {
        throw new Error(
          response.data.message || "No answer was returned."
        );
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: response.data.answer,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(
        "Failed to send message:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to contact E-WELL AI. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1.5, md: 3 },
        height: "calc(100vh - 100px)",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        AI Health Assistant
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Chat with E-WELL AI for practical guidance on sleep, stress,
        relaxation, hydration, and healthy habits.
      </Typography>

      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          flexGrow: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            p: 0,
            "&:last-child": { pb: 0 },
          }}
        >
          {/* Chat messages */}
          <Box
            sx={{
              flexGrow: 1,
              minHeight: 0,
              overflowY: "auto",
              p: { xs: 1.5, md: 3 },
              bgcolor: "#F8FAFC",
            }}
          >
            {messages.length === 0 && !sending && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 250,
                  textAlign: "center",
                }}
              >
                <SmartToy
                  sx={{ fontSize: 60, mb: 2, color: "primary.main" }}
                />
                <Typography variant="h6">
                  Welcome to E-WELL!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ask me about study stress, sleep, or healthy routines.
                </Typography>
              </Box>
            )}

            {messages.map((msg) => {
              const isAI = msg.role === "ai";

              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    justifyContent: isAI ? "flex-start" : "flex-end",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  {isAI && (
                    <Avatar sx={{ bgcolor: "primary.main", mr: 1, mt: 1 }}>
                      <SmartToy />
                    </Avatar>
                  )}

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: { xs: "85%", md: "70%" },
                      overflowWrap: "anywhere",
                      borderRadius: 3,
                      bgcolor: isAI ? "#fff" : "primary.main",
                      color: isAI ? "text.primary" : "#fff",
                      borderTopLeftRadius: isAI ? 1 : 12,
                      borderTopRightRadius: isAI ? 12 : 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.content}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        opacity: 0.7,
                        textAlign: isAI ? "left" : "right",
                      }}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Paper>

                  {!isAI && (
                    <Avatar sx={{ bgcolor: "grey.400", ml: 1, mt: 1 }}>
                      <Person />
                    </Avatar>
                  )}
                </Box>
              );
            })}

            {sending && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                  <SmartToy />
                </Avatar>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <CircularProgress size={22} />
                </Paper>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ m: 1 }}
            >
              {error}
            </Alert>
          )}

          <Divider />

          {/* Message input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}
          >
            <TextField
              fullWidth
              placeholder="Ask E-WELL about stress, sleep, or wellness..."
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              inputProps={{ maxLength: 4000 }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 5 },
              }}
            />

            <IconButton
              color="primary"
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || sending}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": { bgcolor: "primary.dark" },
                "&.Mui-disabled": {
                  bgcolor: "action.disabledBackground",
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
