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
} from "@mui/material";

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

      {/* Logout */}

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

        <ListItemButton
          sx={{
            borderRadius: 3,
            color: "#fff",

            "&:hover": {
              bgcolor: "#DC2626",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export default Sidebar;