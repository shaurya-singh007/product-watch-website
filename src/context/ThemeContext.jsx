import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('watch-theme');
    if (saved) return saved;
    return 'dark'; // default to dark for premium look
  });

  const [cursorMode, setCursorMode] = useState(() => {
    const saved = localStorage.getItem('watch-cursor-mode');
    return saved || 'fancy';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('watch-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (cursorMode === 'normal') {
      root.classList.add('normal-cursor');
    } else {
      root.classList.remove('normal-cursor');
    }
    localStorage.setItem('watch-cursor-mode', cursorMode);
  }, [cursorMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCursorMode = () => {
    setCursorMode((prev) => (prev === 'fancy' ? 'normal' : 'fancy'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, cursorMode, toggleCursorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
