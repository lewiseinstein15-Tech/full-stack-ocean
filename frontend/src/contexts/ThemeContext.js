import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = systemDark ? 'dark' : 'light';
      setTheme(systemTheme);
      applyTheme(systemTheme);
      setDarkMode(systemDark);
    }
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      setDarkMode(mediaQuery.matches);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const applyTheme = (newTheme) => {
    const root = window.document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      setDarkMode(true);
    } else {
      root.classList.remove('dark');
      setDarkMode(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemDark ? 'dark' : 'light');
    } else {
      applyTheme(mode);
    }
    localStorage.setItem('theme', mode);
  };

  const value = {
    theme,
    darkMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;