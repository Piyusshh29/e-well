import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../theme/ThemeContext";

import {
  Search,
  NotificationsNone,
  LightMode,
  DarkMode,
  AccountCircle,
} from "@mui/icons-material";

function Navbar() {
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: mode === 'light' ? "#ffffff" : "#1E293B",
        color: mode === 'light' ? "#1E293B" : "#F8FAFC",
        borderBottom: mode === 'light' ? "1px solid #E2E8F0" : "1px solid #334155",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Healthcare Dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Welcome back 👋 Stay Healthy
          </Typography>
        </Box>

        {/* Center Search */}
          <TextField
          size="small"
          placeholder="Search..."
          sx={{
            width: 320,
            background: mode === 'light' ? "#F8FAFC" : "#0F172A",
            borderRadius: 3,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Right */}
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Notifications">
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
              <Badge badgeContent={3} color="error">
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(notifAnchor)}
            anchorEl={notifAnchor}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Typography sx={{ p: 2 }}>No new notifications.</Typography>
          </Popover>

          <Tooltip title="Theme">
            <IconButton onClick={toggleColorMode}>
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  bgcolor: "#2563EB",
                }}
              >
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              Profile
            </MenuItem>

            <MenuItem onClick={handleClose}>
              Settings
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;