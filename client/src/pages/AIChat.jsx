import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Divider
} from "@mui/material";
import { Send, SmartToy, Person } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/ai";

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input.trim();
    setInput("");

    // Optimistically add user message to UI
    const tempUserMsg = { id: Date.now(), role: "user", content: userMessageText, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, tempUserMsg]);
    setSending(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_URL,
        { content: userMessageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        // Replace temp message and add AI response
        const newMessages = response.data.messages; // [userMsg, aiMsg]
        setMessages((prev) => {
          // Remove the temp user message we added optimistically
          const filtered = prev.filter(m => m.id !== tempUserMsg.id);
          return [...filtered, ...newMessages];
        });
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      // Remove temp message on error
      setMessages((prev) => prev.filter(m => m.id !== tempUserMsg.id));
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ p: 3, height: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        AI Health Assistant
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Chat with your personal wellness AI to get advice on sleep, stress, and more.
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 3, flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 0, '&:last-child': { pb: 0 } }}>
          
          {/* Chat Messages Area */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3, bgcolor: "#F8FAFC" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
              </Box>
            ) : messages.length === 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.6 }}>
                <SmartToy sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
                <Typography variant="h6">Start a conversation!</Typography>
                <Typography variant="body2">Try asking about "sleep" or "stress".</Typography>
              </Box>
            ) : (
              messages.map((msg, idx) => {
                const isAI = msg.role === "ai";
                return (
                  <Box
                    key={msg.id || idx}
                    sx={{
                      display: "flex",
                      justifyContent: isAI ? "flex-start" : "flex-end",
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
                        maxWidth: "70%",
                        borderRadius: 3,
                        bgcolor: isAI ? "#fff" : "primary.main",
                        color: isAI ? "text.primary" : "#fff",
                        borderTopLeftRadius: isAI ? 4 : 12,
                        borderTopRightRadius: !isAI ? 4 : 12,
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                        {msg.content}
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.7, textAlign: isAI ? "left" : "right" }}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Paper>
                    {!isAI && (
                      <Avatar sx={{ bgcolor: "grey.400", ml: 1, mt: 1 }}>
                        <Person />
                      </Avatar>
                    )}
                  </Box>
                );
              })
            )}
            
            {sending && (
              <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 1, mt: 1 }}>
                  <SmartToy />
                </Avatar>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 3, bgcolor: "#fff", borderTopLeftRadius: 4 }}>
                   <CircularProgress size={20} />
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Divider />
          <Box component="form" onSubmit={handleSendMessage} sx={{ display: "flex", p: 2, bgcolor: "#fff" }}>
            <TextField
              fullWidth
              placeholder="Ask me anything..."
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              sx={{ mr: 2, "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
            <IconButton 
              color="primary" 
              type="submit" 
              disabled={!input.trim() || sending}
              sx={{ bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark" } }}
            >
              <Send />
            </IconButton>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}