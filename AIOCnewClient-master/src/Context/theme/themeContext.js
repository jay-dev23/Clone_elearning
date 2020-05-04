import React, { createContext, useState } from 'react';
import theme from './themeConfig.js';

export const ThemeContext = createContext({});

const Theme = ({ children }) => {
  const [mode, setMode] = useState(() => {
    let mode = localStorage.getItem('mode') || 'dark';
    localStorage.setItem('mode', mode);
    return mode;
  });

  //change theme mode from dark to light and vise-versa
  const changeMode = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', 'light');
      let colorMode = localStorage.getItem('mode');
      setMode(colorMode);
      changeThemeColor(colorMode);
    } else {
      localStorage.setItem('mode', 'dark');
      let colorMode = localStorage.getItem('mode');
      setMode(colorMode);
      changeThemeColor(colorMode);
    }
  };

  //set state for theme colors according to theme mode
  const [themeColors, setThemeColors] = useState(theme[mode]);
  //change theme colors from light::colors to dark::colors depending on mode change
  const changeThemeColor = (mode) => {
    setThemeColors(theme[mode]);
  };

  //Just get the brand color and set the state no need to change them
  const [brandColors] = useState({
    primaryBrandColor: theme.primaryBrandColor,
    secondaryBrandColor: theme.secondaryBrandColor,
  });

  return (
    <ThemeContext.Provider
      value={{
        // mode,
        changeMode,
        themeColors,
        brandColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;
