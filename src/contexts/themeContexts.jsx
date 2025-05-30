// src/contexts/ThemeContext.jsx
import { createContext, useState, useContext } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children(theme)}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
