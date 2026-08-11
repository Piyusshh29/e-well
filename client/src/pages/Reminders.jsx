import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, TextField, Button, Paper } from "@mui/material";
import { NotificationsActive, DeleteOutline, Add } from "@mui/icons-material";

export default function Reminders() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("ewell_reminders");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: "Drink a glass of water when waking up", completed: false },
      { id: 2, text: "15 minutes of Meditation before bed", completed: false },
      { id: 3, text: "Log mood after work", completed: true },
    ];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("ewell_reminders", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <NotificationsActive sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Daily Reminders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Keep track of your personal wellness goals and habits.
          </Typography>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box component="form" onSubmit={handleAdd} sx={{ p: 2, display: 'flex', bgcolor: 'primary.light', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a new reminder..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <Button type="submit" variant="contained" color="primary" disabled={!newTask.trim()}>
            <Add />
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {tasks.length === 0 ? (
            <Typography variant="body1" sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              No reminders set! You're all caught up.
            </Typography>
          ) : (
            tasks.map((task) => (
              <ListItem key={task.id} divider sx={{ py: 2 }}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  color="primary"
                />
                <ListItemText 
                  primary={task.text} 
                  sx={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.6 : 1 }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="error" onClick={() => handleDelete(task.id)}>
                    <DeleteOutline />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}