import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#2563EB' },
                secondary: { main: '#10B981' },
                background: { default: '#F8FAFC', paper: '#FFFFFF' },
                text: { primary: '#1E293B', secondary: '#64748B' },
              }
            : {
                primary: { main: '#60A5FA' },
                secondary: { main: '#34D399' },
                background: { default: '#0F172A', paper: '#1E293B' },
                text: { primary: '#F8FAFC', secondary: '#94A3B8' },
              }),
        },
        shape: { borderRadius: 16 },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
