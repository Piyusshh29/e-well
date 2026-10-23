import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Dashboard,
  Mood,
  LocalDrink,
  Bedtime,
  Event,
  SmartToy,
  Person,
  Logout,
  Psychology,
  SportsEsports,
} from "@mui/icons-material";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const avatarOptions = [
  { id: 1, text: "U", bg: "#2563EB" },
  { id: 2, text: "🦊", bg: "#F97316" },
  { id: 3, text: "🐼", bg: "#14B8A6" },
  { id: 4, text: "🐯", bg: "#F59E0B" },
  { id: 5, text: "🦁", bg: "#EAB308" },
  { id: 6, text: "🐸", bg: "#22C55E" },
  { id: 7, text: "🦄", bg: "#D946EF" },
  { id: 8, text: "🐙", bg: "#EF4444" },
];

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Mood Tracker",
    icon: <Mood />,
    path: "/mood",
  },
  {
    text: "Stress Monitor",
    icon: <Psychology />,
    path: "/stress",
  },
  {
    text: "Wellness RPG",
    icon: <SportsEsports />,
    path: "/rpg",
  },
  {
  text: "Meditation",
  icon: <span style={{ fontSize: "22px" }}>🧘</span>,
  path: "/meditation",
  },
  {
  text: "Burnout Survey",
  icon: <span style={{ fontSize: "20px" }}>📋</span>,
  path: "/survey",
  },
  {
  text: "Community",
  icon: <span style={{ fontSize: "20px" }}>🤝</span>,
  path: "/community",
  },
  {
  text: "Reports",
  icon: <span style={{ fontSize: "20px" }}>📊</span>,
  path: "/reports",
  },
  {
  text: "Reminders",
  icon: <span style={{ fontSize: "20px" }}>🔔</span>,
  path: "/reminders",
  },
  {
    text: "Water Tracker",
    icon: <LocalDrink />,
    path: "/water",
  },
  {
    text: "Sleep Tracker",
    icon: <Bedtime />,
    path: "/sleep",
  },
  {
    text: "Appointments",
    icon: <Event />,
    path: "/appointments",
  },
  {
    text: "AI Health",
    icon: <SmartToy />,
    path: "/ai-chat",
  },
  {
    text: "Profile",
    icon: <Person />,
    path: "/profile",
  },
];

function Sidebar() {
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(avatarOptions[0]);

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleAvatarSelect = (avatar) => {
    setCurrentAvatar(avatar);
    handleAvatarClose();
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        boxShadow: "4px 0 15px rgba(0,0,0,.08)",
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#60A5FA",
            letterSpacing: 1,
          }}
        >
          E-WELL
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: 14,
            mt: 1,
          }}
        >
          Engineering Wellness
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "#334155" }} />

      {/* Menu */}

      <List sx={{ mt: 2, px: 2, flexGrow: 1, overflowY: "auto" }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
            }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  mb: 1,
                  borderRadius: 3,
                  bgcolor: isActive
                    ? "#2563EB"
                    : "transparent",
                  color: "#fff",

                  "&:hover": {
                    bgcolor: "#1E40AF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>

      {/* User Profile & Logout */}

      <Box
        sx={{
          mt: "auto",
          p: 2,
        }}
      >
        <Divider
          sx={{
            bgcolor: "#334155",
            mb: 2,
          }}
        />

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: 3,
            p: 1.5,
          }}
        >
          <Avatar 
            onClick={handleAvatarClick}
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: currentAvatar.bg,
              mr: 1.5,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            {currentAvatar.text}
          </Avatar>
          
          <Menu
            anchorEl={avatarAnchorEl}
            open={Boolean(avatarAnchorEl)}
            onClose={handleAvatarClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ 
              mt: -1,
              "& .MuiPaper-root": {
                bgcolor: "#1E293B",
                color: "#fff",
              }
            }}
          >
            {avatarOptions.map((avatar) => (
              <MenuItem 
                key={avatar.id} 
                onClick={() => handleAvatarSelect(avatar)}
                sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: avatar.bg }}>
                  {avatar.text}
                </Avatar>
                <Typography variant="body2">Avatar {avatar.id}</Typography>
              </MenuItem>
            ))}
          </Menu>
          
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600, color: "#fff" }}>
              User Name
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: "#94A3B8" }}>
              user@example.com
            </Typography>
          </Box>

          <IconButton
            sx={{
              color: "#94A3B8",
              "&:hover": {
                color: "#fff",
                bgcolor: "#DC2626",
              },
            }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;